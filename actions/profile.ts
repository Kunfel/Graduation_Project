'use server'

import { fetchAuth } from "@/lib/api";
import { auth } from "@/auth";
import { Session } from "next-auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Address {
    street: string;
    place: string;
    zipcode: string;
}

export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}

export interface Profile {
    fullName: string;
    dateOfBirth: string;
    insuranceNumber: string;
    address: Address;
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    diseases?: string;
    emergencyContacts: EmergencyContact[];
}

export async function addEmergencyContact(contact: EmergencyContact) {
    try {
        const currentProfile = await fetchProfile();
        const updatedContacts = [...(currentProfile.emergencyContacts || []), contact];

        const response = await fetchAuth(`${API_BASE_URL}/profile`, {
            method: 'PUT',
            body: JSON.stringify({
                ...currentProfile,
                emergencyContacts: updatedContacts
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add emergency contact');
        }

        return formatProfileData(await response.json());
    } catch (error) {
        console.error('Error adding emergency contact:', error);
        throw error;
    }
}

export async function deleteEmergencyContact(index: number) {
    try {
        const currentProfile = await fetchProfile();
        const updatedContacts = currentProfile.emergencyContacts.filter((_, i) => i !== index);

        const response = await fetchAuth(`${API_BASE_URL}/profile`, {
            method: 'PUT',
            body: JSON.stringify({
                ...currentProfile,
                emergencyContacts: updatedContacts
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete emergency contact');
        }

        return formatProfileData(await response.json());
    } catch (error) {
        console.error('Error deleting emergency contact:', error);
        throw error;
    }
}

export async function fetchProfile(): Promise<Profile> {
    try {
        const session = await auth() as Session & { accessToken?: string };
        if (!session?.user) {
            throw new Error('Unauthorized - No session found');
        }

        const response = await fetchAuth(`${API_BASE_URL}/profile`);
        const data = await response.json();
        return formatProfileData(data);
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

export async function updateProfile(data: Partial<Profile>) {
    try {
        const currentProfile = await fetchProfile();

        const response = await fetchAuth(`${API_BASE_URL}/profile`, {
            method: 'PUT',
            body: JSON.stringify({
                ...currentProfile,
                ...data,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update profile');
        }

        return formatProfileData(await response.json());
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

export async function formatProfileData(data: any): Promise<Profile> {
    try {
        return {
            fullName: data.fullName || '',
            dateOfBirth: data.dateOfBirth || '',
            insuranceNumber: data.insuranceNumber || '',
            address: data.address || { street: '', place: '', zipcode: '' },
            bloodType: data.bloodType || '',
            allergies: data.allergies || [],
            medications: data.medications || [],
            diseases: data.diseases || '',
            emergencyContacts: data.emergencyContacts || [],
        };
    } catch (error) {
        console.error('Error formatting profile data:', error);
        throw error;
    }
}
