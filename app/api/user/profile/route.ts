import { NextResponse } from 'next/server';
import { getUserProfile, saveUserProfile } from '@/lib/server/storage';

export async function GET() {
    try {
        const profile = await getUserProfile();
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const updates = await request.json();
        const updatedProfile = await saveUserProfile(updates);
        return NextResponse.json(updatedProfile);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
    }
}
