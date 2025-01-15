"use client"

import React from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from "lucide-react"

type EmergencyContactForm = {
    emergencyContacts: {
        name: string;
        relationship: string;
        phone: string;
    }[];
};

export default function EmergencyContact() {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<EmergencyContactForm>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "emergencyContacts",
    })

    const addContact = () => {
        append({
            name: "",
            relationship: "",
            phone: "",
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Emergency Contacts</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addContact}
                    className="flex items-center gap-2"
                >
                    <PlusCircle className="h-4 w-4" />
                    Add Contact
                </Button>
            </div>

            {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 rounded-lg border p-4">
                    <div className="flex justify-between">
                        <h4 className="text-sm font-medium">Contact {index + 1}</h4>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            {...register(`emergencyContacts.${index}.name`)}
                            placeholder="Contact Name"
                            className="border-blue-100"
                        />
                        {errors.emergencyContacts?.[index]?.name && (
                            <p className="text-sm text-red-500">
                                {errors.emergencyContacts?.[index]?.name?.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Input
                            {...register(`emergencyContacts.${index}.relationship`)}
                            placeholder="e.g., Parent, Spouse, Sibling"
                            className="border-blue-100"
                        />
                        {errors.emergencyContacts?.[index]?.relationship && (
                            <p className="text-sm text-red-500">
                                {errors.emergencyContacts?.[index]?.relationship?.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                            {...register(`emergencyContacts.${index}.phone`)}
                            placeholder="Phone Number"
                            type="tel"
                            className="border-blue-100"
                        />
                        {errors.emergencyContacts?.[index]?.phone && (
                            <p className="text-sm text-red-500">
                                {errors.emergencyContacts?.[index]?.phone?.message}
                            </p>
                        )}
                    </div>
                </div>
            ))}

            {fields.length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
                    <p className="text-sm text-gray-500">No emergency contacts added</p>
                </div>
            )}
        </div>
    )
}
