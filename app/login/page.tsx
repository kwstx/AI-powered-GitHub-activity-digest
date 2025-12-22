import Link from 'next/link';

export default function Login() {
    return (
        <div className="container" style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', maxWidth: '400px', width: '100%' }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Welcome Back</h1>
                <p style={{ marginBottom: '2rem', opacity: 0.7 }}>Sign in to continue to GitCalm (Demo)</p>

                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                    Continue with GitHub
                </button>

                <Link href="/" style={{ fontSize: '0.9rem', opacity: 0.6, textDecoration: 'underline' }}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
