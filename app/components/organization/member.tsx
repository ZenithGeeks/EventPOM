import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const members = [
  {
    name: "Karina",
    contact: "SMentertainment@gmail.com",
    role: "Organizer",
  },
  {
    name: "Winter",
    contact: "winter@example.com",
    role: "Coordinator",
  },
];

const Member: React.FC = () => {
  return (
    <div className="p-6 md:p-8 lg:p-10 bg-white max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Member</h2>
      <Table className="w-full">
        <TableCaption>A list of your team members.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] px-6">Name</TableHead>
            <TableHead className="px-6">Contact</TableHead>
            <TableHead className="text-right px-6">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={index}>
              <TableCell className="px-6 font-medium">{member.name}</TableCell>
              <TableCell className="px-6">{member.contact}</TableCell>
              <TableCell className="px-6 text-right">{member.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Member;
