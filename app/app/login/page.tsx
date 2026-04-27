'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) setError('Invalid email or password')
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 border rounded-xl space-y-4">
        <h1 className="text-2xl font-semibold">Log in</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm" required />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm" required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm">
          Log in
        </button>
        <p className="text-sm text-center text-gray-500">
          No account? <a href="/register" className="text-indigo-600">Sign up</a>
        </p>
      </form>
    </div>
  )
}