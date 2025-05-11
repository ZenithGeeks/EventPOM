"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  phone?: string | null;
  address?: string | null;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name ?? "",
      role: user.role,
      phone: user.phone ?? "",
      address: user.address ?? "",
      image: user.image ?? "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? updated.user : u))
        );
        setDialogOpen(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading users...</div>;

  return (
    <>
      <div className="w-[70rem] mx-auto rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Users</h2>
          <span className="text-sm text-muted-foreground">
            {users?.length} users
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
                <Fragment key={user.id}>
                <TableRow>
                  <TableCell>
                    <button onClick={() => toggleRow(user.id)}>
                      {expandedRowId === user.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.image || "/avatars/default.png"}
                        alt={user.name ?? user.email}
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {user.name || "Unnamed User"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          @{user?.email?.split("@")[0]}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize text-sm">
                    <Badge
                      variant={user.role === "ADMIN" ? "outline" : "outline"}
                      className={
                        user.role === "ADMIN"
                          ? "bg-[#DBFCE6] text-black"
                          : user.role === "ORGANIZER"
                          ? "bg-[#F9F5C5] text-black"
                          : "bg-white"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(user)}
                    >
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>

                <AnimatePresence mode="wait">
                  {expandedRowId === user.id && (
                    <motion.tr
                      key={`expanded-${user.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td colSpan={5} className="px-6 pb-4 pt-0">
                        <div className="text-sm text-muted-foreground space-y-2 pt-2">
                          {user.phone && (
                            <div>
                              <strong>Phone:</strong> {user.phone}
                            </div>
                          )}
                          {user.address && (
                            <div>
                              <strong>Address:</strong> {user.address}
                            </div>
                          )}
                          {user.image && (
                            <div>
                              <strong>Image URL:</strong>{" "}
                              <a
                                href={user.image}
                                target="_blank"
                                className="text-blue-500 hover:underline"
                              >
                                {user.image}
                              </a>
                            </div>
                          )}
                          {!user.phone && !user.address && !user.image && (
                            <em>No additional details</em>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <div>
            <label className="text-sm font-medium mb-1 block">Role</label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="ORGANIZER">ORGANIZER</SelectItem>
                <SelectItem value="ORGANIZER_STAFF">STAFF</SelectItem>
              </SelectContent>
            </Select>
          </div>
            <Input
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Input
              placeholder="Address"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={formData.image || ""}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
