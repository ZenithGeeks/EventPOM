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
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  phone?: string | null;
  address?: string | null;
  lastActiveAt?: string | null;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByRole, setSortByRole] = useState(false);

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
      body: JSON.stringify({
        ...formData,
        email: editingUser.email, // ✅ Ensure email is not lost
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? updated.user : u))
      );
      toast.success("User updated successfully");
      setDialogOpen(false);
    } else {
      toast.error("Failed to update user");
    }
  } catch (err) {
    console.error("Error updating user:", err);
    toast.error("Error updating user");
  }
};

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const filteredUsers = users
    .filter((user) => {
      const q = searchQuery.toLowerCase();
      return (
        user.name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (!sortByRole) return 0;
      return a.role.localeCompare(b.role);
    });

  if (loading) {
    return (
      <div className="flex justify-center p-10 text-gray-500">
        <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        Loading users...
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[70rem] mx-auto rounded-xl border bg-white p-6 shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Users</h2>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button
              variant="outline"
              onClick={() => setSortByRole((prev) => !prev)}
            >
              Sort by Role {sortByRole ? "↓" : "↑"}
            </Button>
            <span className="text-sm text-muted-foreground">
              {filteredUsers.length} users
            </span>
          </div>
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
            {filteredUsers.map((user) => (
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
                      variant="outline"
                      className={
                        user.role === "ADMIN"
                          ? "bg-green-100 text-green-800"
                          : user.role === "ORGANIZER"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.role === "ORGANIZER_STAFF"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user?.email}</TableCell>
                  <TableCell className="text-right flex gap-1 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(user)}
                    >
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️
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
                      transition={{ duration: 0.25 }}
                    >
                      <td colSpan={5} className="px-6 pb-4 pt-0">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-sm text-muted-foreground space-y-2 pt-2"
                        >
                          {user.phone && <div><strong>Phone:</strong> {user.phone}</div>}
                          {user.address && <div><strong>Address:</strong> {user.address}</div>}
                          {user.image && (
                            <div>
                              <strong>Image URL:</strong>{" "}
                              <a href={user.image} target="_blank" className="text-blue-500 hover:underline">
                                {user.image}
                              </a>
                            </div>
                          )}
                          {user.lastActiveAt && (
                            <div>
                              <strong>Status:</strong>{" "}
                              <span
                                className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                  new Date(user.lastActiveAt) > new Date(Date.now() - 3 * 60 * 1000)
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              ></span>
                              {new Date(user.lastActiveAt) > new Date(Date.now() - 3 * 60 * 1000)
                              ? "Online"
                              : `Last seen at ${new Date(user.lastActiveAt).toLocaleString("en-TH", {
                                  timeZone: "Asia/Bangkok",
                                  dateStyle: "short",
                                  timeStyle: "short",
                                })}`}
                            </div>
                          )}
                          {!user.phone && !user.address && !user.image && !user.lastActiveAt && (
                            <em>No additional details</em>
                          )}
                        </motion.div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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