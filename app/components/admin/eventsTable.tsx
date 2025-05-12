"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  organizerId: string;
  categoryId: number;
}

export default function EventsTable() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const toggleDescription = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        const data = await res.json();
        setEvents(data.events);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const updateEventStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    const action = status === "APPROVED" ? "Approving" : "Rejecting";
    const toastId = toast.loading(`${action} event...`);

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setEvents((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status } : e))
        );
        toast.success(`Event ${status.toLowerCase()} successfully`, {
          id: toastId,
        });
      } else {
        toast.error(`Failed to ${status.toLowerCase()} event`, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading events...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white border rounded-xl shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Events</h2>
        <p className="text-sm text-muted-foreground">{events.length} events</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Poster</TableHead>
            <TableHead>Title & Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={60}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="w-[20rem]">
                <div className="font-medium">{event.title}</div>

                {/* 🔽 Dropdown with animation */}
                <AnimatePresence mode="wait">
                  {expandedRowId === event.id ? (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-muted-foreground mt-1"
                    >
                      <p>{event.description}</p>
                      <button
                        className="text-blue-600 text-xs hover:underline mt-1"
                        onClick={() => toggleDescription(event.id)}
                      >
                        Show less
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-muted-foreground mt-1"
                    >
                      <p>
                        {event.description.slice(0, 40)}
                        {event.description.length > 40 && "..."}
                      </p>
                      {event.description.length > 40 && (
                        <button
                          className="text-blue-600 text-xs hover:underline mt-1"
                          onClick={() => toggleDescription(event.id)}
                        >
                          Show more
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <div className="text-sm">
                  {format(new Date(event.startTime), "dd MMM yyyy, HH:mm")} –{" "}
                  {format(new Date(event.endTime), "HH:mm")}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`capitalize ${
                    event.status === "PENDING_APPROVAL"
                      ? "text-yellow-600 border-yellow-600"
                      : event.status === "APPROVED"
                      ? "text-green-600 border-green-600"
                      : "text-red-600 border-red-600"
                  }`}
                >
                  {event.status.replace("_", " ").toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                {event.status === "PENDING_APPROVAL" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateEventStatus(event.id, "APPROVED")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => updateEventStatus(event.id, "REJECTED")}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
