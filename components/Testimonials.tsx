export default function Testimonials() {
    return (
        <section className="container" style={{ padding: '2rem 1.5rem 6rem', textAlign: 'center' }}>
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 600, opacity: 0.5, marginBottom: '2rem' }}>Trusted by engineering teams at</p>

            {/* Logos (Placeholders) */}
            <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', opacity: 0.4, filter: 'grayscale(1)', marginBottom: '5rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'serif' }}>ACME Corp</h3>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'sans-serif' }}>Globex</h3>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'monospace' }}>Soylent</h3>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Initech</h3>
            </div>

            <div className="grid-bento">
                <div className="card" style={{ padding: '2rem', textAlign: 'left' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        &quot;I used to spend an hour every morning just catching up on GitHub notifications. GitCalm wraps it up in 5 minutes.&quot;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)' }}></div>
                        <div>
                            <div style={{ fontWeight: 600 }}>Alex Chen</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>Senior Engineer</div>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: '2rem', textAlign: 'left' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        &quot;The priority detection is a lifesaver. It flagged a revert that I would have missed in the noise.&quot;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' }}></div>
                        <div>
                            <div style={{ fontWeight: 600 }}>Sarah Jenkins</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>CTO, OpenStart</div>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ padding: '2rem', textAlign: 'left' }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        &quot;Finally, a tool that understands not every comment needs a push notification. The daily digest is perfect.&quot;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)' }}></div>
                        <div>
                            <div style={{ fontWeight: 600 }}>David Kim</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>Tech Lead</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
