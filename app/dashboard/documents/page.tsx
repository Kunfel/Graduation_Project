'use client';

import { useRef, useState, useEffect } from 'react';
import { Trash2, Upload, FileText, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { documentsApi } from '@/actions/documents';
import { useToast } from '@/components/ui/use-toast';

interface Document {
  _id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
}

export default function DocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const docs = await documentsApi.getUserDocuments();
      setDocuments(docs);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch documents',
        variant: 'destructive',
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTitle) {
      toast({
        title: 'Error',
        description: 'Please provide both a title and a file',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      await documentsApi.uploadDocument(file, uploadTitle);
      await fetchDocuments();
      setUploadTitle('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast({
        title: 'Success',
        description: 'Document uploaded successfully',
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      await documentsApi.deleteDocument(documentId);
      await fetchDocuments();
      toast({
        title: 'Success',
        description: 'Document deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete document',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateTitle = async (documentId: string) => {
    if (!newTitle) return;
    try {
      await documentsApi.updateDocument(documentId, newTitle);
      await fetchDocuments();
      setIsEditingTitle(false);
      toast({
        title: 'Success',
        description: 'Document title updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update document title',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="w-full flex-1 p-6">
        <h1 className="mb-6 text-xl text-blue-600">Medical Documents</h1>

        {/* Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Document Title"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
              />
              <div className="flex gap-4">
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!uploadTitle || isUploading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Upload Document'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <Card key={doc._id} className="relative">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {isEditingTitle && selectedDocument?._id === doc._id ? (
                      <div className="flex gap-2">
                        <Input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleUpdateTitle(doc._id)}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{doc.title}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(doc);
                            setNewTitle(doc.title);
                            setIsEditingTitle(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(doc.fileUrl, '_blank')}
                  >
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(doc._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
