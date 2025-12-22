export default function Features() {
    return (
        <section id="features" className="container" style={{ padding: '6rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 style={{ fontSize: 'var(--font-h2)', marginBottom: '1.5rem' }}>Focus on the Signal</h2>
                <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
                    GitCalm filters the noise so you can spot what matters.
                </p>
            </div>

            <div className="grid-bento">
                {/* Large Feature - Summarization */}
                <div className="glass col-span-2" style={{ padding: '3rem', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ marginBottom: '1.5rem', background: 'hsl(var(--primary))', width: 48, height: 48, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>✨</div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Intelligent Activity Summarization</h3>
                        <p style={{ opacity: 0.7, fontSize: '1.1rem', maxWidth: '540px', lineHeight: 1.6 }}>
                            We cluster hundreds of commits, comments, and CI runs into a single, readable story. Know exactly what shipped without diving into the noise.
                        </p>
                    </div>
                    {/* Decorative background element */}
                    <div style={{ position: 'absolute', right: '-10%', bottom: '-20%', width: '300px', height: '300px', background: 'hsl(var(--primary))', opacity: 0.05, borderRadius: '50%', filter: 'blur(60px)' }}></div>
                </div>

                {/* Priority Detection */}
                <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
                    <div>
                        <div style={{ marginBottom: '1.5rem', background: '#ef4444', width: 48, height: 48, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>!</div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Priority Detection</h3>
                        <p style={{ opacity: 0.7, lineHeight: 1.5 }}>
                            Instantly see failed CI runs, reverted commits, and blocking reviews.
                        </p>
                    </div>
                    <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.5 }}>Auto-triaged by severity</div>
                </div>

                {/* Context Aware */}
                <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
                    <div>
                        <div style={{ marginBottom: '1.5rem', background: '#ec4899', width: 48, height: 48, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>Ω</div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Role-Aware Views</h3>
                        <p style={{ opacity: 0.7, lineHeight: 1.5 }}>
                            Custom views for Tech Leads vs Contributors. See only what impacts you.
                        </p>
                    </div>
                </div>

                {/* Actionable Digests */}
                <div className="glass col-span-2" style={{ padding: '3rem', minHeight: '300px', display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Actionable Digests</h3>
                        <p style={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: 1.6 }}>
                            Delivered via Email or Slack. Scan in minutes, drill down only when necessary.
                        </p>
                    </div>
                    {/* Visual graphic for email */}
                    <div className="card" style={{ width: '250px', transform: 'rotate(3deg)', padding: '1.5rem', border: '1px solid var(--border)', background: 'var(--background)' }}>
                        <div style={{ height: 8, width: '40%', background: 'hsl(var(--foreground))', opacity: 0.2, marginBottom: '1rem', borderRadius: 4 }}></div>
                        <div style={{ height: 8, width: '80%', background: 'hsl(var(--foreground))', opacity: 0.1, marginBottom: '0.5rem', borderRadius: 4 }}></div>
                        <div style={{ height: 8, width: '90%', background: 'hsl(var(--foreground))', opacity: 0.1, marginBottom: '0.5rem', borderRadius: 4 }}></div>
                        <div style={{ height: 8, width: '70%', background: 'hsl(var(--foreground))', opacity: 0.1, borderRadius: 4 }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
