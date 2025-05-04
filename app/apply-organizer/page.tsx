"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    useSession
} from "next-auth/react";

export default function CreateOrganizerAccount() {
    const [organizerType, setOrganizerType] = useState<"Company" | "Individual">("Company");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const { data: session } = useSession();
    console.log(session);

    const handleCreateAccount = () => {
        if (termsAccepted) {
            console.log("Creating account with organizer type:", organizerType);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            {/* Left Section - Welcome with Image */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 text-white bg-black relative">
                <img
                    src="/event-image.jpg"
                    alt="Event Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative text-center z-10">
                    <h1 className="text-6xl font-extrabold mb-4">Welcome</h1>
                    <p className="text-base max-w-md">
                        EventPOM has thousands of trusted creators, experienced over thousands of events and created millions of tickets through our versatile platform.
                    </p>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-indigo-900">{`Welcome, ${session?.user?.name}`}</h2>
                            <p className="text-sm text-gray-600">
                                We will use this account to create your organizer account.
                            </p>
                        </div>
                        <div className="relative w-10 h-10">
                            {session?.user ? (
                                <Image
                                    src={session.user.image ? session.user.image : "/avatar.png"}
                                    alt="User Profile"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            ) : ""}
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-indigo-900 mb-6 leading-tight">
                        Let's Create Your<br />Organizer Account!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Publish your awesome event and sell tickets to all attendees around the world!
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 uppercase">
                                Organizer Name
                            </label>
                            <input
                                type="text"
                                value="Google"
                                readOnly
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 uppercase">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value="098 940 2414"
                                readOnly
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 uppercase">
                                Organizer Type
                            </label>
                            <div className="flex space-x-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="organizerType"
                                        checked={organizerType === "Company"}
                                        onChange={() => setOrganizerType("Company")}
                                        className="mr-2 h-5 w-5 text-indigo-900 border-gray-300 focus:ring-indigo-900"
                                    />
                                    Company
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="organizerType"
                                        checked={organizerType === "Individual"}
                                        onChange={() => setOrganizerType("Individual")}
                                        className="mr-2 h-5 w-5 text-indigo-900 border-gray-300 focus:ring-indigo-900"
                                    />
                                    Individual
                                </label>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={() => setTermsAccepted(!termsAccepted)}
                                className="mt-1 mr-2 h-4 w-4 text-indigo-900 border-gray-300 focus:ring-indigo-900"
                            />
                            <label className="text-xs text-gray-700 uppercase">
                                I accept the terms and condition and provided my identification and company registration document as proof.
                            </label>
                        </div>

                        <button
                            onClick={handleCreateAccount}
                            className={`w-full py-3 rounded-md transition uppercase font-semibold tracking-wide ${
                                termsAccepted
                                    ? "bg-indigo-900 text-white hover:bg-indigo-800"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!termsAccepted}
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}