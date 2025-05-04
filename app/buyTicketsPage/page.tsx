/*
Visa: [4242 4242 4242 4242] or [4111 1111 1111 1111]
Mastercard: [5555 5555 5555 4444] or [5454 5454 5454 5454]
JCB: [3530 1113 3330 0000] or [3566 1111 1111 1113]
American Express: [3782 822463 10005]
Diners Club: {3602 104200 0004}
Discover: {6011 1111 1111 1117}
UnionPay: [6250 9470 0000 0006]
*/
'use client'

import Image from "next/image"
import { CalendarDateRangeIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { data } from './data'
import Add from "../components/buyTicketsPage/addToWishlist"
import TicketListTable from "../components/buyTicketsPage/tickets-list-table"
import tickets from './tickets.json'
import Cart from "../components/buyTicketsPage/cart"
import { useState } from "react"
import Script from "next/script"
import { Toaster, toast } from 'react-hot-toast'

export default function Buy() {
    const [loading, setLoading] = useState(false)
    const [ticketCount, setTicketCount] = useState<{ [key: string]: number }>(() => tickets.reduce((acc, ticket) => {
        acc[ticket.id] = 0

        return acc
    }, {} as { [key: string]: number }))
    const cartItems = tickets.filter(ticket => ticketCount[ticket.id] > 0)
    const cartLength = cartItems.length
    const total = cartItems.reduce((sum, item) => sum + item.price * ticketCount[item.id], 0)
    const resetTicketCount = () => {
        setTicketCount(
            tickets.reduce((acc, ticket) => {
                acc[ticket.id] = 0

                return acc
            }, {} as { [key: string]: number })
        )
    }
    const posters = [
        {
            id: 1,
            eventPosters: ['/bnkElection.png', '/bnkBattle.png', '/lordOfTheRings.jpg', '/boyNextWorld.jpg']
        },
        {
            id: 2,
            eventPosters: ['/gelboys.jpg', '/generativeAI.png', '/bccScience.jpg', '/bccArt.jpg']
        }
    ]
    const handleOmisePayment = async () => {
        window.OmiseCard.configure({
            publicKey: 'pkey_test_63061jt2j1wqegs9yvc',
            currency: 'thb',
            frameLabel: 'Event ticket payment',
            submitLabel: 'Pay now',
            buttonLabel: 'Pay with Omise',
            defaultPaymentMethod: 'credit_card',
            otherPaymentMethods: ['internet_banking', 'mobile_banking', 'promptpay', 'rabbit_linepay', 'truemoney']
        })
        window.OmiseCard.open({
            amount: total * 100,
            onCreateTokenSuccess: async (token: string) => {
                const toastID = toast.loading('Processing')
                setLoading(true)
                const res = await fetch('/api/charge', {
                    method: 'POST',
                    body: JSON.stringify({ token, amount: total })
                })
                const result = await res.json()

                if (result.success) {
                    resetTicketCount()
                    toast.success('Payment successful', { id: toastID })
                } else {
                    toast.error('Payment failed', { id: toastID })
                }

                setLoading(false)
            }
        })
    }

    return (
        <main className="pb-[6%] pt-[6%] px-[15%]">
            <Toaster />
            <div className="flex items-start justify-center mb-[100px] space-x-[100px]">
                <Image
                    src='/bigPepsiPoster.png'
                    alt="Event poster"
                    width={400}
                    height={500}
                />
                <div className="space-y-[15px]">
                    <h1 className="font-bold text-primaryColor text-justify text-[25px]">Pepsi presents S2O Songkran Music Festival 2025</h1>
                    <div className="flex items-center space-x-[6px]">
                        <CalendarDateRangeIcon className="w-[25px] h-[25px]" />
                        <h1 className="text-justify text-[16px]">12 Apr 2025 16:00 - 14 Apr 2025 23:59</h1>
                    </div>
                    <h1 className="font-bold text-justify text-[16px]">S2O Factory Company Limited</h1>
                    <div className="flex items-center space-x-[6px]">
                        <MapPinIcon className="w-[25px] h-[25px]" />
                        <h1 className="text-justify text-[16px]">Rajamangala National Stadium, Bangkok, Thailand</h1>
                    </div>
                    <h1 className="text-justify text-[16px]">{data.description}</h1>
                    <h1 className="font-bold text-justify text-[18px]">Start 1,700 Baht.-</h1>
                    <Add />
                </div>
            </div>
            <div className="flex mb-[100px] space-x-[60px]">
                <TicketListTable
                    Tickets={tickets}
                    ticketCount={ticketCount}
                    setTicketCount={setTicketCount}
                />
                <div className="flex-grow space-y-[15px]">
                    <Cart length={cartLength} items={cartItems} ticketCount={ticketCount} total={total} loading={loading} handle={handleOmisePayment} />
                </div>
            </div>
            <div className="space-y-[60px]">
                <h1 className="font-bold text-center text-[25px]">You might be interested in</h1>
                {posters.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        {item.eventPosters.map((poster, index) => (
                            <Image
                                key={index}
                                src={poster}
                                alt="Event poster"
                                width={200}
                                height={250}
                                className="cursor-pointer transition-transform duration-150 hover:scale-105"
                            />
                        ))}
                    </div>
                ))}
            </div>
            <Script src="https://cdn.omise.co/omise.js" onLoad={() => {
                window.Omise.setPublicKey('pkey_test_63061jt2j1wqegs9yvc')
            }} />
        </main>
    )
}