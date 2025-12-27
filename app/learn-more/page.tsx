'use client';

export default function LearnMore() {
    return (
        <section style={{
            minHeight: '100vh',
            background: 'hsl(var(--background))',
            color: '#1a1a1a',
            fontFamily: 'sans-serif',
            overflow: 'hidden',
            paddingTop: '6rem' // Space for navbar
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 4rem 1.5rem' }}>

                {/* 1. Centered Mission Statement */}
                <div style={{ textAlign: 'center', marginBottom: '5rem', paddingTop: '2rem' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 400, // Slightly lighter weight like the ref
                        lineHeight: 1.2,
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        Our mission is to help engineers <br />
                        restore their flow and <br />
                        <span style={{ fontWeight: 600 }}>ship without the distractions</span>
                    </h1>
                </div>

                {/* 2. Split Content: Story & Visual */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                    {/* Left: Interactive Text */}
                    <div style={{ paddingRight: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '1.5rem' }}>
                            The Signal vs. Noise Problem
                        </h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem', opacity: 0.8 }}>
                            GitHub was built for code storage, not daily digestion. As teams scale, the stream of notifications, PR reviews, and CI status checks becomes a firehose that drowns out actual progress.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem', opacity: 0.8 }}>
                            GitCalm acts as your intelligent filter. Instead of checking 50 browser tabs, you start your day with a single, prioritized digest. We surface the critical architectural discussions and blocked PRs, while quieting the routine noise.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8 }}>
                            It&apos;s not just about saving time; it&apos;s about reclaiming your attention span. By batching updates and highlighting velocity blockers, distinct teams can align asynchronously and stay in the zone.
                        </p>
                    </div>

                    {/* Right: Globe Illustration */}
                    <div style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        {/* The Globe */}
                        <div style={{
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            background: '#3B82F6', // Blue globe
                            position: 'relative',
                            border: '2px solid #1a1a1a',
                            overflow: 'hidden'
                        }}>
                            {/* Styling Element: Continent Shape 1 */}
                            <div style={{
                                position: 'absolute',
                                top: '10%',
                                right: '-10%',
                                width: '250px',
                                height: '250px',
                                background: '#fff',
                                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                            }}></div>
                            {/* Styling Element: Continent Shape 2 */}
                            <div style={{
                                position: 'absolute',
                                bottom: '15%',
                                left: '-5%',
                                width: '150px',
                                height: '150px',
                                background: '#fff',
                                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                            }}></div>
                            {/* Styling Element: Orbit Line */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '-10%',
                                width: '120%',
                                height: '100px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '50%',
                                transform: 'rotate(-15deg)'
                            }}></div>
                        </div>


                        {/* Floating Element: Big Center Pin (Like reference heart pin) */}
                        <div style={{
                            position: 'absolute',
                            top: '15%',
                            right: '35%',
                            background: '#fff',
                            border: '2px solid #1a1a1a',
                            borderRadius: '50% 50% 50% 0',
                            transform: 'rotate(-45deg)',
                            width: '80px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{ transform: 'rotate(45deg)' }}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </div>
                        </div>


                        {/* Floating Element: Purple Horizontal Pill */}
                        <div style={{
                            position: 'absolute',
                            top: '25%',
                            left: '10%',
                            background: '#D8B4FE', // Purple-ish
                            border: '2px solid #1a1a1a',
                            borderRadius: '50px',
                            padding: '0.5rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
                                <circle cx="18" cy="18" r="3"></circle>
                                <circle cx="6" cy="6" r="3"></circle>
                                <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                                <line x1="6" y1="9" x2="6" y2="21"></line>
                            </svg>
                        </div>


                        {/* Floating Element: Green Pill */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20%',
                            left: '15%',
                            background: '#bef264', // Lime green
                            border: '2px solid #1a1a1a',
                            borderRadius: '50px',
                            padding: '0.5rem 2rem',
                            height: '40px',
                            boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
                        }}></div>

                        {/* Floating Element: Yellow Speech Bubble */}
                        <div style={{
                            position: 'absolute',
                            top: '40%',
                            right: '5%',
                            background: '#FCD34D', // Yellow
                            border: '2px solid #1a1a1a',
                            borderRadius: '12px',
                            width: '60px',
                            height: '50px',
                            boxShadow: '4px 4px 0px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{ width: '30px', height: '2px', background: '#1a1a1a', borderRadius: '2px', boxShadow: '0 5px 0 0 #1a1a1a, 0 -5px 0 0 #1a1a1a' }}></div>
                        </div>

                        {/* Sparkle 1 */}
                        <div style={{ position: 'absolute', top: '10%', left: '40%', fontSize: '2rem', color: '#F59E0B' }}>✦</div>
                        {/* Sparkle 2 */}
                        <div style={{ position: 'absolute', bottom: '10%', right: '20%', fontSize: '1.5rem', color: '#F59E0B' }}>✦</div>
                        {/* Circle 1 */}
                        <div style={{ position: 'absolute', bottom: '30%', right: '-5%', width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #1a1a1a', background: '#fff' }}></div>


                    </div>
                </div>

            </div>
        </section>
    );
}
