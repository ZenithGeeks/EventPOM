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
import Add from "../../components/buyTicketsPage/addToWishlist"
import TicketListTable from "../../components/buyTicketsPage/tickets-list-table"
import tickets from '../tickets.json'
import Cart from "../../components/buyTicketsPage/cart"
import { useState, useEffect } from "react"
import Script from "next/script"
import { toast } from 'react-hot-toast'
import { useParams } from "next/navigation"
import Link from "next/link"

export default function Buy() {
    const { id } = useParams()
    useEffect(() => {
        const getEventByID = async (id: string) => {
            try {
                const res = await fetch(`/api/getEventByID?id=${id}`)
                const result = await res.json()
                setEventByID(result.event)
                console.log(result)
                if (!res.ok) {
                    throw new Error(result.error || 'An unknown error occurred')
                }

                if (result.event.organizerId) {
                    getOrganizer(result.event.organizerId)
                }
            } catch (error) {
                toast.error('Cannot load the event from the database')
            }
        }
        const getEvents = async () => {
            try {
                const res = await fetch('/api/getEvent')
                const result = await res.json()
                setEvents(result.events)

                if (!res.ok) {
                    throw new Error(result.error || 'An unknown error occurred')
                }
            } catch (error) {
                toast.error('Cannot load events from the database')
            }
        }
        getEventByID(id as string)
        getEvents()
    }, [id])
    const [loading, setLoading] = useState<boolean>(false)
    const [ticketCount, setTicketCount] = useState<{ [key: string]: number }>(() => tickets.reduce((acc, ticket) => {
        acc[ticket.id] = 0

        return acc
    }, {} as { [key: string]: number }))
    const [eventByID, setEventByID] = useState<any>([])
    const [events, setEvents] = useState<any>([])
    const [org, setOrg] = useState<any>([])
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
    const trimURL = (url: string) => {
        const index = url.indexOf('.png')

        if (index !== -1) {
            return url.substring(0, index + 4)
        }

        return url
    }
    const changeDateFormat = (isoString: string) => {
        const date = new Date(isoString)
        const day = date.getUTCDate()
        const month = date.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })
        const year = date.getUTCFullYear()
        const hours = date.getUTCHours().toString().padStart(2, '0')
        const minutes = date.getUTCMinutes().toString().padStart(2, '0')

        return `${day} ${month} ${year} ${hours}:${minutes}`
    }
    const getOrganizer = async (id: string) => {
        try {
            const res = await fetch(`/api/getOrganizer?id=${id}`)
            const result = await res.json()
            setOrg(result.organizer)

            if (!res.ok) {
                throw new Error(result.error || 'An unknown error occurred')
            }
        } catch (error) {
            toast.error('Cannot load organizer information from the database')
        }
    }

    return (
        <main className="pb-[6%] pt-[6%] px-[15%]">
            <div className="flex items-start justify-center mb-[100px] space-x-[100px]">
                {eventByID && eventByID.imageUrl ? (
                    <Image
                        src={trimURL(eventByID.imageUrl)}
                        alt="Event poster"
                        width={400}
                        height={500}
                    />
                ) : (
                    <div className="bg-primaryColor w-[400px] h-[500px]"></div>
                )}
                <div className="space-y-[15px]">
                    {events.length > 0 ? (
                        <h1 className="font-bold text-primaryColor text-justify text-[25px]">{eventByID?.title}</h1>
                    ) : (
                        <h1 className="font-bold text-primaryColor text-justify text-[25px]">Event title</h1>
                    )}
                    <div className="flex items-center space-x-[6px]">
                        <CalendarDateRangeIcon className="w-[25px] h-[25px]" />
                        {events.length > 0 ? (
                            <h1 className="text-justify text-[16px]">{changeDateFormat(eventByID?.startTime)} - {changeDateFormat(eventByID?.endTime)}</h1>
                        ) : (
                            <h1 className="text-justify text-[16px]">Event date</h1>
                        )}
                    </div>
                    {org && org.name ? (
                        <h1 className="font-bold text-justify text-[16px]">{org.name}</h1>
                    ) : (
                        <h1 className="font-bold text-justify text-[16px]">Organizer name</h1>
                    )}
                    <div className="flex items-center space-x-[6px]">
                        <MapPinIcon className="shrink-0 w-[25px] h-[25px]" />
                        {events.length > 0 ? (
                            <h1 className="text-justify text-[16px]">{eventByID?.location}</h1>
                        ) : (
                            <h1 className="text-justify text-[16px]">Location</h1>
                        )}
                    </div>
                    {events.length > 0 ? (
                        <h1 className="text-justify text-[16px]">{eventByID?.description}</h1>
                    ) : (
                        <h1 className="text-justify text-[16px]">Event description</h1>
                    )}
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
                {(() => {
                    const filteredEvents = events.filter((event: any) => event.id !== eventByID?.id)

                    return Array.from({ length: 2 }).map((_, rowIndex) => {
                        const rowEvents = filteredEvents.slice(rowIndex * 4, rowIndex * 4 + 4)
                        const placeholders = Array(4 - rowEvents.length).fill(null)

                        return (
                            <div key={rowIndex} className="flex justify-between">
                                {rowEvents.map((event: any, index: number) => (
                                    <Link key={index} href={`/buyTicketsPage/${event.id}`}>
                                        <Image
                                            src={trimURL(event.imageUrl)}
                                            alt="Event poster"
                                            width={200}
                                            height={250}
                                            className="cursor-pointer transition-transform duration-150 hover:scale-105"
                                        />
                                    </Link>
                                ))}
                                {placeholders.map((_, emptyIndex) => (
                                    <div key={emptyIndex} className="w-[200px] h-[250px]" />
                                ))}
                            </div>
                        )
                    })
                })()}
            </div>
            <Script src="https://cdn.omise.co/omise.js" onLoad={() => {
                window.Omise.setPublicKey('pkey_test_63061jt2j1wqegs9yvc')
            }} />
        </main>
    )
}