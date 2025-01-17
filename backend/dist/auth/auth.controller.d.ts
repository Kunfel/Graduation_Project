import { AuthService } from './auth.service';
type SignupRequestBody = {
    fullname: string;
    email: string;
    password: string;
    verified: boolean;
};
type LoginRequestBody = {
    email: string;
    password: string;
};
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: SignupRequestBody): Promise<string>;
    login(body: LoginRequestBody): Promise<{
        user: {
            id: any;
            email: string;
            name: string;
        };
        access_token: string;
    }>;
    loginWithGoogle(body: any): Promise<{
        token: string;
    }>;
}
export {};
