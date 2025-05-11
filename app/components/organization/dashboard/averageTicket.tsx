// components/organization/dashboard/average-ticket-line-chart.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const lineData = [
  { month: "Jun", solved: 500, unsolved: 3000 },
  { month: "Jul", solved: 700, unsolved: 2900 },
  { month: "Aug", solved: 1100, unsolved: 2700 },
  { month: "Sep", solved: 1400, unsolved: 2500 },
  { month: "Oct", solved: 1600, unsolved: 2200 },
  { month: "Nov", solved: 1900, unsolved: 2000 },
  { month: "Dec", solved: 2100, unsolved: 1900 },
];

export default function AverageTicketLineChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Average Tickets Created</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="unsolved" stroke="#6366F1" name="Avg Ticket Unsolved" />
            <Line type="monotone" dataKey="solved" stroke="#10B981" name="Avg Ticket Solved" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
