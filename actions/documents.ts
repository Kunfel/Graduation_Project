import { fetchAuth } from "@/lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const documentsApi = {
    uploadDocument: async (file: File, title: string) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        const response = await fetchAuth(`${API_BASE_URL}/medical-document/upload`, {
            method: 'POST',
            body: formData,
            headers: {}, // Let browser set Content-Type for FormData
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Failed to upload document');
        }

        return response.json();
    },

    getUserDocuments: async () => {
        const response = await fetchAuth(`${API_BASE_URL}/medical-document/user`);

        if (!response.ok) {
            throw new Error('Failed to fetch documents');
        }

        return response.json();
    },

    deleteDocument: async (documentId: string) => {
        const response = await fetchAuth(`${API_BASE_URL}/medical-document/${documentId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete document');
        }

        return response.json();
    },

    updateDocument: async (documentId: string, title: string) => {
        const response = await fetchAuth(`${API_BASE_URL}/medical-document/${documentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        if (!response.ok) {
            throw new Error('Failed to update document');
        }

        return response.json();
    },
};