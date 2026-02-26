import React from "react";
import { Row, Col } from "react-bootstrap";

const StepProgressBar = ({
  totalSteps = 7,
  completedSteps = 1,
}) => {
  return (
    <div>
      {/* Sub Text */}
      <p className="text-muted mb-1 text-start">
        {completedSteps} of {totalSteps} steps completed
      </p>

      {/* Segmented Bar */}
      <Row className="g-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Col key={index}>
            <div
              style={{
                height: "8px",
                borderRadius: "20px",
                background:
                  index < completedSteps ? "#16a34a" : "#e5e7eb",
                transition: "0.3s ease",
              }}
            />
          </Col>
        ))}
      </Row>

    </div>
  );
};

export default StepProgressBar;