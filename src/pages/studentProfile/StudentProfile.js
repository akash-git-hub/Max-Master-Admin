import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    ProgressBar,
    ListGroup,
    Badge,
    Image
} from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import StateCard from "../../components/StateCard";
import AddUserIcon from "../../Icon/AddUserIcon";
import ModuleAccordion from "../../components/ModulesAccordian";


const activities = [
    {
        title: "Add Braces",
        icon: "./icons/teeth.png",
    },
    {
        title: "Remove Cavity",
        icon: "./icons/teeth.png",
    },
    {
        title: "Cleaning Teeth",
        icon: ",/icons/teeth.png",
    },
];

const StudentProfile = () => {
    const [showSidebar, setShowSidebar] = useState(false);


    return (
        <div className="d-md-flex gap-3">
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

            <div className="flex-grow-1">
                <Container fluid className="rounded-4 p-4 bg-white">
                    <h2 className="fw-bold mb-1 text-start">Student Profile</h2>
                    <p className="text-muted text-start">
                        Complete your profile to get personalized career guidance and opportunities
                    </p>

                    {/* Stat Cards */}
                    <Row className="g-4 mb-4">
                        <Col xl={4} md={6}>
                            <StateCard
                                title="Profile Completion"
                                value="555,777"
                                valueColor="#000"
                                subText="Today Add 10 Customer"
                                icon={<AddUserIcon />}
                            />
                        </Col>
                        <Col xl={4} md={6}>
                            <StateCard
                                title="Modules"
                                value="430,493"
                                valueColor="#000"
                                subText="Today Add 32 Contractor"
                                icon={<AddUserIcon />}
                            />
                        </Col>
                        <Col xl={4} md={6}>
                            <StateCard
                                title="Grade A+"
                                value="348,931"
                                valueColor="#000"
                                subText="Today 40 Complete projects"
                                icon={<AddUserIcon />}
                            />
                        </Col>
                    </Row>

                    <div className="mt-4">
                        <Row>
                            <Col md={6}>
                                <ModuleAccordion />
                            </Col>
                            <Col md={6}>
                                <Card
                                    className="border-0 shadow-sm"
                                    style={{
                                        borderRadius: "22px",
                                        padding: "18px",
                                        background: "#fff",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    <Card.Body className="text-start">

                                        {/* Title */}
                                        <h3 className="fw-bold mb-1">Recent Activity</h3>
                                        <p className="text-muted mb-4">
                                            Vestibulum tempus imperdiet sem ac porttitor. Vivam...
                                        </p>

                                        {/* Activity List */}
                                        <ListGroup variant="flush">
                                            {activities.map((item, index) => (
                                                <ListGroup.Item
                                                    key={index}
                                                    className="mb-3 border-0"
                                                    style={{
                                                        borderRadius: "14px",
                                                        background: "#ffffff",
                                                        padding: "14px 18px",
                                                        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                                    }}
                                                >
                                                    <Row className="align-items-center">
                                                        <Col xs="auto">
                                                            <Image
                                                                src={item.icon}
                                                                width={38}
                                                                height={38}
                                                                style={{ objectFit: "contain" }}
                                                            />
                                                        </Col>

                                                        <Col>
                                                            <span className="fw-semibold" style={{ fontSize: "16px" }}>
                                                                {item.title}
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default StudentProfile;