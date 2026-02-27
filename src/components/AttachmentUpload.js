import React, { useRef, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const AttachmentUpload = ({
  multiple = false,
  onFilesChange,
}) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const formattedFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type,
    }));

    let updatedFiles;

    if (multiple) {
      updatedFiles = [...files, ...formattedFiles];
    } else {
      // Replace existing file if single mode
      files.forEach((f) => URL.revokeObjectURL(f.preview));
      updatedFiles = formattedFiles.slice(0, 1);
    }

    setFiles(updatedFiles);

    // Send raw File objects to parent
    onFilesChange(
      multiple
        ? updatedFiles.map((f) => f.file)
        : updatedFiles[0]?.file || null
    );
  };

  const handleRemove = (index) => {
    const updated = [...files];
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setFiles(updated);

    onFilesChange(
      multiple
        ? updated.map((f) => f.file)
        : null
    );
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <div>
      <Row className="g-3 align-items-center mb-4">
        <Col xs="auto">
          <div
            onClick={handleUploadClick}
            style={{
              width: "140px",
              height: "140px",
              border: "2px dashed #ddd",
              borderRadius: "16px",
              cursor: "pointer",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            Upload
          </div>

          <input
            type="file"
            multiple={multiple}
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
        </Col>

        {files.map((item, index) => (
          <Col xs="auto" key={index}>
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                background: "#f1f1f1",
              }}
            >
              <div
                onClick={() => handleRemove(index)}
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  background: "#000",
                  color: "#fff",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                ✕
              </div>

              {item.type.startsWith("image") && (
                <img
                  src={item.preview}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}

              {item.type.startsWith("video") && (
                <video
                  src={item.preview}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}

              {item.type === "application/pdf" && (
                <iframe
                  src={item.preview}
                  width="100%"
                  height="100%"
                  title="pdf"
                />
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AttachmentUpload;