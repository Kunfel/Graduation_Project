"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(body) {
        let user = await this.authService.createNewUser(body);
        return 'User signed up';
    }
    async login(body) {
        const { email, password } = body;
        const user = await this.authService.getUserData(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await this.authService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const payload = {
            id: user.id,
            email: user.email,
        };
        const access_token = await this.authService.generateToken(payload);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.fullname,
            },
            access_token
        };
    }
    async loginWithGoogle(body) {
        try {
            let googleToken = body.accessToken;
            let response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + googleToken);
            let data = await response.json();
            if (data.error) {
                throw new common_1.UnauthorizedException("Invalid Google token");
            }
            let payload = {
                id: data.user_id,
                email: data.email
            };
            let token = await this.authService.generateToken(payload);
            return { token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Google authentication failed");
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('loginGoogle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginWithGoogle", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map