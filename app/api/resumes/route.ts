import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  const resumes = await prisma.resume.findMany({ where: { userId: user!.id } })
  return NextResponse.json(resumes)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  const { title, data, template } = await req.json()
  const resume = await prisma.resume.create({
    data: { title, data, template, userId: user!.id }
  })
  return NextResponse.json(resume)
}
