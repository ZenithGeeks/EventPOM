import React from "react";

interface SettingsComponentProps {
  onSave: () => void;
  onDeleteAccount: () => void;
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({ onSave, onDeleteAccount }) => {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">User Settings</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="mb-4">
            <img
              src="/default-profile.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full mb-2"
            />
            <button className="text-blue-500 underline">Upload Profile Picture</button>
            <input type="file" accept="image/*" className="hidden" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">First Name (as on ID Card or Passport)</label>
            <input type="text" defaultValue="Johnny" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">email</label>
            <input type="email" defaultValue="JohnDoe555@gmail.com" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select defaultValue="Male" className="w-full p-2 border rounded">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Last Name (as on ID Card or Passport)</label>
            <input type="text" defaultValue="Doeman" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mobile phone number</label>
            <input type="tel" defaultValue="098 940 2414" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Birthday (Day/Month/Year)</label>
            <div className="flex space-x-2">
              <select defaultValue="09" className="w-1/3 p-2 border rounded">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select defaultValue="12" className="w-1/3 p-2 border rounded">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select defaultValue="2000" className="w-1/3 p-2 border rounded">
                <option value="1990">1990</option>
                <option value="1991">1991</option>
                <option value="1992">1992</option>
                <option value="1993">1993</option>
                <option value="1994">1994</option>
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onDeleteAccount} className="px-4 py-2 bg-red-500 text-white rounded">
          Delete Account
        </button>
        <button onClick={onSave} className="px-4 py-2 bg-indigo-700 text-white rounded">
          SAVE
        </button>
      </div>
    </div>
  );
};

export default SettingsComponent;