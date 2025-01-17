import { Body, Controller, Post, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

type SignupRequestBody = {
    fullname: string
    email: string
    password: string
    verified: boolean
}

type LoginRequestBody = {
    email: string
    password: string
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: SignupRequestBody) {
        let user = await this.authService.createNewUser(body);
        return 'User signed up'
    }

    @Post('login')
    async login(@Body() body: LoginRequestBody) {
        const { email, password } = body;

        // Get user and verify they exist
        const user = await this.authService.getUserData(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Verify password
        const isPasswordValid = await this.authService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        // Generate token
        const payload = {
            id: user.id,
            email: user.email,
        };
        const access_token = await this.authService.generateToken(payload);

        // Return in the format expected by the frontend
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.fullname,
            },
            access_token
        };
    }

    @Post('loginGoogle')
    async loginWithGoogle(@Body() body: any) {
        try {
            //get user from database
            let googleToken = body.accessToken;
            //send request to google check
            let response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleToken);
            let data: any = await response.json();

            if (data.error) {
                throw new UnauthorizedException("Invalid Google token");
            }

            let payload = {
                id: data.user_id,
                email: data.email
            };

            let token = await this.authService.generateToken(payload);
            return { token };
        } catch (error) {
            throw new UnauthorizedException("Google authentication failed");
        }
    }
}
