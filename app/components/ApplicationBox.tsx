import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { event } from "../components/user-wallet/user-tickets/myticket";
//import { promises as fs} from 'fs'

export type ApplicationInfo = event & {
  eventCategory: string;
  status: "Denied" | "Pending" | "Approved";
  createdAt: string
};

const ApplicationBox = () => {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short", // Use 'short' for abbreviated month names (e.g., "Apr" for April)
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    };

    const formattedDate = date.toLocaleString("en-GB", options);
    const [day, month, year, time] = formattedDate.split(" ");
    return `${day} ${month} ${year} ${time}`;
  };

  const applications: ApplicationInfo[] = [
    {
      eventId: "EVENT001",
      title: "Pepsi presents S2O Songkran Music Festival 2025",
      startTime: "2025-04-22T19:00:00",
      endTime: "2025-04-23T23:59:00",
      location: "Rajamangala National Stadium, Bangkok, Thailand",
      imageUrl: "/pepsi.png",
      eventCategory: "Music Festival",
      status: "Pending",
      createdAt: "2025-03-22T19:00:00"
    },
    {
      eventId: "EVENT002",
      title: "Infinity Saga Concert Experience",
      startTime: "2025-03-05T18:00:00",
      endTime: "2025-03-06T00:00:00",
      location: "Prince Mahidol Hall, Nakhon Pathom, Thailand",
      imageUrl: "/marvel.png",
      eventCategory: "Concert",
      status: "Denied",
      createdAt: "2025-02-05T19:00:00"
    }
  ];

  
  const calculatePendingDeadline = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    createdDate.setDate(createdDate.getDate() + 7); // Add 7 days
    return createdDate;
  };

  const currentApplication = applications.filter((application) => {
    const currentDate = new Date();
    const startTime = new Date(application.startTime);
    const endTime = new Date(application.endTime);
    return (
      currentDate < startTime ||
      (currentDate >= startTime && currentDate <= endTime)
    );
  });

  const pastApplication = applications.filter((application) => {
    const currentDate = new Date();
    const endTime = new Date(application.endTime);
    return currentDate > endTime;
  });

  return (
    <div className="p-4 md:p-6 bg-white">
      <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
      <div className="mt-4 border shadow-sm">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("current")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "current"
                ? "border-b-2 border-[#2A2A6D] text-gray-900"
                : "text-gray-500"
            }`}
          >
            Current Applications
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "past"
                ? "border-b-2 border-[#2A2A6D] text-gray-900"
                : "text-gray-500"
            }`}
          >
            Past Applications
          </button>
        </div>

        <div className="p-6 text-center">
          {activeTab === "current" ? (
            currentApplication.length > 0 ? (
              <div className="space-y-4 text-left">
                {currentApplication.map((application) => (
                  <div
                    key={application.eventId}
                    className="flex flex-col md:flex-row items-start gap-10 border rounded-lg p-4 w-full"
                  >
                    {/* Event image */}
                    <Image
                      src={application.imageUrl}
                      width={150}
                      height={50}
                      alt={application.title}
                      className="object-cover"
                    />

                    {/* Event details + button */}
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-lg">
                        {application.title}
                      </h3>
                      <p className="text-sm">{application.eventCategory}</p>
                      {/* Date with calendar icon */}
                      <p className="flex items-center gap-1 text-sm text-gray-600 ">
                        <CalendarDaysIcon className="h-4 w-4 " />
                        {formatDate(application.startTime)} -{" "}
                        {formatDate(application.endTime)}
                      </p>
                      {/* Location with map-pin icon */}
                      <p className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4" />
                        {application.location}
                      </p>
                      {application.status === "Pending" && (
                        <p className="text-sm text-gray-600">Review by:  {formatDate(calculatePendingDeadline(application.createdAt).toISOString())}</p>
                      )}
                      <Badge
                        className={`rounded-none ${
                          application.status === "Approved"
                            ? "border-green-600 text-green-600"
                            : application.status === "Denied"
                            ? "border-red-800 text-red-800"
                            : application.status === "Pending"
                            ? "border-yellow-400 text-yellow-400"
                            : ""
                        }`}
                        variant={"outline"}
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold">
                  You don't have any applications
                </p>
                <p className="text-gray-500">
                  When you apply for any event, you can track your application
                  status here.
                </p>
              </>
            )
          ) : pastApplication.length > 0 ? (
            <div className="space-y-4 text-left">
              {pastApplication.map((application) => (
                <div
                  key={application.eventId}
                  className="flex flex-col md:flex-row items-start gap-10 border rounded-lg p-4 w-full"
                >
                  <Image
                    src={application.imageUrl}
                    width={150}
                    height={50}
                    alt={application.title}
                    className="object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-lg">
                      {application.title}
                    </h3>
                    <p className="text-sm">{application.eventCategory}</p>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <CalendarDaysIcon className="h-4 w-4" />
                      {formatDate(application.startTime)} -{" "}
                      {formatDate(application.endTime)}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4" />
                      {application.location}
                    </p>
                    <Badge
                      className={`rounded-none ${
                        application.status === "Approved"
                          ? "border-green-600 text-green-600"
                          : "border-red-800 text-red-800"
                      }`}
                      variant={"outline"}
                    >
                      {application.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold">
                You don't have any past applications
              </p>
              <p className="text-gray-500">
                When you apply for any event, you can track your application
                status here.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationBox;
