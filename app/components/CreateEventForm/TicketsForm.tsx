"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Ticket {
  name: string;
  description: string;
  price: number;
  date?: Date;
}

export default function TicketsForm() {
  const [tickets, setTickets] = React.useState<Ticket[]>([
    {
      name: "",
      description: "",
      price: 0,
    },
  ]);

  function handleAddTicket() {
    setTickets((prev) => [
      ...prev,
      { name: "", description: "", price: 0 },
    ]);
  }

  function handleUpdateTicket(index: number, updates: Partial<Ticket>) {
    setTickets((prev) => {
      const newTickets = [...prev];
      newTickets[index] = { ...newTickets[index], ...updates };
      return newTickets;
    });
  }
  function handleDeleteTicket(index: number) {
    setTickets((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full border border-gray-400 shadow-sm overflow-hidden mt-8">
      <div className="bg-[#2A2A6D] text-white px-4 py-3">
        <h2 className="text-lg font-bold">Tickets</h2>
      </div>

      <div>
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-b border-gray-400 pb-4 mb-4 p-4 last:mb-0 last:border-none"
          >
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Ticket Name</Label>
              <Input
                placeholder="Input ticket name"
                value={ticket.name}
                onChange={(e) =>
                  handleUpdateTicket(index, { name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Ticket Description</Label>
              <Textarea
                placeholder="Describe your ticket here..."
                value={ticket.description}
                onChange={(e) =>
                  handleUpdateTicket(index, { description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex flex-col gap-1 md:w-1/2">
                <Label className="font-semibold">Price</Label>
                <div className="mt-1 flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleUpdateTicket(index, { price: ticket.price - 1 })
                    }
                    disabled={ticket.price <= 0}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    className="w-20 text-center"
                    value={ticket.price}
                    onChange={(e) =>
                      handleUpdateTicket(index, {
                        price: parseInt(e.target.value, 10) || 0,
                      })
                    }
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleUpdateTicket(index, { price: ticket.price + 1 })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            <div className="flex flex-col gap-1 md:w-1/2">
                <Label className="font-semibold">Sell Ticket Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "mt-1 w-[180px] justify-start text-left font-normal",
                        !ticket.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {ticket.date ? format(ticket.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={ticket.date}
                      onSelect={(date) =>
                        handleUpdateTicket(index, { date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>


            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() => handleDeleteTicket(index)}
              >
                Delete Ticket
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end p-4">
        <Button variant="outline" onClick={handleAddTicket}>
          + Add more ticket
        </Button>
      </div>
    </div>
  );
}
