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
  DialogTrigger,
  DialogDescription,
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
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN" | "ORGANIZER" | "ORGANIZER_STAFF";
  image: string | null;
  phone?: string | null;
  address?: string | null;
  lastActiveAt?: string | null;
}

interface MemberProps {
  organizerId: string;
}

export default function Member({ organizerId }: MemberProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [eligibleUsers, setEligibleUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAddMemberOpen, setDialogAddMemberOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByRole, setSortByRole] = useState(false);
  const [member, setMember] = useState<string>("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadUsers = async () => {
      try {
        const [orgRes, allRes] = await Promise.all([
          fetch(`/api/getUsersByOrganizationId?organizerId=${organizerId}`, {
            cache: "no-store",
          }),
          fetch("/api/users", { cache: "no-store" }),
        ]);

        const orgData: { users: User[] } = await orgRes.json();
        const allData: { users: User[] } = await allRes.json();

        setUsers(orgData.users);

        const orgEmails = new Set(orgData.users.map((u) => u.email));
        const notInOrg = allData.users.filter((u) => !orgEmails.has(u.email));
        setEligibleUsers(notInOrg);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [organizerId]);

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
        const result: { user: User } = await res.json();
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? result.user : u))
        );
        setDialogOpen(false);
      } else {
        toast.error("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };


  const handleAddMember = async (userId: string) => {
    setDialogAddMemberOpen(false);

    try {
      const res = await fetch("/api/postUserByOrganizationId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organizerId, userID: userId }),
      });

      if (res.ok) {
        const result: { user: User } = await res.json();
        setUsers((prev) => [...prev, result.user]);
        toast.success("Member added successfully");
      } else {
        toast.error("Failed to add member");
      }
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  const filteredUsers = users
    .filter((user) =>
      searchQuery
        ? user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) =>
      sortByRole ? a.role.localeCompare(b.role) : 0
    );

  if (loading) {
    return (
      <div className="flex justify-center p-10 text-gray-500">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Loading users...
      </div>
    );
  }

  return (
    <>
      {/* Add Member Dialog */}
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-semibold mb-3">Members</h1>
        <Dialog
          open={dialogAddMemberOpen}
          onOpenChange={setDialogAddMemberOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setDialogAddMemberOpen(true);
                setMember("");
              }}
              className="bg-[#2A2A6D] text-white rounded-md hover:bg-opacity-90"
            >
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Member</DialogTitle>
              <DialogDescription>
                Select a user to add to your organization.
              </DialogDescription>
            </DialogHeader>

            <Select value={member} onValueChange={setMember}>
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {eligibleUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name ? `${user.name} — ${user.email}` : user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setDialogAddMemberOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAddMember(member)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Member Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[55rem] mx-auto rounded-xl border bg-white p-6 shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Manage Your Members</h2>
          <div className="flex space-x-4">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-[250px] border border-gray-300 rounded-md px-4"
            />
            <Select
              value={sortByRole ? "role" : ""}
              onValueChange={(value) => setSortByRole(value === "role")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="role">Role</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <Fragment key={user.id}>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Image
                          src={user.image && user.image.trim() !== "" ? user.image : "/default-avatar.png"}
                          alt={user.name ?? ""}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Name"
              value={formData.name ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <div>
              <label className="text-sm font-medium mb-1 block">Role</label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value as User["role"] })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="ORGANIZER">ORGANIZER</SelectItem>
                  <SelectItem value="ORGANIZER_STAFF">STAFF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Phone"
              value={formData.phone ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Input
              placeholder="Address"
              value={formData.address ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={formData.image ?? ""}
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
