"use client"

import { useState } from "react"
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

// Profile Schema
const profileSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    dateOfBirth: z.string(),
    insuranceName: z.string().min(2, "Insurance name is required"),
    address: z.object({
        street: z.string().min(2, "Street address is required"),
        place: z.string().min(2, "City is required"),
        zipcode: z.string().min(4, "Valid zipcode is required"),
    }),
    bloodType: z.string().optional(),
    allergies: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    diseases: z.string().optional(),
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
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const methods = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    })

    const onSubmit = async (data: ProfileFormData) => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to update profile")
            }

            toast({
                title: "Success",
                description: "Profile updated successfully",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-6">
                <h1 className="mb-6 text-xl text-blue-600">Settings</h1>
                <Card className="p-6">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                                            <Label htmlFor="insuranceName">Insurance Name</Label>
                                            <Input
                                                {...methods.register("insuranceName")}
                                                placeholder="Insurance Provider"
                                                className="border-blue-100"
                                            />
                                            {methods.formState.errors.insuranceName && (
                                                <p className="text-sm text-red-500">{methods.formState.errors.insuranceName.message}</p>
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
                                    variant="outline"
                                    className="bg-red-600 text-white hover:bg-red-600 px-4"
                                    onClick={() => methods.reset()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </Card>
            </main>
        </div>
    )
}
