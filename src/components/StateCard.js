import { Card } from "react-bootstrap";
import StepProgressBar from "./StepProgressBar";

const StateCard = ({ title, value, subText, valueColor = "#000", icon }) => {
  return (
    <Card className="shadow-md rounded-4 h-100 border-1">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="text-start">
          <h6 className="mb-1 text-muted fw-bold">{title}</h6>
          <h4 className="fw-bold" style={{ color: valueColor }}>
            {value}
          </h4>

          <StepProgressBar
            totalSteps={7}
            completedSteps={1}
          />
        </div>
        <div className="bg-light-subtle rounded-4 p-3">
          {icon}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StateCard;
