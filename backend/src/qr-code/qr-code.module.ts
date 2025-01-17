// src/qr-code/qr-code.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QRCodeController } from './qr-code.controller';
import { QRCodeService } from './qr-code.service';
import { QrCode, QrCodeSchema } from '../schemas/qrCode.schema';
import { Profile, ProfileSchema } from '../schemas/profile.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { ProfileModule } from '../profile/profile.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QrCode.name, schema: QrCodeSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ProfileModule,
    CloudinaryModule,
  ],
  controllers: [QRCodeController],
  providers: [QRCodeService],
  exports: [QRCodeService],
})
export class QRCodeModule { }