"use client"

import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import QRCode from 'qrcode'

export default function QRGeneratorPage() {
  const [url, setUrl] = useState('')
  const [qrCode, setQrCode] = useState('')

  const generateQRCode = async () => {
    try {
      const response = await QRCode.toDataURL(url)
      setQrCode(response)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  return (
    <div className='p-6'>
      <h2 className="mb-6 text-xl text-blue-600">QR Code Generator</h2>
      <Card className=" max-w-2xl p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Enter URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border-blue-100"
            />
          </div>
          <Button
            onClick={generateQRCode}
            className="bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-white"
          >
            Generate QR Code
          </Button>
          {qrCode && (
            <div className="mt-4 flex justify-center">
              <img src={qrCode} alt="Generated QR Code" className="h-64 w-64" />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

