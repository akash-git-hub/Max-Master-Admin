import React from "react";
import {
  Card,
  Row,
  Col,
  ProgressBar,
  Badge
} from "react-bootstrap";
import {
  CheckCircleFill,
  XCircleFill
} from "react-bootstrap-icons";

const ModuleAccordionContent = () => {
  return (
    <>
      {/* ================= LEARNING ================= */}
      <Card className="shadow-sm border-0 mb-4 rounded-4">
        <Card.Body className="text-start">
          <h5 className="fw-bold">Learning</h5>
          <p className="text-muted mb-1">
            Vestibulum tempus imperdiet sem ac porttitor. Vivam...
          </p>

          <Row className="text-center mt-1">
            <Step label="Step 1" status="done" />
            <Step label="Step 2" status="current" />
            <Step label="Step 3" />
            <Step label="Step 4" />
            <Step label="Step 5" />
          </Row>

          <Card className="mt-4 border rounded-4">
            <Card.Body className="d-flex align-items-center p-2">
              <img
                src="/icons/teeth.png"
                alt="icon"
                width="20"
                className="me-3"
              />
              <span className="fw-semibold">Cleaning Teeth</span>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>

      {/* ================= MOCK TEST ================= */}
      <Card className="shadow-sm border-0 mb-4 rounded-4 text-start">
        <Card.Body>
          <h4 className="fw-bold">MockTest</h4>
          <p className="text-muted mb-1">
            Vestibulum tempus imperdiet sem ac porttitor. Vivam...
          </p>

          <Card className="bg-light border-0 rounded-4 p-4 mt-3">
            <Row className="text-center mb-3">
              {["Lv 1", "Lv 2", "Lv 3", "Lv 4", "Lv 5"].map((lvl, i) => (
                <Col key={i}>
                  <Badge
                    bg={lvl === "Lv 4" ? "success" : "secondary"}
                    className="px-3 py-2"
                  >
                    {lvl}
                  </Badge>
                </Col>
              ))}
            </Row>

            <ProgressBar
              now={75}
              variant="success"
              style={{ height: "8px" }}
            />
          </Card>
        </Card.Body>
      </Card>

      {/* ================= EXPERIMENTAL TEST ================= */}
      <Card className="shadow-sm border-0 rounded-4 text-start">
        <Card.Body>
          <h4 className="fw-bold">Experimental Test</h4>
          <p className="text-muted mb-1">
            Vestibulum tempus imperdiet sem ac porttitor. Vivam...
          </p>

          <Row className="text-center mt-4">
            <Result label="Step 1" type="success" />
            <Result label="Step 2" type="fail" />
            <Result label="Step 3" type="fail" />
            <Result label="Step 4" type="fail" />
            <Result label="Step 5" type="success" />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ModuleAccordionContent;



/* STEP COMPONENT */
const Step = ({ label, status }) => {
  return (
    <Col>
      <div className="mb-2">{label}</div>

      {status === "done" && (
        <CheckCircleFill size={32} className="text-success" />
      )}

      {status === "current" && (
        <CheckCircleFill size={32} className="text-success opacity-50" />
      )}

      {!status && (
        <CheckCircleFill size={32} className="text-secondary opacity-25" />
      )}
    </Col>
  );
};



/* RESULT COMPONENT */
const Result = ({ label, type }) => {
  return (
    <Col>
      <div className="mb-2">{label}</div>

      {type === "success" ? (
        <CheckCircleFill size={34} className="text-success" />
      ) : (
        <XCircleFill size={34} className="text-danger" />
      )}

      <div
        className={`mt-2 fw-semibold ${
          type === "success" ? "text-success" : "text-danger"
        }`}
      >
        {label}
      </div>
    </Col>
  );
};