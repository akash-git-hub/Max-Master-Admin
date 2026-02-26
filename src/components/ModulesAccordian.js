import React from "react";
import { Accordion, ProgressBar } from "react-bootstrap";
import { ChevronDown } from "lucide-react";
import ModuleAccordionContent from "./ModuleAccordianContent";

const modules = [
  { id: 1, title: "Module 01", progress: 85 },
  { id: 2, title: "Module 02", progress: 65 },
  { id: 3, title: "Module 03", progress: 45 },
  { id: 4, title: "Module 04", progress: 5 },
  { id: 5, title: "Module 05", progress: 25 },
  { id: 6, title: "Module 06", progress: 15 },
];

const ModuleAccordion = () => {
  return (
    <Accordion defaultActiveKey="0" className="moduleAccordion">

      {modules.map((item, index) => (
        <Accordion.Item
          eventKey={index.toString()}
          key={item.id}
          className="mb-3 border-0"
          style={{
            borderRadius: "18px",
            overflow: "hidden",
            background: "#fff",
            border:"1px solid #ddd"
          }}
        >
          {/* HEADER */}
          <Accordion.Header
            style={{
              padding: "5px",
              background: "transparent",
              border: "1px solid #ddd",
              borderRadius: "25px"
            }}
          >
            <div className="d-flex align-items-center justify-content-between w-100">

              {/* Left title */}
              <h6 style={{width:"160px"}} className="fw-semibold mb-0">
                {item.title}
              </h6>

              {/* Progress */}
              <div className="flex-grow-1 px-3">
                <div
                  style={{
                    border: "2px solid #22c55e",
                    borderRadius: "30px",
                    padding: "3px",
                    position: "relative",
                    height: "20px"
                  }}
                >
                  <ProgressBar
                    now={item.progress}
                    style={{
                      background: "#fff",
                      height: "100%",
                      borderRadius: "20px"
                    }}
                  />
                </div>
              </div>

              {/* % */}
              <div className="fw-semibold me-3" style={{width:"50px"}}>
                {item.progress}%
              </div>

              {/* Arrow */}
              <ChevronDown size={22}/>
            </div>
          </Accordion.Header>

          {/* BODY */}
          <Accordion.Body>
             <ModuleAccordionContent />
          </Accordion.Body>
        </Accordion.Item>
      ))}

    </Accordion>
  );
};

export default ModuleAccordion;