"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/inputfile";
import toast from "react-hot-toast";

interface SettingsComponentProps {
  onSave: () => void;
  onDeleteAccount: () => void;
}

interface UserApiResponse {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  image?: string;
  error?: string;
}

interface UploadApiResponse {
  fileName?: string;
  error?: string;
}

interface PublicLinkApiResponse {
  data?: string;
  error?: string;
}

const DEFAULT_IMAGE = "/default-profile.jpg";
const DEFAULT_FIRST_NAME = "John";
const DEFAULT_LAST_NAME = "Doe";
const DEFAULT_EMAIL = "example@email.com";
const DEFAULT_PHONE = "";
const DEFAULT_DAY = "01";
const DEFAULT_MONTH = "01";
const DEFAULT_YEAR = "2000";
const DEFAULT_GENDER = "Other";

const SettingsComponent: React.FC<SettingsComponentProps> = ({
  onSave,
  onDeleteAccount,
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;

  // State for profile fields
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Temporary local (blob) preview
  const [publicUrl, setPublicUrl] = useState<string | null>(null);   // Cloud/public URL for DB and display
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        const data: UserApiResponse = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");

        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhone(data.phone || "");

        if (data.dob) {
          const d = new Date(data.dob);
          setDay(String(d.getDate()).padStart(2, "0"));
          setMonth(String(d.getMonth() + 1).padStart(2, "0"));
          setYear(String(d.getFullYear()));
        }
        setGender(data.gender || "");
        setPublicUrl(data.image || null);   // <-- always use public URL from backend for initial
        setPreviewUrl(null);                // No preview on initial load
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          toast.error(error.message || "Could not load profile");
        } else {
          console.error("Unknown error", error);
          toast.error("Could not load profile");
        }
      }
    };
    fetchUser();
  }, [userId]);

  // Handle file pick: preview with blob, then upload and swap to public URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/bmp",
      "image/webp"
    ];
    const maxSize = 20 * 1024 * 1024; // 20 MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }
    if (file.size > maxSize) {
      toast.error("File too large. Max 20 MB allowed.");
      return;
    }
    setPreviewUrl(URL.createObjectURL(file)); // Show local preview immediately
    handleImageUpload(file);
  };

  // Upload file, get public URL, use as official preview and for DB
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploadPoster", {
        method: "POST",
        body: formData,
      });
      const data: UploadApiResponse = await res.json();
      if (!res.ok || !data.fileName) throw new Error(data.error || "Upload failed");

      // Step 2: Get public URL from backend (POST)
      const urlRes = await fetch("/api/public-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: data.fileName }),
      });
      const urlData: PublicLinkApiResponse = await urlRes.json();
      if (!urlRes.ok || !urlData.data) throw new Error(urlData.error || "Failed to get image URL");

      setPreviewUrl(urlData.data); // Swap preview to public URL!
      setPublicUrl(urlData.data);  // Save for DB/profile
      toast.success("Image uploaded!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Upload failed");
      }
    }
  };

  // Handle save (422-proof)
  const handleSaveClick = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const dob = year && month && day ? `${year}-${month}-${day}` : undefined;
      const body: Record<string, unknown> = {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        dob,
        gender: gender || undefined,
        image: publicUrl || undefined, // <-- Use only real public URL
      };
      Object.keys(body).forEach(key => {
        if (body[key] === undefined) {
          delete body[key];
        }
      });

      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let result: UserApiResponse = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = {};
      }
      if (!res.ok) {
        console.error("Update failed:", result, "Status:", res.status);
        throw new Error(result.error || `Backend error: ${res.status}`);
      }

      toast.success("Profile updated");
      onSave();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message || "Update failed");
      } else {
        console.error("Unknown error", error);
        toast.error("Update failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!userId) return;
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      const result: UserApiResponse = await res.json();
      if (!res.ok) {
        console.error("Delete failed:", result);
        throw new Error(result.error || "Delete failed");
      }

      toast.success("Account deleted");
      onDeleteAccount();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message || "Delete failed");
      } else {
        console.error("Unknown error", error);
        toast.error("Delete failed");
      }
    }
  };

  // The image displayed: Use only the blob for instant preview,
  // otherwise use publicUrl (from upload or DB), then session fallback, then default
  const imageDisplay =
    previewUrl && previewUrl.startsWith("blob:")
      ? previewUrl
      : publicUrl ||
        session?.user?.image ||
        DEFAULT_IMAGE;

  // Default/fallbacks
  const firstNameDisplay =
    firstName || (session?.user?.name?.split(" ")[0] ?? DEFAULT_FIRST_NAME);
  const lastNameDisplay =
    lastName || (session?.user?.name?.split(" ")[1] ?? DEFAULT_LAST_NAME);
  const emailDisplay = session?.user?.email || DEFAULT_EMAIL;
  const phoneDisplay = phone || DEFAULT_PHONE;
  const dayDisplay = day || DEFAULT_DAY;
  const monthDisplay = month || DEFAULT_MONTH;
  const yearDisplay = year || DEFAULT_YEAR;
  const genderDisplay = gender || DEFAULT_GENDER;

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">User Settings</h2>
      </div>

      {/* Profile picture & upload */}
      <div className="mb-4">
        <Image
          src={imageDisplay}
          alt="Profile"
          width={96}
          height={96}
          className="w-32 h-32 rounded-full mb-2 object-cover"
        />
        <InputFile
          onChange={handleFileChange}
        />
      </div>

      {/* Name fields */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <div className="md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
            First Name
          </label>
          <input
            type="text"
            value={firstNameDisplay}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={lastNameDisplay}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Email & phone */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <div className="md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
            Email
          </label>
          <input
            type="email"
            value={emailDisplay}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
            Phone Number
          </label>
          <PhoneInput
            className="w-full p-2"
            defaultCountry="TH"
            value={phoneDisplay}
            onChange={setPhone}
          />
        </div>
      </div>

      {/* Birthday & gender */}
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <div className="md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
            Birthday
          </label>
          <div className="flex space-x-2">
            <Select value={dayDisplay} onValueChange={setDay}>
              <SelectTrigger className="w-1/3 p-2">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <SelectItem key={d} value={String(d).padStart(2, "0")}>
                    {String(d).padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={monthDisplay} onValueChange={setMonth}>
              <SelectTrigger className="w-1/3 p-2">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
                ].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={yearDisplay} onValueChange={setYear}>
              <SelectTrigger className="w-1/3 p-2">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  { length: new Date().getFullYear() - 1899 },
                  (_, i) => 1900 + i
                ).map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
            Gender
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={genderDisplay === "Male"}
                onChange={() => setGender("Male")}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={genderDisplay === "Female"}
                onChange={() => setGender("Female")}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={genderDisplay === "Other"}
                onChange={() => setGender("Other")}
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={handleDelete}
          variant="destructive"
          className="hover:bg-black hover:text-white"
        >
          Delete Account
        </Button>
        <Button
          onClick={handleSaveClick}
          variant="default"
          className="bg-indigo-700 text-white w-[240px]"
          disabled={loading}
        >
          {loading ? "Saving..." : "SAVE"}
        </Button>
      </div>
    </div>
  );
};

export default SettingsComponent;
