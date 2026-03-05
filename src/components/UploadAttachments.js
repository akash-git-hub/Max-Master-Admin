import { useRef, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Typography } from "./Typography";

export const UploadAttachments = ({
  onChange,
  value,
  error = "",
  label = "Upload File",
  accept = "image", // image | video
}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null); // image | video

  // ✅ Handle existing URL (S3 image/video)
  useEffect(() => {
    if (typeof value === "string" && value) {
      setPreview(value);

      if (value.match(/\.(mp4|webm|ogg)$/i)) {
        setFileType("video");
      } else {
        setFileType("image");
      }
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setFileType(file.type.startsWith("video") ? "video" : "image");

    onChange?.(file); // 🔥 return File to parent
  };

  return (
    <>
      {/* PREVIEW */}
      {preview ? (
        fileType === "video" ? (
          <video
            src={preview}
            width={150}
            height={150}
            controls
            className="border rounded cursor-pointer object-fit-contain"
            onClick={() => fileInputRef.current?.click()}
          />
        ) : (
          <Image
            src={preview}
            rounded
            width={150}
            height={150}
            className="object-fit-fill border cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
        )
      ) : (
        <>
          <div
            className="upload-box "
            onClick={() => fileInputRef.current?.click()}
          >
            
              {label}
          </div>
          {error && <span className="text-danger">{error}</span>}
        </>
      )}

      {/* HIDDEN INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept={`${accept}/*`}
        className="d-none"
        onChange={handleFileChange}
      />
    </>
  );
};
