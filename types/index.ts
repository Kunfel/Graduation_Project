// QR Code Types
export interface QRCode {
    qrImageUrl: string;
    scanCount: number;
    publicId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface EmergencyInfo {
    name: string;
    dateOfBirth?: string;
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
    emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}

// Medical Document Types
export interface MedicalDocument {
    _id: string;
    userId: string;
    title: string;
    fileUrl: string;
    fileType: string;
    cloudinaryId: string;
    uploadedAt: string;
    createdAt: string;
    updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiError {
    success: boolean;
    message: string;
    error?: any;
}