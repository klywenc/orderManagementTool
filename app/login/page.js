'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    if (!result.error) {
      router.push('/adminPanel') //daj tu coś potem.
    } else {
      setError('Niepoirawne hasło')
    }
  }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bayero Hassan jebane gówno</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    style={{ padding: '10px', margin: '10px', width: '300px' }}
                />
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Hasło"
                    required
                    style={{ padding: '10px', margin: '10px', width: '300px' }}
                />
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '20px',
                    }}
                >
                    Zaloguj
                </button>
            </form>
        </div>
    )
}