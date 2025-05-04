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
            // Handle account creation logic here (e.g., API call)
            console.log("Creating account with organizer type:", organizerType);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            {/* Left Section - Welcome */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center p-8 text-white">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome</h1>
                    <p className="text-lg">
                        EventPOM has thousands of trusted creators, experienced over thousands of events and created millions of tickets through our versatile platform.
                    </p>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-indigo-900">{`Welcome ${session?.user?.name}`}</h2>
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
                                />) : ""}
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-indigo-900 mb-6">
                        Let&apos;s Create Your Organizer Account!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Publish your awesome event and sell tickets to all attendees around the world!
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                ORGANIZER NAME
                            </label>
                            <input
                                type="text"
                                value="Google"
                                readOnly
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                PHONE NUMBER
                            </label>
                            <input
                                type="text"
                                value="098 940 2414"
                                readOnly
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                ORGANIZER TYPE
                            </label>
                            <div className="flex space-x-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="organizerType"
                                        checked={organizerType === "Company"}
                                        onChange={() => setOrganizerType("Company")}
                                        className="mr-2"
                                    />
                                    Company
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="organizerType"
                                        checked={organizerType === "Individual"}
                                        onChange={() => setOrganizerType("Individual")}
                                        className="mr-2"
                                    />
                                    Individual
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={() => setTermsAccepted(!termsAccepted)}
                                className="mr-2"
                            />
                            <label className="text-sm text-gray-700">
                                I ACCEPT THE TERMS AND CONDITION AND PROVIDED MY IDENTIFICATION AND COMPANY REGISTRATION DOCUMENT AS PROOF.
                            </label>
                        </div>

                        <button
                            onClick={handleCreateAccount}
                            className={`w-full py-2 rounded-md transition ${termsAccepted
                                    ? "bg-indigo-900 text-white hover:bg-indigo-800"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            disabled={!termsAccepted}
                        >
                            CREATE ACCOUNT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}