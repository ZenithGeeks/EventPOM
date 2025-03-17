import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { TicketEvent } from '../components/user-wallet/user-tickets/myticket'

export type ApplicationInfo =  TicketEvent &
{
    eventCategory:string
    status:'Denied' | 'In progress' | 'Approved'
}

const ApplicationBox = () => {
  const [activeTab,setActiveTab] = useState<'current' | 'past'>('current')
  
  const applications: ApplicationInfo[] = [
    {
      id: 1,
      title: "Pepsi presents S2O Songkran Music Festival 2025",
      dateRange: "22 Apr 2025, 19:00 - 23 Apr 2025, 23:59",
      location: "Rajamangala National Stadium, Bangkok, Thailand",
      imageUrl: "/pepsi.png",
      eventCategory:'Music Festival',
      status:'Approved'
    },
    {
      id: 2,
      title: "Infinity Saga Concert Experience",
      dateRange: "5 Mar 2025, 18:00 - 6 Mar 2025, 00:00",
      location: "Prince Mahidol Hall, Nakhon Pathom, Thailand",
      imageUrl: "/marvel.png",
      eventCategory:'Concert',
      status:'Denied'
    },
  ];

  const currentApplication = applications.filter(application => application.status === 'In progress')
  const pastApplication = applications.filter(application => application.status === 'Approved' || application.status === 'Denied')

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
                    key={application.id}
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
                      <h3 className="font-semibold text-lg">{application.title}</h3>
                      <p className="text-sm">{application.eventCategory}</p>
                      {/* Date with calendar icon */}
                      <p className="flex items-center gap-1 text-sm text-gray-600 ">
                        <CalendarDaysIcon className="h-4 w-4 " />
                        {application.dateRange}
                      </p>
                      
                      {/* Location with map-pin icon */}
                      <p className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4" />
                        {application.location}
                      </p>
                      <Badge className='border-yellow-400 text-yellow-400 rounded-none' variant={"outline"}>{application.status}</Badge>
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
              When you apply for any event, you can track your application status here.
              </p>
              </>
            )
          ) : pastApplication.length > 0 ? (
            <div className="space-y-4 text-left">
              {pastApplication.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col md:flex-row items-start gap-4 border rounded-lg p-4  w-full"
                >
                  <Image
                    src={application.imageUrl}
                    width={150}
                    height={50}
                    alt={application.title}
                    className="object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-lg">{application.title}</h3>
                    <p className="text-sm">{application.eventCategory}</p>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <CalendarDaysIcon className="h-4 w-4" />
                      {application.dateRange}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4" />
                      {application.location}
                    </p>
                    <Badge className={`rounded-none ${application.status === 'Approved' ? 'border-green-600 text-green-600' : 'border-red-800 text-red-800'}`} variant={'outline'}>{application.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold">You don't have any past applications</p>
              <p className="text-gray-500">
              When you apply for any event, you can track your application status here.
              </p>
            </>
          )}
        </div>
      </div>
  </div>
  );
};

export default ApplicationBox;
