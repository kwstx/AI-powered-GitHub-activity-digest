import { NextResponse } from 'next/server';
import { getIntegrations, saveIntegration } from '@/lib/server/storage';
import { auth } from '@/auth';

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await getIntegrations();
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, connected, config } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing integration ID' }, { status: 400 });
        }

        const updated = await saveIntegration(id, { connected, config });
        return NextResponse.json({ data: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save integration' }, { status: 500 });
    }
}
