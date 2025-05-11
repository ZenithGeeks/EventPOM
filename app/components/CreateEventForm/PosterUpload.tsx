"use client";

import * as React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

interface PosterUploadProps {
  picture?: File | null;
  setPicture: (file: File) => void;
}

const PosterUpload: React.FC<PosterUploadProps> = ({ setPicture }) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    const img = document.createElement("img");
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const aspectRatio = width / height;
      const expectedRatio = 200 / 283; // ~0.7065
      const tolerance = 0.03;

      if (
        aspectRatio < expectedRatio - tolerance ||
        aspectRatio > expectedRatio + tolerance
      ) {
        toast.error("Poster must be portrait (aspect ratio close to 200:283).");
        return;
      }

      if (width < 800 || height < 1132) {
        toast.error("Poster resolution must be at least 800x1132 pixels.");
        return;
      }

      setPicture(file);
      setPreviewUrl(objectUrl);
      toast.success("Poster uploaded successfully!");
    };
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        {previewUrl ? (
         <Image
          src={previewUrl}
          alt="Uploaded poster preview"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
          className="rounded-md"
        />
        ) : (
          <div className="w-[300px] h-[400px] bg-gray-200 rounded-md flex items-center justify-center text-sm text-muted-foreground">
            <Label>Upload Poster (min. 800×1132, portrait)</Label>
          </div>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default PosterUpload;
