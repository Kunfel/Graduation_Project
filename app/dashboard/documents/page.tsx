"use client"

import { useRef } from 'react'
import { Trash2, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from '@/components/ui/input'


export default function DocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (

    <div className="flex min-h-screen  ">

      <main className="w-full flex-1 p-6">
        <h1 className="mb-6 text-xl text-blue-600">Documents</h1>

        <Card className="h-[300px] mb-6 p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="text-blue-500" />
              Medical Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Button variant="outline" className="w-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Documents
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      console.log('File selected:', e.target.files[0].name)
                    }
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="text-blue-600">bloodtest.pdf</span>
            <Button variant="ghost" size="icon" className="text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="text-blue-600">glucose report.pdf</span>
            <Button variant="ghost" size="icon" className="text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>

  )
}

