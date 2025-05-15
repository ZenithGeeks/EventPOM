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

interface LineChartData {
  month: string;
  solved: number;
  unsolved: number;
}

export default function AverageTicketLineChart({
  data,
}: {
  data: LineChartData[];
}) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Average Tickets Created</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        {data?.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground pt-10">
            No average ticket data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="unsolved"
                stroke="#6366F1"
                name="Avg Ticket Unsolved"
              />
              <Line
                type="monotone"
                dataKey="solved"
                stroke="#10B981"
                name="Avg Ticket Solved"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
