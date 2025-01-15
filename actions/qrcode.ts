import { fetchAuth } from "@/lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const qrCodeApi = {
    generate: async () => {
        try {
            const response = await fetchAuth(`${API_BASE_URL}/qr-code/generate`, {
                method: 'POST',
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Failed to generate QR code' }));
                throw new Error(error.message);
            }

            return response.json();
        } catch (error) {
            console.error('Generate QR code error:', error);
            throw error;
        }
    },

    get: async () => {
        try {
            const response = await fetchAuth(`${API_BASE_URL}/qr-code`);

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Failed to fetch QR code' }));
                throw new Error(error.message);
            }

            return response.json();
        } catch (error) {
            console.error('Get QR code error:', error);
            throw error;
        }
    },

    update: async () => {
        try {
            const response = await fetchAuth(`${API_BASE_URL}/qr-code/update`, {
                method: 'POST',
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Failed to update QR code' }));
                throw new Error(error.message);
            }

            return response.json();
        } catch (error) {
            console.error('Update QR code error:', error);
            throw error;
        }
    },

    getEmergencyInfo: async (publicId: string) => {
        try {
            const response = await fetchAuth(`${API_BASE_URL}/qr-code/emergency/${publicId}`);

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Failed to fetch emergency information' }));
                throw new Error(error.message);
            }

            return response.json();
        } catch (error) {
            console.error('Get emergency info error:', error);
            throw error;
        }
    }
};