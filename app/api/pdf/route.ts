import { renderToBuffer } from '@react-pdf/renderer'
import ResumePDF from '@/components/ResumePDF'
import { NextResponse } from 'next/server'
import React from 'react'

export async function POST(req: Request) {
  const { data } = await req.json()
  const buffer = await renderToBuffer(<ResumePDF data={data} />)
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"'
    }
  })
}