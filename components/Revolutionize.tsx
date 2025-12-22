'use client';


export default function Revolutionize() {
    return (
        <section className="container" style={{
            padding: '8rem 1.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'visible'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>

                {/* Floating Element: Top Left - Chart */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '5%',
                    padding: '0.75rem',
                    width: '120px',
                    transform: 'rotate(-5deg)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                    animation: 'float 6s ease-in-out infinite'
                }}>
                    <svg viewBox="0 0 100 40" width="100%" height="40" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 35 Q 25 35 35 20 T 65 20 T 95 5" />
                    </svg>
                </div>

                {/* Floating Element: Top Right - User Toast */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '0%',
                    padding: '0.6rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    borderRadius: '50px',
                    transform: 'rotate(3deg)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                    animation: 'float 7s ease-in-out infinite 1s'
                }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444' }}>Game-Changing Focus!</span>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3B82F6', overflow: 'hidden' }}>
                        {/* Avatar placeholder */}
                        <svg viewBox="0 0 32 32" fill="#EBF5FF">
                            <circle cx="16" cy="16" r="16" />
                            <path d="M16 16 C 20 16 22 10 22 10 C 22 10 10 10 10 10 C 10 10 12 16 16 16 M16 16 C 10 16 6 32 6 32 H 26 C 26 32 22 16 16 16" fill="#3B82F6" />
                        </svg>
                    </div>
                </div>

                {/* Floating Element: Bottom Left - Tags */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '0%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    animation: 'float 8s ease-in-out infinite 0.5s'
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        boxShadow: '0 5px 20px -5px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#444'
                    }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: '#FCD34D' }}></span>
                        Backend
                    </div>
                    <div style={{
                        background: '#fff',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        boxShadow: '0 5px 20px -5px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#444',
                        marginLeft: '1.5rem'
                    }}>
                        <span style={{ width: 10, height: 10, borderRadius: 50, background: '#3B82F6' }}></span>
                        Frontend
                    </div>
                </div>

                {/* Main Headline */}
                <h2 style={{
                    fontSize: '3.5rem',
                    lineHeight: 1.1,
                    fontWeight: 800,
                    color: 'hsl(var(--foreground))',
                    position: 'relative',
                    zIndex: 1
                }}>
                    Revolutionize Code <br />
                    Review for <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '1.2em',
                        height: '0.8em',
                        background: '#3B82F6',
                        borderRadius: '12px',
                        verticalAlign: 'middle',
                        margin: '0 0.1em',
                        opacity: 0.3
                    }}></span> <br />
                    Effortless Ship
                </h2>
            </div>

            <style jsx>{`
        @keyframes float {
            0% { transform: translateY(0px) rotate(var(--r, 0deg)); }
            50% { transform: translateY(-10px) rotate(var(--r, 0deg)); }
            100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
        }
      `}</style>
        </section>
    );
}
