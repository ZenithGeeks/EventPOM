import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { PhoneInput } from "@/components/ui/phone-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SettingsComponentProps {
  onSave: () => void;
  onDeleteAccount: () => void;
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({ onSave, onDeleteAccount }) => {
  const { data: session } = useSession();
  
  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">User Settings</h2>
      </div>
      <div className="flex flex-col">
        <div className="mb-4">
          <Image
            src={session?.user?.image || "/default-profile.jpg"}
            alt="Profile"
            width={96}
            height={96}
            className="w-32 h-32 rounded-full mb-2"
          />
          <Button variant="link" className="text-blue-500 underline p-0">
            Upload Profile Picture
          </Button>
          <input type="file" accept="image/*" className="hidden" />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">First Name (as on ID Card or Passport)</label>
            <input type="text" defaultValue={session?.user?.name?.split(" ")[0] || "Johnny"} className="w-full p-2 border rounded" />
          </div>
          <div className="md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">Last Name (as on ID Card or Passport)</label>
            <input type="text" defaultValue={session?.user?.name?.split(" ")[1] || "Doeman"} className="w-full p-2 border rounded" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">Email</label>
            <input type="email" defaultValue={session?.user?.email || "JohnDoe555@gmail.com"} readOnly className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">Phone Number</label>
            <PhoneInput
              className="w-full p-2"
              defaultCountry="TH"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">Birthday (Day/Month/Year)</label>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-1/3 p-2">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString().padStart(2, "0")}>
                      {day.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-1/3 p-2">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ].map((month, index) => (
                    <SelectItem key={month} value={(index + 1).toString().padStart(2, "0")}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-1/3 p-2">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => 1990 + i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="gender" value="Male" className="mr-2" />
                Male
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="Female" className="mr-2" />
                Female
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" value="Other" className="mr-2" />
                Other
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={onDeleteAccount} variant="destructive" className="hover:bg-black hover:text-white">
          Delete Account
        </Button>
        <Button onClick={onSave} variant="default" className="bg-indigo-700 text-white w-[240px]">
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default SettingsComponent;