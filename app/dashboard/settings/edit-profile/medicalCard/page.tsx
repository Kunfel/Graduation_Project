"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, X } from "lucide-react"

export default function MedicalCard() {
  const { register, formState: { errors }, watch, setValue } = useFormContext()
  const [allergies, setAllergies] = React.useState<string[]>([])
  const [medications, setMedications] = React.useState<string[]>([])
  const [newAllergy, setNewAllergy] = React.useState("")
  const [newMedication, setNewMedication] = React.useState("")

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()])
      setValue("allergies", [...allergies, newAllergy.trim()])
      setNewAllergy("")
    }
  }

  const removeAllergy = (index: number) => {
    const newAllergies = allergies.filter((_, i) => i !== index)
    setAllergies(newAllergies)
    setValue("allergies", newAllergies)
  }

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()])
      setValue("medications", [...medications, newMedication.trim()])
      setNewMedication("")
    }
  }

  const removeMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index)
    setMedications(newMedications)
    setValue("medications", newMedications)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500">Medical Card</h3>

      {/* Blood Type */}
      <div className="space-y-2">
        <Label htmlFor="bloodType">Blood Type</Label>
        <Select onValueChange={(value) => setValue("bloodType", value)}>
          <SelectTrigger id="bloodType" className="border-blue-100">
            <SelectValue placeholder="Select Blood Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
          </SelectContent>
        </Select>
        {errors.bloodType?.message && (
          <p className="text-sm text-red-500">{errors.bloodType.message.toString()}</p>
        )}
      </div>

      {/* Allergies */}
      <div className="space-y-2">
        <Label>Allergies</Label>
        <div className="flex gap-2">
          <Input
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            placeholder="Add allergy"
            className="border-blue-100"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addAllergy}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {allergies.map((allergy, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1"
            >
              <span className="text-sm">{allergy}</span>
              <button
                type="button"
                onClick={() => removeAllergy(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="space-y-2">
        <Label>Current Medications</Label>
        <div className="flex gap-2">
          <Input
            value={newMedication}
            onChange={(e) => setNewMedication(e.target.value)}
            placeholder="Add medication"
            className="border-blue-100"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addMedication}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {medications.map((medication, index) => (
            <div
              key={index}
              className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1"
            >
              <span className="text-sm">{medication}</span>
              <button
                type="button"
                onClick={() => removeMedication(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Diseases/Conditions */}
      <div className="space-y-2">
        <Label htmlFor="diseases">Medical Conditions</Label>
        <Input
          {...register("diseases")}
          placeholder="List any chronic conditions or diseases"
          className="border-blue-100"
        />
        {errors.diseases?.message && (
          <p className="text-sm text-red-500">{errors.diseases.message.toString()}</p>
        )}
      </div>
    </div>
  )
}
