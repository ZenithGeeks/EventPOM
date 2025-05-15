"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

interface ChartEntry {
  label: string;
  ticketsSold: number;
  attendees: number;
}

export function ChartComponent({ data }: { data: ChartEntry[] }) {
  return (
    <div className="w-full min-h-[250px]">
      {data.length === 0 ? (
        <div className="text-center text-muted-foreground py-10 text-sm">
          No ticket or attendance data to display.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ticketsSold" fill="#3B82F6" name="Tickets Sold" radius={[4, 4, 0, 0]} />
            <Bar dataKey="attendees" fill="#10B981" name="Attendees" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
