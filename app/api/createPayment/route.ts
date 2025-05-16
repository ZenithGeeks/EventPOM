import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const response = await fetch(`http://localhost:3001/createPayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body.paymentData)
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json({ success: false, error: data.error }, { status: response.status })
        }

        return NextResponse.json({ success: true, order: data.newOrder }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error}, { status: 500 })
    }
}