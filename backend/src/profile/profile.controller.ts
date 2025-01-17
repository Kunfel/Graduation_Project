import {
    Body,
    Controller,
    Get,
    Put,
    UseGuards,
    Request,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../auth/auth.guard';
import { Profile, ProfileDocument } from '../schemas/profile.schema';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get()
    async getProfile(@Request() req) {
        try {
            const profile = await this.profileService.getProfiles(req.user.id);
            return profile;
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to fetch profile',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put()
    async updateProfile(
        @Request() req,
        @Body() profileData: Partial<Profile>
    ) {
        try {
            const updatedProfile = await this.profileService.updateProfile(
                req.user.id,
                profileData
            );
            return updatedProfile;
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to update profile',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}