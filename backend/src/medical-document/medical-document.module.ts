import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalDocumentController } from './medical-document.controller';
import { MedicalDocumentService } from './medical-document.service';
import { MedicalDocuments, MedicalDocumentsSchema } from '../schemas/medicalDocuments.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MedicalDocuments.name, schema: MedicalDocumentsSchema },
        ]),
        CloudinaryModule,
    ],
    controllers: [MedicalDocumentController],
    providers: [MedicalDocumentService],
    exports: [MedicalDocumentService],
})
export class MedicalDocumentModule { }
