// components/organization/dashboard/ticket-by-channel-chart.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jul", email: 80, chat: 40, form: 30 },
  { month: "Aug", email: 100, chat: 70, form: 45 },
  { month: "Sep", email: 130, chat: 90, form: 70 },
  { month: "Oct", email: 160, chat: 110, form: 80 },
  { month: "Nov", email: 120, chat: 100, form: 60 },
  { month: "Dec", email: 90, chat: 85, form: 50 },
];

export default function TicketByChannelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket by Channels</CardTitle>
      </CardHeader>
      <CardContent className="h-[100vh">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="email" stackId="a" fill="#6366F1" name="Email" />
            <Bar dataKey="chat" stackId="a" fill="#10B981" name="Live Chat" />
            <Bar dataKey="form" stackId="a" fill="#F59E0B" name="Contact Form" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
