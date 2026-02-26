import React, { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";

const AttachmentUpload = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const imageFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...imageFiles]);
  };

  return (
    <div>
      <h6 className="mb-3 text-start">Attachment</h6>

      <Row className="g-3 align-items-center mb-4">
        {/* Upload Box */}
        <Col xs="auto">
          <div
            onClick={handleUploadClick}
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              width: "140px",
              height: "140px",
              border: "2px dashed #ddd",
              borderRadius: "16px",
              cursor: "pointer",
              background: "#f5f5f5",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 500 }}>
              Upload
            </div>
            <small>PDF, Video, PNG</small>
          </div>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
        </Col>

        {/* Preview Images */}
        {files.length > 0 &&
          files.map((item, index) => (
            <Col xs="auto" key={index}>
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#f1f1f1",
                }}
              >
                <img
                  src={item.preview}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default AttachmentUpload;