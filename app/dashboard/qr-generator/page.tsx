'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Download, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import { qrCodeApi } from '@/actions/qrcode';
import { redirect } from 'next/navigation';

export default function QRCodePage() {
  const [qrCode, setQrCode] = useState<{ qrImageUrl: string; scanCount: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const fetchQRCode = async () => {
    if (status !== 'authenticated') return;

    try {
      const data = await qrCodeApi.generate();
      setQrCode(data);
    } catch (error) {
      console.error('Error fetching QR code:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch QR code',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateQRCode = async () => {
    if (status !== 'authenticated') return;

    setIsGenerating(true);
    try {
      const data = await qrCodeApi.generate();
      setQrCode(data);
      toast({
        title: 'Success',
        description: 'QR code generated successfully',
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate QR code',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchQRCode();
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-48 w-48 mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen'>
      <div className="w-full p-6 flex-1">
        <h1 className="mb-6 text-xl text-blue-600">QR Code Generator</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your QR Code</CardTitle>
            <CardDescription>
              Generate and manage your emergency contact QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-48 w-48 mx-auto" />
              </div>
            ) : qrCode ? (
              <div className="space-y-4">
                <div className="relative h-48 w-48 mx-auto">
                  <Image
                    src={qrCode.qrImageUrl}
                    alt="QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-sm text-gray-500">
                  Scanned {qrCode.scanCount} times
                </p>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(qrCode.qrImageUrl)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateQRCode}
                    disabled={isGenerating}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p>No QR code generated yet</p>
                <Button onClick={generateQRCode} disabled={isGenerating}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                  Generate QR Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}