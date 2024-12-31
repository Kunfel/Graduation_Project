"use client"

import { useState } from "react"
import { Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


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

interface EmergencyContact {
  id: number;
  relationship: string;
  name: string;
  number: string;
}

export default function PersonalDetails() {
  const [isEditing, setIsEditing] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: 1, relationship: '', name: '', number: '' }
  ])

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { id: Date.now(), relationship: '', name: '', number: '' }])
  }

  const removeEmergencyContact = (id: number) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id))
  }

  return (
    <div className="flex min-h-screen">
      
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-xl text-blue-600">Settings</h1>

        <Card className="p-6">
          <h2 className="mb-6 text-lg font-semibold">Personal Details</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column - Personal Details */}
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex gap-6">
                <Avatar seed="your-unique-seed" />
                <div className="flex-1 space-y-4">
                  <Label htmlFor="Fullname">Full Name</Label>
                  <Input
                    placeholder="Name"
                    disabled={!isEditing}
                    className="border-blue-100"
                  />
                  <Label htmlFor="Birthdate">Birthdate</Label>
                  <Input
                    type="date"
                    placeholder="date of birth"
                    disabled={!isEditing}
                    className="border-blue-100"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance-name">Insurance Name</Label>
                  <Input
                    id="insurance-name"
                    placeholder="Insurance Provider"
                    disabled={!isEditing}
                    className="border-blue-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance-number">Insurance Number</Label>
                  <Input
                    id="insurance-number"
                    placeholder="Insurance Number"
                    disabled={!isEditing}
                    className="border-blue-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Street Address"
                    disabled={!isEditing}
                    className="border-blue-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="place">Place</Label>
                    <Input
                      id="place"
                      placeholder="City"
                      disabled={!isEditing}
                      className="border-blue-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipcode">Zipcode</Label>
                    <Input
                      id="zipcode"
                      placeholder="Zipcode"
                      disabled={!isEditing}
                      className="border-blue-100"
                    />
                  </div>
                </div>

                {/* Medical Card */}
                <h3 className="text-sm font-medium text-gray-500">Medical Card</h3>
                <div className="space-y-2">
                  <Label htmlFor="bloodtype">Blood Type</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger id="bloodtype" className="border-blue-100">
                      <SelectValue placeholder="Select Blood Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a-positive">A+</SelectItem>
                      <SelectItem value="a-negative">A-</SelectItem>
                      <SelectItem value="b-positive">B+</SelectItem>
                      <SelectItem value="b-negative">B-</SelectItem>
                      <SelectItem value="o-positive">O+</SelectItem>
                      <SelectItem value="o-negative">O-</SelectItem>
                      <SelectItem value="ab-positive">AB+</SelectItem>
                      <SelectItem value="ab-negative">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger id="allergies" className="border-blue-100">
                      <SelectValue placeholder="Select Allergies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="peanuts">Peanuts</SelectItem>
                      <SelectItem value="lactose">Lactose</SelectItem>
                      <SelectItem value="gluten">Gluten</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medication">Medication</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger id="medication" className="border-blue-100">
                      <SelectValue placeholder="Select Medication" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="insulin">Insulin</SelectItem>
                      <SelectItem value="antibiotic">Antibiotic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disease">Disease</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger id="disease" className="border-blue-100">
                      <SelectValue placeholder="Select Disease" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="diabetes">Diabetes</SelectItem>
                      <SelectItem value="hypertension">Hypertension</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Right Column - Emergency Contacts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Emergency Contacts</h3>
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addEmergencyContact}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Contact
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <Card key={contact.id} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-medium">Contact {index + 1}</Label>
                      {isEditing && emergencyContacts.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEmergencyContact(contact.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`relationship-${contact.id}`}>Relationship</Label>
                        <Input
                          id={`relationship-${contact.id}`}
                          placeholder="Relationship"
                          disabled={!isEditing}
                          className="border-blue-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`name-${contact.id}`}>Name</Label>
                        <Input
                          id={`name-${contact.id}`}
                          placeholder="Name"
                          disabled={!isEditing}
                          className="border-blue-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`number-${contact.id}`}>Phone Number</Label>
                        <Input
                          id={`number-${contact.id}`}
                          placeholder="Phone Number"
                          type="tel"
                          disabled={!isEditing}
                          className="border-blue-100"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              className="bg-red-600 text-white hover:bg-red-600 px-4"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsEditing(false)}
              >
                Save
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}

