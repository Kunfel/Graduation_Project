import { auth } from "@/auth";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to forward requests with authentication
async function forwardAuthRequest(path: string, method: string = 'GET', body?: any) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.email}`,
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(error, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API request failed:', error);
        return NextResponse.json(
            { error: 'Failed to connect to the backend server' },
            { status: 500 }
        );
    }
}

// GET /api/qr-code
export async function GET() {
    return forwardAuthRequest('/qr-code');
}

// POST /api/qr-code/generate
export async function POST(request: Request) {
    const { pathname } = new URL(request.url);

    if (pathname.endsWith('/generate')) {
        return forwardAuthRequest('/qr-code/generate', 'POST');
    }

    if (pathname.endsWith('/update')) {
        return forwardAuthRequest('/qr-code/update', 'POST');
    }

    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });
}