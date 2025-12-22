export default function Footer() {
    return (
        <footer style={{
            padding: '3rem 0',
            borderTop: '1px solid var(--border)',
            background: 'var(--card-bg)',
            marginTop: 'auto'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: 0.6,
                fontSize: '0.9rem'
            }}>
                <p>&copy; {new Date().getFullYear()} GitCalm. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
