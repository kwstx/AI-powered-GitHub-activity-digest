import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'integrations.json');

export type IntegrationConfig = {
    id: string;
    connected: boolean;
    config?: {
        webhookUrl?: string;
        apiKey?: string;
        [key: string]: any;
    };
};

// Ensure data directory exists
async function ensureDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

export async function getIntegrations(): Promise<IntegrationConfig[]> {
    await ensureDir();
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Return defaults if file doesn't exist
        return [
            { id: 'slack', connected: false },
            { id: 'discord', connected: false },
            { id: 'jira', connected: false },
            { id: 'linear', connected: false },
        ];
    }
}

export async function saveIntegration(id: string, updates: Partial<IntegrationConfig>) {
    const current = await getIntegrations();
    const index = current.findIndex(i => i.id === id);

    if (index >= 0) {
        current[index] = { ...current[index], ...updates };
    } else {
        current.push({ id, connected: false, ...updates });
    }

    await fs.writeFile(FILE_PATH, JSON.stringify(current, null, 2));
    return current;
}

// --- User Profile Storage ---

const PROFILE_PATH = path.join(DATA_DIR, 'profile.json');

export type UserProfile = {
    name: string;
    email: string;
    nickname: string;
    avatarUrl: string;
    plan: 'Free' | 'Pro';
    role: 'ic' | 'lead' | 'manager';
    selectedRepos: string[];
};

export async function getUserProfile(): Promise<UserProfile> {
    await ensureDir();
    try {
        const data = await fs.readFile(PROFILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Return defaults if file doesn't exist
        return {
            name: 'User Account',
            email: 'user@example.com',
            nickname: '',
            avatarUrl: '',
            plan: 'Free',
            role: 'ic',
            selectedRepos: []
        };
    }
}

export async function saveUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const current = await getUserProfile();
    const updated = { ...current, ...updates };
    await fs.writeFile(PROFILE_PATH, JSON.stringify(updated, null, 2));
    return updated;
}
