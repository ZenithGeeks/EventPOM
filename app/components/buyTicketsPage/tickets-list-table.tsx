"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Ticket {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    status: string;
}

interface TicketListProps {
    Tickets: Ticket[];
}

export default function TicketList({ Tickets }: TicketListProps) {
    const [ticketCounts, setTicketCounts] = useState<{ [key: string]: number }>(
        Tickets?.reduce((acc, ticket) => {
            acc[ticket.id] = 0;
            return acc;
        }, {} as { [key: string]: number })
    );

    const increaseCount = (id: string) => {
        setTicketCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    };

    const decreaseCount = (id: string) => {
        setTicketCounts((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
    };

    return (
        <ScrollArea className="w-[600px] max-h-[500px] pr-[15px] rounded-[3px]">
            <div className="grid">
                <div className="w-full bg-primaryColor p-2 px-10 text-xl font-bold text-white">
                    Tickets
                </div>
                {Tickets.map((ticket) => (
                    <Card key={ticket.id} className="p-4">
                        <CardHeader className="flex justify-between items-start">
                            <CardTitle className="flex flex-row justify-between w-full gap-8">
                                <div className="flex flex-col">
                                    <p className="font-bold text-lg">{ticket.name}</p>
                                    <p className="text-sm text-gray-400 py-2">
                                        {ticket.description}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center justify-start">
                                    <span className="text-md font-bold mx-2">
                                        {ticket.price} Baht.-
                                    </span>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <Button
                                                className="w-[2rem] h-[2rem]"
                                                variant="outline"
                                                onClick={() => decreaseCount(ticket.id)}
                                            >
                                                -
                                            </Button>
                                            <span className="text-lg font-bold">
                                                {ticketCounts[ticket.id]}
                                            </span>
                                            <Button
                                                variant="content"
                                                className="w-[2rem] h-[2rem]"
                                                onClick={() => increaseCount(ticket.id)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    );
}