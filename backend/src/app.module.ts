import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalDocumentModule } from './medical-document/medical-document.module';
import { ForumModule } from './forum/forum.module';
import { QRCodeModule } from './qr-code/qr-code.module';
//import { AiModule } from './ai/ai.module';
import { ProfileModule } from './profile/profile.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb+srv://tenzinkunfel:cla@cluster0.b0w3a.mongodb.net/CodeBlue'), MedicalDocumentModule, ForumModule, CloudinaryModule, QRCodeModule, /*AiModule,*/ ProfileModule],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule { }

