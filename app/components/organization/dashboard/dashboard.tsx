"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartComponent } from "@/app/components/organization/dashboard/chart";
import AverageTicketLineChart from "@/app/components/organization/dashboard/averageTicket";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#6366F1"];

interface DashboardData {
  totalEvents: number;
  ticketsSold: number;
  totalAttendees: number;
  revenueByMethod: { method: string; total: number }[];
  eventsByCategory: { category: string; count: number }[];
  applicationStatus: { status: string; count: number }[];
  customerStratification: {
    created: number;
    positive: number;
    solved: number;
    negative: number;
  };
  chartData: {
  label: string;
  ticketsSold: number;
  attendees: number;
}[];
  averageTicketsByMonth: {
    month: string;
    solved: number;
    unsolved: number;
  }[];


}

export default function OrganizationDashboard({ organizerId }: { organizerId: string }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dashboard/${organizerId}`);
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizerId]);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (!data) return <div className="p-6">No data available</div>;
  const strat = data.customerStratification;

  if(data){
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Events</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {data.totalEvents}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tickets Sold</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-blue-600">
          {data.ticketsSold.toLocaleString()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Attendees</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-600">
          {data.totalAttendees.toLocaleString()}
        </CardContent>
      </Card>

      <Card className="col-span-2 xl:col-span-3">
  <CardHeader>
    <CardTitle>Revenue by Method</CardTitle>
  </CardHeader>
  <CardContent className="flex items-center justify-center min-h-[220px]">
    {data?.revenueByMethod?.length === 0 ? (
      <div className="text-center text-muted-foreground space-y-2">
        <div className="text-sm font-medium">No revenue data available</div>
        <div className="text-xs">No successful payments have been recorded yet.</div>
      </div>
    ) : (
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data.revenueByMethod.map(r => ({
              name: r.method,
              value: r.total
            }))}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={60}
            paddingAngle={3}
          >
            {data.revenueByMethod.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )}
  </CardContent>
</Card>

     <Card className="col-span-2 xl:col-span-3">
      <CardHeader>
        <CardTitle>Tickets Sold & Event Attendance</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        {data.chartData.length === 0 ? (
          <div className="text-center text-muted-foreground pt-10 text-sm">
            No chart data available
          </div>
        ) : (
          <ChartComponent data={data.chartData} />
        )}
      </CardContent>
    </Card>
        
      {data.averageTicketsByMonth?.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground pt-10">
            No average ticket data available
          </div>
        ) : (
          <AverageTicketLineChart data={data.averageTicketsByMonth} />
        )}


      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Customer Stratification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Created", value: strat.created },
            { label: "Positive", value: strat.positive },
            { label: "Solved", value: strat.solved },
            { label: "Negative", value: strat.negative },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1 text-sm">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <Progress value={item.value} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
}
