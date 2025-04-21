'use client'

import Image from "next/image"
import { CalendarDateRangeIcon, MapPinIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { data } from './data'
import Add from "../components/buyTicketsPage/addToWishlist"
import Purchase from "../components/buyTicketsPage/purchase"
import TicketListTable from "../components/buyTicketsPage/tickets-list-table"
import tickets from './tickets.json'
import { useState } from "react"
import Script from "next/script"

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
    const payments = [
        {
            id: 1,
            methods: ['/mastercard.png', '/visa.png', '/googlePay.png', '/jcb.png', '/americanExpress.png'],
            alt: ['Mastercard', 'Visa', 'Google Pay', 'JCB', 'American Express'],
            width: [30, 50, 50, 30, 50],
            height: [30, 50, 50, 30, 50]
        },
        {
            id: 2,
            methods: ['/kPlus.png', '/scbEasy.png', '/promptpay.png', '/truemoney.png'],
            alt: ['K Plus', 'SCB Easy', 'PromptPay', 'TrueMoney'],
            width: [30, 30, 60, 100],
            height: [30, 30, 60, 100]
        }
    ]
    const handleOmisePayment = async () => {
        setLoading(true)
        window.Omise.createToken('card', {
            name: 'Jane Doe',
            number: '4242424242424242',
            expiration_month: 12,
            expiration_year: 2025,
            security_code: 123
        }, async (statusCode: number, response: any) => {
            if (response.object === 'token') {
                const token = response.id
                const res = await fetch('/api/charge', {
                    method: 'POST',
                    body: JSON.stringify({ token, amount: total })
                })
                const result = await res.json()

                if (result.success) {
                    setLoading(false)
                    resetTicketCount()
                    alert('Payment successful')
                } else {
                    setLoading(false)
                    alert('Payment failed')
                }
            } else {
                setLoading(false)
                alert('Token creation failed')
            }
        })
    }

    return (
        <main className="pb-[6%] pt-[6%] px-[15%]">
            <div className="flex items-start justify-center mb-[100px] space-x-[100px]">
                <Image
                    src='/bigPepsiPoster.png'
                    alt="Event poster"
                    width={400}
                    height={500}
                />
                <div className="space-y-[15px]">
                    <h1 className="font-bold text-primaryColor text-[25px]">Pepsi presents S2O Songkran Music Festival 2025</h1>
                    <div className="flex items-center space-x-[6px]">
                        <CalendarDateRangeIcon className="w-[25px] h-[25px]" />
                        <h1 className="text-[16px]">12 Apr 2025 16:00 - 14 Apr 2025 23:59</h1>
                    </div>
                    <h1 className="font-bold text-[16px]">S2O Factory Company Limited</h1>
                    <div className="flex items-center space-x-[6px]">
                        <MapPinIcon className="w-[25px] h-[25px]" />
                        <h1 className="text-[16px]">Rajamangala National Stadium, Bangkok, Thailand</h1>
                    </div>
                    <h1 className="text-justify text-[16px]">{data.description}</h1>
                    <h1 className="font-bold text-[18px]">Start 1,700 Baht.-</h1>
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
                    <div className="border-borderColor border-[1px] p-[30px] h-fit rounded-[3px] space-y-[25px]">
                        <div className="flex items-center space-x-[6px]">
                            <h1 className="font-bold text-[18px]">Cart</h1>
                            <ShoppingCartIcon className="w-[25px] h-[25px]" />
                        </div>
                        {cartLength === 0 ? (
                            <h1 className="text-[18px]">Your cart is currently empty</h1>
                        ) : (
                            <>
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <h1 className="font-bold max-w-[200px] text-[18px] truncate">{item.name}</h1>
                                        <h1 className="text-[18px]">{item.price.toLocaleString()} Baht.- [{ticketCount[item.id]}]</h1>
                                    </div>
                                ))}
                            </>
                        )}
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-[18px]">Total</h1>
                            <h1 className="font-bold text-[18px]">{total.toLocaleString()} Baht.-</h1>
                        </div>
                        <Purchase
                            loading={loading}
                            handle={handleOmisePayment}
                            cartLength={cartLength}
                        />
                    </div>
                    <h1 className="font-bold text-borderColor text-center text-[18px]">Acceptable payments</h1>
                    {payments.map((item) => (
                        <div key={item.id} className="flex justify-center space-x-[15px]">
                            {item.methods.map((method, index) => (
                                <Image
                                    key={index}
                                    src={method}
                                    alt={item.alt[index]}
                                    width={item.width[index]}
                                    height={item.height[index]}
                                    className="object-contain"
                                />
                            ))}
                        </div>
                    ))}
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