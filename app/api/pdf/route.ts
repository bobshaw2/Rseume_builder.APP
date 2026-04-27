import { renderToBuffer } from '@react-pdf/renderer'
import ResumePDF from '@/components/ResumePDF'
import { NextResponse } from 'next/server'
import React from 'react'

export async function POST(req: Request) {
  const { data } = await req.json()
  
  const element = React.createElement(ResumePDF, { data })
  const buffer = await renderToBuffer(element)
  
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"'
    }
  })
}