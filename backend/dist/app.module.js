"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const medical_document_module_1 = require("./medical-document/medical-document.module");
const forum_module_1 = require("./forum/forum.module");
const qr_code_module_1 = require("./qr-code/qr-code.module");
const profile_module_1 = require("./profile/profile.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const cloudinary_service_1 = require("./cloudinary/cloudinary.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, mongoose_1.MongooseModule.forRoot('mongodb+srv://tenzinkunfel:cla@cluster0.b0w3a.mongodb.net/CodeBlue'), medical_document_module_1.MedicalDocumentModule, forum_module_1.ForumModule, cloudinary_module_1.CloudinaryModule, qr_code_module_1.QRCodeModule, profile_module_1.ProfileModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, cloudinary_service_1.CloudinaryService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map