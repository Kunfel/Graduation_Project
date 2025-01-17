"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const qr_code_controller_1 = require("./qr-code.controller");
const qr_code_service_1 = require("./qr-code.service");
const qrCode_schema_1 = require("../schemas/qrCode.schema");
const profile_schema_1 = require("../schemas/profile.schema");
const user_schema_1 = require("../schemas/user.schema");
const profile_module_1 = require("../profile/profile.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let QRCodeModule = class QRCodeModule {
};
exports.QRCodeModule = QRCodeModule;
exports.QRCodeModule = QRCodeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: qrCode_schema_1.QrCode.name, schema: qrCode_schema_1.QrCodeSchema },
                { name: profile_schema_1.Profile.name, schema: profile_schema_1.ProfileSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            profile_module_1.ProfileModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [qr_code_controller_1.QRCodeController],
        providers: [qr_code_service_1.QRCodeService],
        exports: [qr_code_service_1.QRCodeService],
    })
], QRCodeModule);
//# sourceMappingURL=qr-code.module.js.map