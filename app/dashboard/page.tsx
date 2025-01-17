'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchProfile } from '@/actions/profile';
import { Download, FileText, Phone, Pill, Activity } from 'lucide-react';

// Hilfsfunktion zur Datumsformatierung
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE');
};

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl text-blue-600">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.fullName || 'default'}`}
                alt="Avatar"
                className="w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile?.fullName || 'No Name'}</h2>
              <p className='text-gray-600'>Date of Birth: {profile?.dateOfBirth ? formatDate(profile.dateOfBirth) : 'Not specified'}</p>
              <p className="text-gray-600">Insurance nr: {profile?.insuranceNumber || 'Not provided'}</p>
            </div>
          </div>

          {/* Medical Information */}
          <div className="mt-6">
            <h3 className="text-lg text-blue-600 font-medium mb-4">Medical Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Blood Type</h4>
                <p className="text-red-600 font-bold">{profile?.bloodType || 'Not specified'}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600">Allergies</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile?.allergies?.length > 0 ? (
                    profile.allergies.map((allergy: string, index: number) => (
                      <span key={index} className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                        {allergy}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No allergies listed</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600">Medications</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile?.medications?.length > 0 ? (
                    profile.medications.map((medication: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded flex items-center gap-1">
                        <Pill className="w-3 h-3" />
                        {medication}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No medications listed</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600">Diseases</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile?.diseases ? (
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {profile.diseases}
                    </span>
                  ) : (
                    <p className="text-gray-500 text-sm">No diseases listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* QR Code Card */}
        <Card className="p-6">
          <h3 className="text-lg text-blue-600 font-medium mb-4">QR-Code</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-lg h-48 flex items-center justify-center mb-4">
            <p className="text-gray-500">QR Code will be generated here</p>
          </div>
          <Button className="w-full flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Share/Download
          </Button>
        </Card>

        {/* Emergency Contacts */}
        <Card className="p-6">
          <h3 className="text-lg text-blue-600 font-medium mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            {profile?.emergencyContacts?.length > 0 ? (
              profile.emergencyContacts.map((contact: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <p className="text-sm">{contact.phone}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No emergency contacts added</p>
            )}
          </div>
        </Card>

        {/* Medical Documents */}
        <Card className="p-6">
          <h3 className="text-lg text-blue-600 font-medium mb-4">Documents</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-4 h-4 text-green-600" />
              <span className="text-sm">bloodtest.pdf</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-4 h-4 text-green-600" />
              <span className="text-sm">glucose report.pdf</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
