"use client";
import { useEffect, useState, Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import { Transition } from "@headlessui/react";


interface Data {
  message: string;
  success: boolean;
}

export default function FetchComponent() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/fetchData");
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "An unknown error occurred");
        }

        setData(result);
        setShow(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#2A2A6D] hover:opacity-80 w-auto p-8 rounded shadow-xl text-white">
      <h1 className="font-bold">API Response from localhost:3000/test:</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Transition
        as={Fragment}
        show={show}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex flex-row gap-4">
              Message: <Badge className="bg-blue-500">{data?.message || "No message"}</Badge>
            </div>
            <div className="flex flex-row gap-4">
              Success: <Badge className="bg-green-500">{data?.success?.toString() || "false"}</Badge>
            </div>
          </div>
        </Transition>
      )}
    </div>
  );
}
