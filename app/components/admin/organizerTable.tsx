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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

interface Organizer {
  id: string;
  name: string;
  phone: string;
  type: string;
  ApplicationDocument: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export default function OrganizerTable() {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrganizers = async () => {
      try {
        const res = await fetch("/api/organizations", { cache: "no-store" });
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setOrganizers(data);
        console.log("Organizers:", data);
      } catch (err) {
        toast.error("Failed to fetch organizers");
        console.error("Error fetching organizers:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrganizers();
  }, []);

  const updateStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    const toastId = toast.loading(
      `${status === "APPROVED" ? "Approving" : "Rejecting"} organizer...`
    );

    try {
      const res = await fetch(`/api/organizations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setOrganizers((prev) =>
          prev.map((org) =>
            org.id === id ? { ...org, status: status } : org
          )
        );
        toast.success(`Organizer ${status.toLowerCase()} successfully`, {
          id: toastId,
        });
      } else {
        toast.error("Failed to update organizer status", { id: toastId });
      }
    } catch (error) {
      console.error("Error updating organizer status:", error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (loading)
    return <div className="p-6 text-center">Loading organizers...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white border rounded-xl shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Organizers</h2>
        <p className="text-sm text-muted-foreground">
          {organizers.length} organizers
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizers.map((org) => (
            <TableRow key={org.id}>
              <TableCell className="font-medium">{org.name}</TableCell>
              <TableCell>{org.phone}</TableCell>
              <TableCell>{org.type}</TableCell>
              <TableCell>
                {/\.(jpe?g|png|gif|bmp|webp)$/i.test(org.ApplicationDocument) ? (
                  <a
                    href={org.ApplicationDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={org.ApplicationDocument}
                      alt="Document"
                      width={64}
                      height={48}
                      className="rounded border object-cover"
                    />
                  </a>
                ) : /\.pdf$/i.test(org.ApplicationDocument) ? (
                  <a
                    href={org.ApplicationDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    📄 View PDF
                  </a>
                ) : (
                  <span className="text-gray-500 italic text-sm">
                    Unsupported format
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`capitalize ${
                    org.status === "PENDING"
                      ? "text-yellow-600 border-yellow-600"
                      : org.status === "APPROVED"
                      ? "text-green-600 border-green-600"
                      : "text-red-600 border-red-600"
                  }`}
                >
                  {org.status.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                {org.status === "PENDING" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(org.id, "APPROVED")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => updateStatus(org.id, "REJECTED")}
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
