import Dropzone, { DropzoneState } from "shadcn-dropzone";

interface CustomUIProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export const CustomUI = ({ onDrop }: CustomUIProps) => {
  return (
    <Dropzone onDrop={onDrop}>
      {(dropzone: DropzoneState) => (
        <div className="flex flex-col gap-2"> {/* Added gap-2 for spacing */}
          {dropzone.acceptedFiles.length > 0 ? (
            <div className="flex items-center flex-col gap-1.5">
              <div className="text-sm font-medium">Files uploaded!</div>
            </div>
          ) : dropzone.isDragAccept ? (
            <div className="text-sm font-medium">Drop your files here!</div>
          ) : (
            <div className="flex items-center flex-col gap-1.5">
              <div className="flex items-center flex-row gap-0.5 text-sm font-medium">
                Upload files
              </div>
            </div>
          )}
          <div className="text-xs text-gray-400 font-medium">
            {dropzone.acceptedFiles.length} files uploaded so far.
          </div>
        </div>
      )}
    </Dropzone>
  );
};