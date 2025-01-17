'use client';

import { useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import EmergencyContact from "./emergencyContact/page"
import MedicalCard from "./medicalCard/page"
import { fetchProfile, updateProfile, formatProfileData } from "@/actions/profile"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

// Profile Schema
const profileSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    dateOfBirth: z.string(),
    insuranceNumber: z.string().min(2, "Insurance number is required"),
    address: z.object({
        street: z.string().min(2, "Street address is required"),
        place: z.string().min(2, "City is required"),
        zipcode: z.string().min(4, "Valid zipcode is required"),
    }),
    bloodType: z.string().optional(),
    allergies: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    diseases: z.string().optional(),
    emergencyContacts: z.array(z.object({
        name: z.string(),
        relationship: z.string(),
        phone: z.string(),
    })).default([])
})

type ProfileFormData = z.infer<typeof profileSchema>

function Avatar({ seed }: { seed: string }) {
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
    return (
        <img
            src={avatarUrl}
            alt="Profile avatar"
            className="h-24 w-24 rounded-full border-2 border-dashed border-gray-200"
        />
    )
}

export default function PersonalDetails() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        },
    })

    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const methods = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: async () => {
            if (!session) return {
                fullName: '',
                dateOfBirth: '',
                insuranceNumber: '',
                address: {
                    street: '',
                    place: '',
                    zipcode: ''
                },
                emergencyContacts: [],
                bloodType: undefined,
                allergies: undefined,
                medications: undefined,
                diseases: undefined
            }
            try {
                const profile = await fetchProfile()
                return formatProfileData(profile);
            } catch (error) {
                console.error('Error loading profile:', error)
                toast({
                    title: "Error",
                    description: "Failed to load profile data",
                    variant: "destructive",
                })
                return {
                    fullName: '',
                    dateOfBirth: '',
                    insuranceNumber: '',
                    address: {
                        street: '',
                        place: '',
                        zipcode: ''
                    },
                    emergencyContacts: [],
                    bloodType: undefined,
                    allergies: undefined,
                    medications: undefined,
                    diseases: undefined
                }
            }
        },
    })

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            await updateProfile(data);
            toast({
                title: "Success",
                description: "Profile updated successfully",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update profile",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-6">
                <h1 className="mb-6 text-xl text-blue-600">Settings</h1>
                <Card className="p-6">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                            <h2 className="mb-6 text-lg font-semibold">Personal Details</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Left Column - Personal Details */}
                                <div className="space-y-6">
                                    {/* Profile Section */}
                                    <div className="flex gap-6">
                                        <Avatar seed="your-unique-seed" />
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <Label htmlFor="fullName">Full Name</Label>
                                                <Input
                                                    {...methods.register("fullName")}
                                                    placeholder="Name"
                                                    className="border-blue-100"
                                                />
                                                {methods.formState.errors.fullName && (
                                                    <p className="text-sm text-red-500">{methods.formState.errors.fullName.message}</p>
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor="dateOfBirth">Birthdate</Label>
                                                <Input
                                                    {...methods.register("dateOfBirth")}
                                                    type="date"
                                                    className="border-blue-100"
                                                />
                                                {methods.formState.errors.dateOfBirth && (
                                                    <p className="text-sm text-red-500">{methods.formState.errors.dateOfBirth.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="insuranceNumber">Insurance Number</Label>
                                            <Input
                                                {...methods.register("insuranceNumber")}
                                                placeholder="Insurance Number"
                                                className="border-blue-100"
                                            />
                                            {methods.formState.errors.insuranceNumber && (
                                                <p className="text-sm text-red-500">{methods.formState.errors.insuranceNumber.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address.street">Address</Label>
                                            <Input
                                                {...methods.register("address.street")}
                                                placeholder="Street Address"
                                                className="border-blue-100"
                                            />
                                            {methods.formState.errors.address?.street && (
                                                <p className="text-sm text-red-500">{methods.formState.errors.address.street.message}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="address.place">Place</Label>
                                                <Input
                                                    {...methods.register("address.place")}
                                                    placeholder="City"
                                                    className="border-blue-100"
                                                />
                                                {methods.formState.errors.address?.place && (
                                                    <p className="text-sm text-red-500">{methods.formState.errors.address.place.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address.zipcode">Zipcode</Label>
                                                <Input
                                                    {...methods.register("address.zipcode")}
                                                    placeholder="Zipcode"
                                                    className="border-blue-100"
                                                />
                                                {methods.formState.errors.address?.zipcode && (
                                                    <p className="text-sm text-red-500">{methods.formState.errors.address.zipcode.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        {/* Medical Card */}
                                        <FormProvider {...methods}>
                                            <MedicalCard />
                                        </FormProvider>
                                    </div>
                                </div>

                                {/* Right Column - Emergency Contacts */}
                                <EmergencyContact />
                            </div>
                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-end gap-3">
                                <Button
                                    type="button"
                                    className="bg-red-600 text-white hover:bg-red-800 px-4"
                                    onClick={() => methods.reset()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-blue-600 text-white hover:bg-blue-800 px-4"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Profile"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </Card>
            </main>
        </div>
    )
}
