import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
export declare class AuthService {
    private jwtService;
    private UserModel;
    constructor(jwtService: JwtService, UserModel: Model<User>);
    getUserData(email: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createNewUser(user: User): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateToken(payload: any): Promise<string>;
}
