import Link from 'next/link'

export default function HomePage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>chuj dupa cipa jebac czarne kurwy</h1>
            <p>Gówno gówno </p>
            <Link href="/login">
                <button
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '20px',
                    }}
                >
                    Zaloguj się
                </button>
            </Link>
        </div>
    )
}