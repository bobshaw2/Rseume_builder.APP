'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const empty = { name:'', email:'', phone:'', summary:'', experience:'', education:'', skills:'' }

export default function NewResumePage() {
  const [data, setData] = useState(empty)
  const [title, setTitle] = useState('My Resume')
  const router = useRouter()

  function update(field: string, value: string) {
    setData(d => ({ ...d, [field]: value }))
  }

  async function downloadPDF() {
  const res = await fetch('/api/pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data })
  })
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'resume.pdf'
  a.click()
}

  async function save() {
    await fetch('/api/resumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, data, template: 'classic' })
    })
    router.push('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Resume editor</h1>
      <input value={title} onChange={e => setTitle(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm font-medium" placeholder="Resume title" />
      {['name','email','phone','summary','experience','education','skills'].map(field => (
        <div key={field}>
          <label className="block text-sm text-gray-500 mb-1 capitalize">{field}</label>
          {['summary','experience','education'].includes(field)
            ? <textarea rows={3} value={(data as any)[field]} onChange={e => update(field, e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
            : <input value={(data as any)[field]} onChange={e => update(field, e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm" />
          }
        </div>
      ))}
      <button onClick={save} className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm">
        Save resume
      </button>
      <button onClick={downloadPDF} className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm">
  Download PDF
</button>
    </div>
  )
}