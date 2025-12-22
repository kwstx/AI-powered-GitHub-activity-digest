'use client';
import { useState } from 'react';

export default function DemoToggle() {
    const [activeTab, setActiveTab] = useState<'noisy' | 'calm'>('calm');

    return (
        <section className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--font-h2)', marginBottom: '2rem' }}>Experience the Clarity</h2>

            {/* Toggle */}
            <div style={{
                display: 'inline-flex',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                padding: '0.25rem',
                marginBottom: '3rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
                <button
                    onClick={() => setActiveTab('noisy')}
                    style={{
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        background: activeTab === 'noisy' ? 'hsl(var(--foreground))' : 'transparent',
                        color: activeTab === 'noisy' ? 'hsl(var(--background))' : 'hsl(var(--foreground))',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        fontSize: '1rem'
                    }}
                >
                    Raw GitHub
                </button>
                <button
                    onClick={() => setActiveTab('calm')}
                    style={{
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        background: activeTab === 'calm' ? 'hsl(var(--foreground))' : 'transparent',
                        color: activeTab === 'calm' ? 'hsl(var(--background))' : 'hsl(var(--foreground))',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        fontSize: '1rem'
                    }}
                >
                    GitCalm
                </button>
            </div>

            {/* Content Area */}
            <div style={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                {activeTab === 'noisy' ? (
                    <div className="card" style={{ width: '100%', maxWidth: '600px', textAlign: 'left', overflow: 'hidden', animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ padding: '0.75rem 1rem', background: '#f6f8fa', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', color: '#57606a', fontWeight: 600 }}>
                            Notifications (142)
                        </div>
                        {/* List of noise */}
                        {[
                            { icon: 'x', color: '#cf222e', text: 'ci/circleci: build-test-deploy job failed', sub: 'payment-service', time: '2m ago' },
                            { icon: '●', color: '#1a7f37', text: 'dependabot[bot] commented on PR #432', sub: 'auth-service', time: '5m ago' },
                            { icon: '●', color: '#9a6700', text: 'review requested: feat: add new schema', sub: 'core-api', time: '12m ago' },
                            { icon: 'x', color: '#cf222e', text: 'tests failed: integration-suite', sub: 'payment-service', time: '15m ago' },
                            { icon: '●', color: '#1a7f37', text: 'merged: fix typo in README', sub: 'docs', time: '22m ago' },
                            { icon: '●', color: '#0969da', text: 'assigned: bug: user login timeout', sub: 'webapp', time: '30m ago' }
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                                <div style={{ width: 16, marginTop: 4, color: item.color, fontWeight: 'bold' }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>{item.text}</div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{item.time} • {item.sub}</div>
                                </div>
                            </div>
                        ))}
                        <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'hsl(var(--primary))', cursor: 'pointer' }}>View 136 more...</div>
                    </div>
                ) : (
                    <div className="glass" style={{ width: '100%', maxWidth: '600px', textAlign: 'left', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>✓</div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem' }}>Daily Digest</h3>
                                <span style={{ fontSize: '0.95rem', opacity: 0.6 }}>Prepared for you just now.</span>
                            </div>
                        </div>

                        <div>
                            <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>Key Highlights</p>

                            <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.4)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#ef4444', fontWeight: 600, fontSize: '0.85rem' }}>
                                    <span>⚠</span> Issue Detected
                                </div>
                                <p style={{ lineHeight: 1.5, fontSize: '1rem' }}>
                                    CI failures in <span style={{ fontWeight: 600 }}>payment-service</span> are blocking the release. The integration suite has failed 4 times in a row.
                                </p>
                            </div>

                            <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'hsl(var(--primary))', fontWeight: 600, fontSize: '0.85rem' }}>
                                    <span>🚀</span> Activity Summary
                                </div>
                                <p style={{ lineHeight: 1.5, fontSize: '1rem' }}>
                                    12 PRs were merged today. Most activity was in <span style={{ fontWeight: 600 }}>auth-service</span> (Frontend team) and <span style={{ fontWeight: 600 }}>core-api</span>.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className="btn btn-primary" style={{ width: '100%' }}>View Full Report</button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
}
