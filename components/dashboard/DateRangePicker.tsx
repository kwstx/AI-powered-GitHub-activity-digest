'use client';
import { useState, useRef, useEffect } from 'react';

interface DateRangePickerProps {
    startDate: Date;
    endDate: Date;
    onChange: (start: Date, end: Date) => void;
}

export default function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Helpers
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePreset = (days: number) => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days);
        onChange(start, end);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: isOpen ? '#e5e7eb' : '#F3F4F6',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#374151',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.2s',
                    outline: 'none'
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                {formatDate(startDate)} - {formatDate(endDate)}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '300px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                    padding: '1rem',
                    zIndex: 100,
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Presets</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <button onClick={() => handlePreset(7)} style={presetStyle}>Last 7 Days</button>
                            <button onClick={() => handlePreset(30)} style={presetStyle}>Last 30 Days</button>
                            <button onClick={() => handlePreset(90)} style={presetStyle}>Last 3 Months</button>
                            <button onClick={() => handlePreset(0)} style={presetStyle}>Today</button>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center', fontStyle: 'italic' }}>
                            Custom range picker coming in v2.0
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const presetStyle = {
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: '#fff',
    color: '#334155',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.1s'
} as const;
