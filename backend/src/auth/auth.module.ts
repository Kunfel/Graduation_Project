import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "G1g0Isc2zCA8fVtlLTwsQ9oCIZIRaZQPJoUYCBs5Bxc=",
      signOptions: { expiresIn: '30d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }


