'use client';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #f0f0f0'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '80px'
            }}>
                {/* Logo */}
                <Link href="/" style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000' }}>
                    <div style={{ width: 10, height: 10, background: '#000', borderRadius: '50%' }}></div>
                    <div style={{ width: 10, height: 10, background: '#000', borderRadius: '50%', opacity: 0.5 }}></div>
                    GitCalm
                </Link>

                {/* Navigation */}
                <div style={{ display: 'none', gap: '2rem', alignItems: 'center', fontSize: '0.9rem', fontWeight: 500, color: '#444' }}>
                    {/* Note: In a real responsive app, this would be hidden on mobile/shown on desktop via media query */}
                    <Link href="#features">Why GitCalm</Link>
                    <Link href="#product">Product</Link>
                    <Link href="#solutions">Solutions</Link>
                    <Link href="#resources">Resources</Link>
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {/* Search Icon Placeholder */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>

                    <Link href="/login" style={{
                        background: '#000',
                        color: '#fff',
                        padding: '0.6rem 1.4rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Try GitCalm
                    </Link>
                </div>
            </div>

            {/* Desktop view hack for menu items (since we are doing inline styles only for now) */}
            <style jsx>{`
        @media (min-width: 768px) {
          nav div:nth-child(2) { display: flex !important; }
        }
      `}</style>
        </nav>
    );
}
