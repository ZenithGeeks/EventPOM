// /components/ui/inputfile.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFileProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputFile({ onChange }: InputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Upload Profile Picture</Label>
      <Input id="picture" type="file" accept="image/png,image/jpeg,image/gif,image/bmp,image/webp" onChange={onChange} />
    </div>
  );
}
