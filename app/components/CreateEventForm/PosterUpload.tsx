"use client";

import * as React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PosterUploadProps {
  picture?: File | null;
  setPicture: (file: File) => void;
}

const PosterUpload: React.FC<PosterUploadProps> = ({  setPicture }) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPicture(file);
    setPreviewUrl(URL.createObjectURL(file)); // local preview only
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        {previewUrl ? (
          <Image
            src={previewUrl}
            width={300}
            height={400}
            alt="Uploaded poster preview"
            className="object-cover rounded-md"
          />
        ) : (
          <div className="w-[300px] h-[400px] bg-gray-200 rounded-md flex items-center justify-center">
            <Label>Upload Poster</Label>
          </div>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default PosterUpload;
