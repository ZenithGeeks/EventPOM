"use client";

import * as React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PosterUploadProps {
  picture?: File | null;
  setPicture: (file: File) => void;
}

const PosterUpload: React.FC<PosterUploadProps> = ({ picture, setPicture }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        {picture ? (
          <Image
            src={URL.createObjectURL(picture)}
            width={300}
            height={400}
            alt="uploadPoster"
            className="object-cover"
          />
        ) : (
          <div className="w-[300px] h-[400px] bg-gray-200 rounded-md flex items-center justify-center">
            <Label>Upload Poster</Label>
          </div>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input id="picture" type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default PosterUpload;
