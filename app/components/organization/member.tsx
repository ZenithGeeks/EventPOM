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

const Member: React.FC = () => {
  return (
    <div className="p-6 md:p-8 lg:p-10 bg-white max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">Member</h2>
        <Table className="w-full">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Karina</TableCell>
              <TableCell>SMentertainment@gmail.com</TableCell>
              <TableCell className="text-right">Organizer</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
  );
};

export default Member;
