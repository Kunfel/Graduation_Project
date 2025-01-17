'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { addEmergencyContact, deleteEmergencyContact } from '@/actions/profile';
import { EmergencyContact } from '@/actions/profile';

export default function EmergencyContactForm() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { watch, setValue } = useFormContext();
    const emergencyContacts = watch('emergencyContacts') || [];
    const [newContact, setNewContact] = useState<EmergencyContact>({
        name: '',
        relationship: '',
        phone: '',
    });

    const handleAddContact = async () => {
        if (!newContact.name || !newContact.relationship || !newContact.phone) {
            toast({
                title: 'Error',
                description: 'Please fill in all fields',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);
        try {
            const updatedProfile = await addEmergencyContact(newContact);
            setValue('emergencyContacts', updatedProfile.emergencyContacts);
            setNewContact({ name: '', relationship: '', phone: '' });
            toast({
                title: 'Success',
                description: 'Emergency contact added successfully',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to add emergency contact',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteContact = async (index: number) => {
        setIsLoading(true);
        try {
            const updatedProfile = await deleteEmergencyContact(index);
            setValue('emergencyContacts', updatedProfile.emergencyContacts);
            toast({
                title: 'Success',
                description: 'Emergency contact deleted successfully',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete emergency contact',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-medium">Emergency Contacts</h2>

            {/* Existing Contacts */}
            <div className="space-y-4">
                {emergencyContacts.map((contact: EmergencyContact, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-1">
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.relationship}</p>
                            <p className="text-sm">{contact.phone}</p>
                        </div>
                        <Button
                            onClick={() => handleDeleteContact(index)}
                            variant="destructive"
                            disabled={isLoading}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>

            {/* Add New Contact Form */}
            <div className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={newContact.name}
                            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="relationship">Relationship</Label>
                        <Input
                            id="relationship"
                            value={newContact.relationship}
                            onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                            placeholder="e.g. Parent, Spouse"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={newContact.phone}
                            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                            placeholder="+1234567890"
                        />
                    </div>
                </div>
                <Button
                    onClick={handleAddContact}
                    className="w-full md:w-auto"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Contact'}
                </Button>
            </div>
        </div>
    );
}
