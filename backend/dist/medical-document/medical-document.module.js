"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalDocumentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const medical_document_controller_1 = require("./medical-document.controller");
const medical_document_service_1 = require("./medical-document.service");
const medicalDocuments_schema_1 = require("../schemas/medicalDocuments.schema");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let MedicalDocumentModule = class MedicalDocumentModule {
};
exports.MedicalDocumentModule = MedicalDocumentModule;
exports.MedicalDocumentModule = MedicalDocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: medicalDocuments_schema_1.MedicalDocuments.name, schema: medicalDocuments_schema_1.MedicalDocumentsSchema },
            ]),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [medical_document_controller_1.MedicalDocumentController],
        providers: [medical_document_service_1.MedicalDocumentService],
        exports: [medical_document_service_1.MedicalDocumentService],
    })
], MedicalDocumentModule);
//# sourceMappingURL=medical-document.module.js.map