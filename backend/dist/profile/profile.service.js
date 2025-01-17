"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const profile_schema_1 = require("../schemas/profile.schema");
let ProfileService = class ProfileService {
    constructor(profileModel) {
        this.profileModel = profileModel;
    }
    async getProfiles(userId) {
        const profile = await this.profileModel.findOne({ userId: new mongoose_3.default.Types.ObjectId(userId) }).exec();
        if (!profile) {
            const newProfile = await this.createProfile({
                userId: new mongoose_3.default.Types.ObjectId(userId),
                fullName: '',
                dateOfBirth: new Date(),
                insuranceNumber: '',
                address: {
                    street: '',
                    place: '',
                    zipcode: ''
                },
                bloodType: '',
                allergies: [],
                medications: [],
                diseases: '',
                emergencyContacts: []
            });
            return newProfile;
        }
        return profile;
    }
    async createProfile(profileData) {
        const profile = new this.profileModel(profileData);
        return profile.save();
    }
    async updateProfile(userId, profileData) {
        const profile = await this.profileModel.findOne({ userId: new mongoose_3.default.Types.ObjectId(userId) }).exec();
        if (!profile) {
            return this.createProfile({
                ...profileData,
                userId: new mongoose_3.default.Types.ObjectId(userId)
            });
        }
        Object.assign(profile, profileData);
        return profile.save();
    }
    async deleteProfile(userId) {
        const result = await this.profileModel.deleteOne({ userId: new mongoose_3.default.Types.ObjectId(userId) }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Profile not found');
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profile_schema_1.Profile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProfileService);
//# sourceMappingURL=profile.service.js.map