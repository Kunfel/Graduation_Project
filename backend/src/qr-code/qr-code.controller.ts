import {
    Controller,
    Get,
    Post,
    UseGuards,
    Req,
    Param,
    NotFoundException,
} from '@nestjs/common';
import { QRCodeService } from './qr-code.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('qr-code')
export class QRCodeController {
    constructor(private readonly qrCodeService: QRCodeService) { }

    @UseGuards(AuthGuard)
    @Post('generate')
    async generateQRCode(@Req() req) {
        try {
            return await this.qrCodeService.generateQRCode(req.user.email);
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async getQRCode(@Req() req) {
        try {
            return await this.qrCodeService.getQRCode(req.user.email);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('QR code not found');
            }
            throw error;
        }
    }

    @UseGuards(AuthGuard)
    @Post('update')
    async updateQRCode(@Req() req) {
        try {
            return await this.qrCodeService.updateQRCode(req.user.email);
        } catch (error) {
            throw error;
        }
    }

    @Get('emergency/:publicId')
    async getEmergencyInfo(@Param('publicId') publicId: string) {
        try {
            return await this.qrCodeService.getEmergencyInfo(publicId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('Emergency information not found');
            }
            throw error;
        }
    }
}