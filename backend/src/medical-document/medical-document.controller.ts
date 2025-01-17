import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Body,
    Param,
    Request,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { MedicalDocumentService } from './medical-document.service';
import { Express } from 'express';
import { diskStorage } from 'multer';

@Controller('medical-document')
@UseGuards(AuthGuard)
export class MedicalDocumentController {
    constructor(private readonly medicalDocumentService: MedicalDocumentService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
    }))
    async uploadDocument(
        @Request() req,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
                    new FileTypeValidator({ fileType: /(pdf|doc|docx|jpg|jpeg|png)$/ }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Body('title') title: string,
    ) {
        return this.medicalDocumentService.uploadDocument(
            req.user.sub,
            file,
            title,
        );
    }

    @Get('user')
    async getUserDocuments(@Request() req) {
        return this.medicalDocumentService.getUserDocuments(req.user.sub);
    }

    @Delete(':id')
    async deleteDocument(@Request() req, @Param('id') documentId: string) {
        return this.medicalDocumentService.deleteDocument(req.user.sub, documentId);
    }

    @Patch(':id')
    async updateDocument(
        @Request() req,
        @Param('id') documentId: string,
        @Body('title') title: string,
    ) {
        return this.medicalDocumentService.updateDocument(
            req.user.sub,
            documentId,
            { title }
        );
    }
}
