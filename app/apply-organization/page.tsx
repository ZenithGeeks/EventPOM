"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { CustomUI } from "@/components/ui/dropzone";
import { FaFilePdf, FaFileImage } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

interface CreateOrganizationAccountProps {}

export default function CreateOrganizationAccount({}: CreateOrganizationAccountProps) {
  const { data: session, status } = useSession();
  const [organizationType, setOrganizationType] = useState<"Company" | "Individual">("Company");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [organizationName, setOrganizationName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [errors, setErrors] = useState<{ organizationName?: string; phoneNumber?: string; general?: string }>({
    organizationName: "",
    phoneNumber: "",
    general: "",
  });
  const [verificationDocs, setVerificationDocs] = useState<File[]>([]);

  const handleCreateAccount = useCallback(async () => {
    const newErrors = { organizationName: "", phoneNumber: "", general: "" };

    if (!termsAccepted) {
      newErrors.general = "Please accept the terms and conditions.";
      setErrors(newErrors);
      return;
    }

    if (!organizationName.trim()) {
      newErrors.organizationName = "*Organization name is required.";
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "*Phone number is required.";
    }
    if (verificationDocs.length === 0) {
      newErrors.general = "At least one verification document is required.";
      setErrors(newErrors);
      return;
    }

    if (newErrors.organizationName || newErrors.phoneNumber || newErrors.general) {
      setErrors(newErrors);
      return;
    }

    setErrors({ organizationName: "", phoneNumber: "", general: "" });
    try {
      const formData = new FormData();
      formData.append("organizationType", organizationType);
      formData.append("organizationName", organizationName);
      formData.append("phoneNumber", phoneNumber);
      verificationDocs.forEach((doc, index) => {
        formData.append(`verificationDoc${index}`, doc);
      });

      const response = await fetch("/api/create-organization", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create account.");
      }

      alert("Account created successfully!");
    } catch (error) {
      console.error("Account creation error:", error);
      setErrors({ ...newErrors, general: "An error occurred while creating the account." });
    }
  }, [organizationType, organizationName, phoneNumber, termsAccepted, verificationDocs]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const onDrop = (acceptedFiles: File[]) => {
    setVerificationDocs([...verificationDocs, ...acceptedFiles]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Section - Welcome with Image */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center p-8 text-white bg-black">
        <Image
          src="/images/welcomeorganizer.jpg"
          alt="Event Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative z-10 text-center max-w-md">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Welcome</h1>
          <p className="text-sm md:text-base">
            EventPOM has thousands of trusted creators, experienced over thousands of events and created millions of tickets through our versatile platform.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-indigo-900">
                {`Welcome, ${session?.user?.name || "User"}`}
              </h2>
              <p className="text-sm text-gray-600">
                We will use this account to create your organization account.
              </p>
            </div>
            {session?.user?.image && (
              <div className="relative w-14 h-14">
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900 leading-tight">
            Let's Create Your<br />Organization Account!
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Publish your awesome event and sell tickets to all attendees around the world!
          </p>

          {errors.general && (
            <p className="text-red-600 text-sm" role="alert">
              {errors.general}
            </p>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="organizationName"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Organization Name
              </label>
                    <div className="flex flex-row justify-center items-center">
                <Input
                  id="organizationName"
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="mt-1"
                  aria-required="true"
                />
                {errors.organizationName && (
                  <p className="text-red-600 text-[12px] ml-2" role="alert">
                    {errors.organizationName}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Phone Number
              </label>
              <div className="flex flex-row justify-center items-center">
                <PhoneInput
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  className="mt-1"
                  defaultCountry="TH"
                  aria-required="true"
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-[12px] ml-2" role="alert">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                <label
                  htmlFor="verificationDoc"
                  className="text-sm font-medium text-gray-700 uppercase"
                >
                  Upload Verification Document
                </label>
                <span className="text-xs text-gray-700">
                  (National ID Card / Passport)
                </span>
              </div>
              <div className="mt-1">
                <CustomUI onDrop={onDrop} />
                {verificationDocs.length > 0 && (
                  <div className="mt-2">
                    {verificationDocs.map((file, index) => {
                      let IconComponent = FaFileAlt; // Default icon
                      if (file.type === "application/pdf") {
                        IconComponent = FaFilePdf;
                      } else if (file.type.startsWith("image/")) {
                        IconComponent = FaFileImage;
                      }
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <IconComponent className="text-lg" />
                          <span>
                            {file.name} ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 uppercase">
                Organization Type
              </span>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="organizationType"
                    checked={organizationType === "Company"}
                    onChange={() => setOrganizationType("Company")}
                    className="mr-2 h-5 w-5 text-indigo-900 border-gray-300 focus:ring-indigo-900"
                  />
                  Company
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="organizationType"
                    checked={organizationType === "Individual"}
                    onChange={() => setOrganizationType("Individual")}
                    className="mr-2 h-5 w-5 text-indigo-900 border-gray-300 focus:ring-indigo-900"
                  />
                  Individual
                </label>
              </div>
            </div>

            <label className="flex items-start">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mt-1 mr-2 h-4 w-4 text-indigo-900 border-gray-300 focus:ring-indigo-900"
                aria-label="Accept terms and conditions"
                aria-required="true"
              />
              <span className="text-xs text-gray-600 uppercase">
                I accept the terms and condition and provided my identification and company registration document as proof.
              </span>
            </label>

            <Button
              variant="default"
              size="default"
              onClick={handleCreateAccount}
              disabled={!termsAccepted || verificationDocs.length === 0}
              className="w-full py-3 font-semibold tracking-wide uppercase bg-indigo-900 text-white hover:bg-indigo-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}