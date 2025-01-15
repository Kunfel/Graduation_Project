'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { qrCodeApi } from '@/actions/qrcode';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, AlertTriangle, Pill, Heart, User, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface EmergencyInfo {
    fullName: string;
    dateOfBirth: string;
    bloodType: string;
    allergies: string[];
    medications: string[];
    diseases: string;
    emergencyContacts: Array<{
        name: string;
        relationship: string;
        phone: string;
    }>;
}

export default function EmergencyPage() {
    const params = useParams();
    const [info, setInfo] = useState<EmergencyInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmergencyInfo = async () => {
            try {
                const data = await qrCodeApi.getEmergencyInfo(params.id as string);
                setInfo(data);
            } catch (err) {
                setError('Failed to load emergency information');
                console.error('Error fetching emergency info:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) {
            fetchEmergencyInfo();
        }
    }, [params.id]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <Card className="w-full max-w-3xl">
                    <CardHeader className="text-center">
                        <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <CardTitle className="text-red-600">Error</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen p-6">
                <Card className="w-full max-w-3xl mx-auto">
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!info) return null;

    return (
        <div className="min-h-screen p-6">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <CardTitle className="text-2xl md:text-3xl">{info.fullName}</CardTitle>
                            <CardDescription className="flex items-center mt-2">
                                <CalendarDays className="w-4 h-4 mr-2" />
                                {format(new Date(info.dateOfBirth), 'MMMM d, yyyy')}
                            </CardDescription>
                        </div>
                        <Badge
                            variant="secondary"
                            className="text-lg px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100"
                        >
                            {info.bloodType}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Allergies Section */}
                    {info.allergies.length > 0 && (
                        <section className="space-y-3">
                            <h3 className="font-semibold flex items-center text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-5 h-5 mr-2" />
                                Allergies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {info.allergies.map((allergy, index) => (
                                    <Badge key={index} variant="destructive">
                                        {allergy}
                                    </Badge>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Medications Section */}
                    {info.medications.length > 0 && (
                        <section className="space-y-3">
                            <h3 className="font-semibold flex items-center">
                                <Pill className="w-5 h-5 mr-2" />
                                Current Medications
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {info.medications.map((medication, index) => (
                                    <Badge key={index} variant="outline">
                                        {medication}
                                    </Badge>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Medical Conditions Section */}
                    {info.diseases && (
                        <section className="space-y-3">
                            <h3 className="font-semibold flex items-center">
                                <Heart className="w-5 h-5 mr-2" />
                                Medical Conditions
                            </h3>
                            <p className="text-muted-foreground">{info.diseases}</p>
                        </section>
                    )}

                    {/* Emergency Contacts Section */}
                    {info.emergencyContacts.length > 0 && (
                        <section className="space-y-4">
                            <h3 className="font-semibold flex items-center">
                                <User className="w-5 h-5 mr-2" />
                                Emergency Contacts
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {info.emergencyContacts.map((contact, index) => (
                                    <Card key={index} className="border-2">
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <p className="font-medium text-lg">{contact.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {contact.relationship}
                                                </p>
                                                <div className="flex items-center mt-2">
                                                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                                                    <a
                                                        href={`tel:${contact.phone}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {contact.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}