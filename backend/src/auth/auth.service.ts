import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

type UserType = {
    fullname: string;
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, @InjectModel(User.name) private UserModel: Model<User>) { }

    async getUserData(email: string) {
        return this.UserModel.findOne({ email });
    }

    async createNewUser(user: User) {
        let password = await bcrypt.hash(user.password, 10);
        user.password = password;
        return this.UserModel.create(user);
    }

    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    async generateToken(payload: any) {
        return await this.jwtService.signAsync(payload);
    }
}
