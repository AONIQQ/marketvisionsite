import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const insertQuery = `
      INSERT INTO contacts (name, email, phone, message, created_at, status)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)
      RETURNING id
    `
    const values = [name, email, phone, message, 'New']

    const result = await query(insertQuery, values)

    if (result.rowCount === 1) {
      return NextResponse.json({ message: 'Inquiry submitted successfully', id: result.rows[0].id }, { status: 201 })
    } else {
      throw new Error('Failed to insert inquiry')
    }
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return NextResponse.json({ error: 'An error occurred while submitting the inquiry' }, { status: 500 })
  }
}