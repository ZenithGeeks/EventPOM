import { NextRequest, NextResponse } from "next/server"
import Omise from 'omise'

const omise = Omise({
    publicKey: 'pkey_test_63061jt2j1wqegs9yvc',
    secretKey: 'skey_test_63061jttnrntlbxhh6n'
})

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { amount, token } = body

    try {
        const charge = await omise.charges.create({
            amount: amount * 100,
            currency: 'thb',
            card: token
        })
        
        return NextResponse.json({ success: true, charge })
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 400 })
    }
}