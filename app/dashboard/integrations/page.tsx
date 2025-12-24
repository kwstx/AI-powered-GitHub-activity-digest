'use client';

import { useState, useEffect } from 'react';

export default function IntegrationsPage() {
    // Shared styles matching Settings page exactly
    const sectionStyle = {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    };

    const cardStyle = {
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
        height: '100%'
    };

    type Integration = {
        id: string;
        name: string;
        description: string;
        icon: React.ReactNode;
        connected: boolean;
        category: 'Communication' | 'Project Management';
    };

    const [integrations, setIntegrations] = useState<Integration[]>([
        {
            id: 'slack',
            name: 'Slack',
            description: 'Send daily digests and urgent alerts directly to your team channel.',
            category: 'Communication',
            connected: false,
            icon: (
                <svg width="32" height="32" viewBox="0 0 127 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.4358 83.2778C28.4358 89.2642 23.5828 94.1172 17.5963 94.1172C11.6099 94.1172 6.75684 89.2642 6.75684 83.2778C6.75684 77.2913 11.6099 72.4384 17.5963 72.4384H28.4358V83.2778Z" fill="#E01E5A" />
                    <path d="M34.4221 83.2778C34.4221 77.2913 39.2752 72.4384 45.2616 72.4384C51.248 72.4384 56.1011 77.2913 56.1011 83.2778V104.957C56.1011 110.943 51.248 115.796 45.2616 115.796C39.2752 115.796 34.4221 110.943 34.4221 104.957V83.2778Z" fill="#E01E5A" />
                    <path d="M45.2616 28.4358C39.2752 28.4358 34.4221 23.5828 34.4221 17.5963C34.4221 11.6099 39.2752 6.75684 45.2616 6.75684C51.248 6.75684 56.1011 11.6099 56.1011 17.5963V28.4358H45.2616Z" fill="#36C5F0" />
                    <path d="M45.2616 34.4221C51.248 34.4221 56.1011 39.2752 56.1011 45.2616C56.1011 51.248 51.248 56.1011 45.2616 56.1011H23.5828C17.5963 56.1011 12.7432 51.248 12.7432 45.2616C12.7432 39.2752 17.5963 34.4221 23.5828 34.4221H45.2616Z" fill="#36C5F0" />
                    <path d="M99.5268 45.2616C99.5268 39.2752 104.38 34.4221 110.366 34.4221C116.353 34.4221 121.206 39.2752 121.206 45.2616C121.206 51.248 116.353 56.1011 110.366 56.1011H99.5268V45.2616Z" fill="#2EB67D" />
                    <path d="M93.5407 45.2616C93.5407 51.248 88.6876 56.1011 82.7011 56.1011C76.7147 56.1011 71.8616 51.248 71.8616 45.2616V23.5828C71.8616 17.5963 76.7147 12.7432 82.7011 12.7432C88.6876 12.7432 93.5407 17.5963 93.5407 23.5828V45.2616Z" fill="#2EB67D" />
                    <path d="M82.7011 99.5268C88.6876 99.5268 93.5407 104.38 93.5407 110.366C93.5407 116.353 88.6876 121.206 82.7011 121.206C76.7147 121.206 71.8616 116.353 71.8616 110.366V99.5268H82.7011Z" fill="#ECB22E" />
                    <path d="M82.7011 93.5407C76.7147 93.5407 71.8616 88.6876 71.8616 82.7011C71.8616 76.7147 76.7147 71.8616 82.7011 71.8616H104.38C110.366 71.8616 115.219 76.7147 115.219 82.7011C115.219 88.6876 110.366 93.5407 104.38 93.5407H82.7011Z" fill="#ECB22E" />
                </svg>
            )
        },
        {
            id: 'discord',
            name: 'Discord',
            description: 'Post updates to a webhook for your community or dev team.',
            category: 'Communication',
            connected: false,
            icon: (
                <div style={{ width: 32, height: 32, background: '#5865F2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.46 13.46 0 0 0-.616 1.268 18.337 18.337 0 0 0-5.47 0 13.47 13.47 0 0 0-.62-1.268.077.077 0 0 0-.078-.037 19.74 19.74 0 0 0-4.887 1.515.069.069 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                </div>
            )
        },
        {
            id: 'jira',
            name: 'Jira Software',
            description: 'Automatically create Jira tickets for high-impact issues.',
            category: 'Project Management',
            connected: false,
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3733 21.8H22.64C22.76 21.8933 22.8133 21.9333 22.88 21.9333C26.76 21.9333 29.9067 25.08 29.9067 28.96C29.9067 32.84 26.76 35.9867 22.88 35.9867C19.12 35.9867 16.04 33.04 15.8667 29.3333H15.3733V21.8Z" fill="#2684FF" />
                    <path d="M15.3733 21.8H15.3867C15.3733 21.6 15.3733 21.4133 15.3733 21.2133C15.3733 17.3333 18.52 14.1867 22.4 14.1867C22.6 14.1867 22.7867 14.1867 22.9867 14.2L15.3733 21.8Z" fill="#0052CC" />
                    <path d="M17.2133 12.36H24.24C28.12 12.36 31.2667 9.21334 31.2667 5.33334C31.2667 1.45334 28.12 -1.69333 24.24 -1.69333C20.48 -1.69333 17.4 1.25334 17.2267 4.96001L17.2133 12.36Z" fill="#0052CC" />
                </svg>
            )
        },
        {
            id: 'linear',
            name: 'Linear',
            description: 'Sync Priority items to your Linear board.',
            category: 'Project Management',
            connected: false,
            icon: (
                <div style={{ width: 32, height: 32, background: '#111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /></svg>
                </div>
            )
        }
    ]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch saved integrations on load
        async function fetchIntegrations() {
            try {
                const res = await fetch('/api/integrations');
                const { data } = await res.json();

                if (data && Array.isArray(data)) {
                    setIntegrations(prev => prev.map(item => {
                        const saved = data.find((d: any) => d.id === item.id);
                        return saved ? { ...item, connected: saved.connected } : item;
                    }));
                }
            } catch (e) {
                console.error('Failed to load integrations', e);
            } finally {
                setLoading(false);
            }
        }
        fetchIntegrations();
    }, []);

    const toggleIntegration = async (id: string, currentStatus: boolean) => {
        // Optimistic UI update
        setIntegrations(prev => prev.map(int =>
            int.id === id ? { ...int, connected: !currentStatus } : int
        ));

        try {
            await fetch('/api/integrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    connected: !currentStatus,
                    // In a real app, we'd pass config/tokens here
                })
            });
        } catch (e) {
            console.error('Failed to save integration state', e);
            // Revert on error
            setIntegrations(prev => prev.map(int =>
                int.id === id ? { ...int, connected: currentStatus } : int
            ));
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                Integrations
            </h1>

            {/* Main Content Container - Matches Settings Page Style */}
            <div style={sectionStyle}>
                <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '600px', lineHeight: 1.6 }}>
                    Connect GitCalm with your favorite tools to streamline your workflow.
                    Receive alerts, sync tickets, and share digests where your team works.
                </p>

                {loading ? (
                    <div style={{ padding: '2rem', color: '#64748b' }}>Loading settings...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                        {integrations.map((integration) => (
                            <div key={integration.id} style={cardStyle}>
                                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {integration.icon}
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                                                {integration.name}
                                            </h3>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                color: integration.connected ? '#10B981' : '#94a3b8',
                                                background: integration.connected ? '#D1FAE5' : '#F1F5F9',
                                                padding: '2px 8px',
                                                borderRadius: '100px'
                                            }}>
                                                {integration.category} • {integration.connected ? 'Connected' : 'Not Connected'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5, flex: 1 }}>
                                    {integration.description}
                                </p>

                                <button
                                    onClick={() => toggleIntegration(integration.id, integration.connected)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: integration.connected ? '1px solid #e2e8f0' : 'none',
                                        background: integration.connected ? 'transparent' : '#0f172a',
                                        color: integration.connected ? '#64748b' : '#fff',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {integration.connected ? 'Disconnect' : 'Connect'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
