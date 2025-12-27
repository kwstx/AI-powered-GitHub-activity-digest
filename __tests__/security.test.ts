import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/integrations/route';

// Mocks
jest.mock('@/auth', () => ({
    auth: jest.fn(),
}));

jest.mock('@/lib/server/storage', () => ({
    getIntegrations: jest.fn(),
    saveIntegration: jest.fn(),
}));

jest.mock('@/lib/logger', () => ({
    security: jest.fn(),
    error: jest.fn(),
}));

import { auth } from '@/auth';

describe('Security: Integrations API', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should reject unauthenticated requests (401)', async () => {
        (auth as jest.Mock).mockResolvedValue(null); // No session

        const { req } = createMocks({
            method: 'POST',
            body: {
                id: 'test-integration',
                connected: true
            },
        });

        const response = await POST(req);
        expect(response.status).toBe(401);
    });

    it('should validate input using Zod (400 for bad schema)', async () => {
        (auth as jest.Mock).mockResolvedValue({ user: { id: 'security-test-user' } }); // Mock session

        const request = new Request('http://localhost/api/integrations', {
            method: 'POST',
            body: JSON.stringify({
                // Missing 'id' and 'connected' - Invalid Schema
                someRandomField: 'hack'
            })
        });

        const response = await POST(request);

        // Should fail Zod validation
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toBe('Invalid input');
    });
});
