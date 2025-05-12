import React from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
}

interface Event {
    id: number;
    title: string;
    imageUrl: string;
    startTime: string;
    endTime: string;
    location: string;
    status: string;
    categoryId?: number | string;
    category?: { id?: number | string; _id?: number | string };
}

interface EventListProps {
    filteredEvents: Event[];
    categories: Category[];
}

export default function EventList({
    filteredEvents = [],
    categories = [],
}: EventListProps) {
    console.log(categories)
    const groupedEvents = filteredEvents
        .filter((e) => e.status === "APPROVED")
        .reduce((acc: Record<string, Event[]>, event) => {
            const rawCategoryId =
                event.categoryId ??
                event.category?._id ??
                event.category?.id;

            const matchedCategory = categories.find(
                (cat) => String(cat.id) === String(rawCategoryId)
            );

            const categoryName = matchedCategory?.name ?? "Uncategorized";

            if (!acc[categoryName]) acc[categoryName] = [];
            acc[categoryName].push(event);
            return acc;
        }, {});

    return (
        <section className="flex items-center justify-center mt-12 px-4 sm:px-8 md:px-12 lg:px-16">
            <div className="w-full max-w-screen-xl">
                {Object.entries(groupedEvents).map(([categoryName, events]) => (
                    <div key={categoryName} className="mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-6">
                            {categoryName}
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-14">
                            {events.map((e) => (
                                <div key={e.id} className="w-full m-4 bg-white overflow-hidden">
                                    <div className="relative w-full aspect-[2/3]">
                                        <Image
                                            src={e.imageUrl}
                                            alt={e.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <Link href={`/buyTicketsPage/${e.id}`}>
                                            <h3 className="cursor-pointer duration-300 text-base font-semibold text-gray-800 hover:text-red-500">
                                                {e.title}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-red-500">
                                            {new Date(e.startTime).toLocaleDateString()} –{" "}
                                            {new Date(e.endTime).toLocaleDateString()}
                                        </p>
                                        <div className="flex items-center space-x-1 mt-1">
                                            <MapPinIcon className="w-4 h-4 text-gray-500" />
                                            <p className="text-sm text-gray-600">{e.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
