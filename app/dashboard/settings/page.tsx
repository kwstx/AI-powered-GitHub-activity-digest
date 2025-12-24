'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function SettingsPage() {
    const [isClearing, setIsClearing] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [digestFreq, setDigestFreq] = useState<'Daily' | 'Weekly'>('Daily');
    const [showToast, setShowToast] = useState(false);
    const [user, setUser] = useState({
        name: 'User Account',
        email: 'user@example.com',
        plan: 'Free'
    });

    // Initialize from LocalStorage (Client-side only to avoid hydration mismatch)
    useEffect(() => {
        const savedFreq = localStorage.getItem('gitcalm_digest_freq');
        if (savedFreq === 'Daily' || savedFreq === 'Weekly') {
            setDigestFreq(savedFreq);
        }

        // Fetch user profile from API
        fetch('/api/user/profile')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setUser(prev => ({ ...prev, ...data }));
                }
            })
            .catch(err => console.error('Failed to load profile:', err));
    }, []);

    const handleClearCache = async () => {
        setIsClearing(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    const handleExportData = async () => {
        setIsExporting(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Gather mock data + local storage data
        const exportData = {
            user: {
                email: 'user@example.com',
                plan: 'Free',
                joined: new Date().toISOString()
            },
            preferences: {
                digestFrequency: localStorage.getItem('gitcalm_digest_freq') || 'Daily',
                theme: 'system' // placeholder
            },
            meta: {
                exportedAt: new Date().toISOString(),
                version: '1.0.0'
            }
        };

        // Trigger download
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gitcalm-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setIsExporting(false);
        showTemporaryToast('Data exported successfully');
    };

    const toggleDigest = () => {
        const newFreq = digestFreq === 'Daily' ? 'Weekly' : 'Daily';
        setDigestFreq(newFreq);
        localStorage.setItem('gitcalm_digest_freq', newFreq);
        showTemporaryToast(`Frequency updated to ${newFreq}`);
    };

    const showTemporaryToast = (msg: string) => {
        // Simple alert/toast logic could be expanded here, using a simple state for now
        // leveraging the browser's native alert is too intrusive, so we'll just log or use a simple visual cue
        // For this UI, we will flash the button or a small toast if we added one. 
        // Let's add a simple floating toast (see return JSX).
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // --- Bento Grid Styles ---

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
    };

    // 1. Profile Hero Card
    const profileCardStyle = {
        gridColumn: '1 / -1',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        padding: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
        position: 'relative' as const,
        overflow: 'hidden'
    };

    // 2. Action Tile Base Style
    const tileStyle = {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
        minHeight: '200px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative' as const,
        overflow: 'hidden',
        textAlign: 'left' as const,
        width: '100%'
    };

    const iconBoxStyle = {
        width: 48, height: 48, borderRadius: '14px',
        background: '#fff', color: '#0f172a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
    };

    // Helper for hover effects since we removed styled-jsx to fix hydration
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, color: string = 'rgba(99, 102, 241, 0.3)') => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = color;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
    };

    return (
        <div style={{ paddingBottom: '4rem', position: 'relative' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                Settings
            </h1>
            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                Manage your account, preferences, and system data.
            </p>

            {/* Toast Notification */}
            {showToast && (
                <div style={{
                    position: 'fixed', bottom: '2rem', right: '2rem',
                    background: '#0f172a', color: '#fff', padding: '0.75rem 1.5rem',
                    borderRadius: '50px', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
                    fontWeight: 600, fontSize: '0.9rem', zIndex: 100,
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    Successfully updated
                </div>
            )}

            <div style={gridContainerStyle}>
                {/* HERO PROFILE CARD */}
                {/* HERO PROFILE CARD */}
                <Link
                    href="/dashboard/settings/profile"
                    style={{ ...profileCardStyle, textDecoration: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.01) translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                    }}
                >
                    <div style={{
                        position: 'absolute', top: '-50%', right: '-10%', width: '350px', height: '350px',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)',
                        borderRadius: '50%', pointerEvents: 'none', transition: 'background 0.3s'
                    }} />

                    <div style={{
                        width: 90, height: 90, borderRadius: '20px',
                        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.2rem', color: '#fff', fontWeight: 700,
                        boxShadow: '0 8px 20px -6px rgba(15, 23, 42, 0.25)',
                        transition: 'background 0.3s'
                    }}>
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                            {user.name || 'User Account'}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '1rem', marginBottom: '0.75rem' }}>
                            {user.email}
                        </div>
                        <span style={{
                            background: '#F1F5F9',
                            color: '#475569',
                            border: '1px solid #E2E8F0',
                            fontSize: '0.75rem', fontWeight: 700,
                            padding: '6px 12px', borderRadius: '100px',
                            letterSpacing: '0.04em', textTransform: 'uppercase',
                            transition: 'all 0.3s'
                        }}>
                            Edit Profile
                        </span>
                    </div>
                </Link>

                {/* EXPORT DATA TILE (Replaces Appearance) */}
                <button
                    onClick={handleExportData}
                    style={tileStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    disabled={isExporting}
                >
                    <div style={{ ...iconBoxStyle, color: '#F59E0B' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </div>
                    <div style={{ width: '100%' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                            {isExporting ? 'Exporting...' : 'Export Data'}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                            Download your personal settings JSON.
                        </p>
                    </div>
                </button>

                {/* NOTIFICATIONS TILE (With Persistence) */}
                <button
                    onClick={toggleDigest}
                    style={tileStyle}
                    onMouseEnter={(e) => handleMouseEnter(e, '#8B5CF6')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div style={{ ...iconBoxStyle, color: '#8B5CF6' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </div>
                    <div style={{ width: '100%' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                            Notifications
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                Digest Frequency
                            </p>
                            <span style={{
                                fontSize: '0.8rem', fontWeight: 600, color: '#8B5CF6',
                                background: '#F3E8FF', padding: '2px 8px', borderRadius: '4px'
                            }}>
                                {digestFreq}
                            </span>
                        </div>
                    </div>
                </button>

                {/* SUPPORT TILE (Link functionality) */}
                <a
                    href="mailto:support@gitcalm.com"
                    style={{ ...tileStyle, textDecoration: 'none' }}
                    onMouseEnter={(e) => handleMouseEnter(e, '#10B981')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div style={{ ...iconBoxStyle, color: '#10B981' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                            Help & Support
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                            Contact our support team.
                        </p>
                    </div>
                </a>

                {/* CLEAR CACHE TILE */}
                <button
                    onClick={handleClearCache}
                    disabled={isClearing}
                    style={tileStyle}
                    onMouseEnter={(e) => handleMouseEnter(e, '#3B82F6')}
                    onMouseLeave={handleMouseLeave}
                >
                    <div style={{ ...iconBoxStyle, color: '#3B82F6', background: '#EFF6FF' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                    </div>
                    <div style={{ width: '100%' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                            {isClearing ? 'Clearing...' : 'Local Data'}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                            Clear cache & reload.
                        </p>
                    </div>
                </button>

                {/* SIGN OUT TILE */}
                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    style={{ ...tileStyle, background: 'rgba(254, 226, 226, 0.4)', borderColor: '#FECACA' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(220, 38, 38, 0.15)';
                        e.currentTarget.style.background = '#FEF2F2';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = 'rgba(254, 226, 226, 0.4)';
                    }}
                >
                    <div style={{ ...iconBoxStyle, background: '#FEF2F2', color: '#EF4444' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#991B1B', marginBottom: '0.25rem' }}>
                            Sign Out
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#B91C1C' }}>
                            End session safely.
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
}
