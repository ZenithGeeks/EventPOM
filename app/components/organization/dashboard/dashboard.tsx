"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Progress
} from "@/components/ui/progress";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { ChartComponent } from "@/app/components/organization/dashboard/chart";
import AverageTicketLineChart from "@/app/components/organization/dashboard/averageTicket";

const donutData = [
  { name: "4 Hours", value: 30 },
  { name: "6 Hours", value: 40 },
  { name: "18 Hours", value: 29 },
];

const COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

export default function OrganizationDashboard() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Events</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">12</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tickets Sold</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-blue-600">8,400</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Attendees</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-600">7,500</CardContent>
      </Card>

      <Card className="col-span-2 xl:col-span-3">
        <CardHeader>
          <CardTitle>Response Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold mb-2">99% Response</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                innerRadius={60}
                paddingAngle={3}
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2 xl:col-span-3">
        <CardHeader>
          <CardTitle>Tickets Sold & Event Attendance</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ChartComponent />
        </CardContent>
      </Card>

      <AverageTicketLineChart />

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Customer Stratification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Created</span>
              <span>94%</span>
            </div>
            <Progress value={94} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Positive</span>
              <span>88%</span>
            </div>
            <Progress value={88} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Solved</span>
              <span>44%</span>
            </div>
            <Progress value={44} />
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Negative</span>
              <span>16%</span>
            </div>
            <Progress value={16} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}