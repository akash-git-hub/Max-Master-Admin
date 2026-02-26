import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import EyeIcon from "../../Icon/EyeIcon";
import LogoutIcon from "../../Icon/LogoutIcon";
import { useNavigate } from "react-router-dom";

const UniversityDetail = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    const projectsData = [
        {
            id: 1,
            first: "Sharkey",
            last: "Glasser",
            student: "12121-1212110",
            email: "s.t.sharkey@outlook.com",
            contact: "(617) 623-2338",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <LogoutIcon className="text-danger cursor-pointer" />
                </div>
            )
        },
        {
            id: 1,
            first: "Sharkey",
            last: "Glasser",
            student: "12121-1212110",
            email: "s.t.sharkey@outlook.com",
            contact: "(617) 623-2338",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <LogoutIcon className="text-danger cursor-pointer" />
                </div>
            )
        },
        {
            id: 1,
            first: "Sharkey",
            last: "Glasser",
            student: "12121-1212110",
            email: "s.t.sharkey@outlook.com",
            contact: "(617) 623-2338",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <LogoutIcon className="text-danger cursor-pointer" />
                </div>
            )
        },
    ];

    const handleRowClick = (id) => {
        navigate("/university-detail");
    };

    return (
        <div className="d-md-flex gap-3">
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

            <div className="flex-grow-1">
                <Container fluid className="rounded-4 p-4 bg-white vh-100">
                    <h2 className="fw-bold mb-1 text-start">University Detail</h2>
                    <p className="text-muted text-start">
                        Complete your profile to get personalized career guidance and opportunities
                    </p>

                    <div className="mt-4">

                        {/* University Info Card */}
                        <div className="bg-light p-3 rounded-4 shadow-sm mb-5" style={{ maxWidth: "650px" }}>
                            <div className="d-flex align-items-center">

                                {/* Left Image */}
                                <img
                                    src="/university-avatar.png"
                                    alt="University"
                                    className="rounded-4"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />

                                {/* Right Content */}
                                <div className="ms-4 flex-grow-1">

                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="mb-1 fw-bold">RGPV University</h4>

                                        {/* Rating */}
                                        <div className="text-warning">
                                            ★ ★ ★ ★ ☆ <span className="text-muted ms-1">4.5</span>
                                        </div>
                                    </div>

                                    <p className="mb-1 text-muted text-start">rgpv@gmail.com</p>

                                    <p className="mb-0 text-muted text-start">
                                        1341 Poplar Street, Bhopal, India, 60606
                                        <br />
                                        +91-8989786510
                                    </p>

                                </div>
                            </div>
                        </div>

                        <Row>
                            <Col>
                                <div className="table_body">
                                    <h4 className="fw-bold mb-3 text-start">University List</h4>

                                    <div
                                        className="table-responsive rounded-4"
                                        style={{
                                            maxHeight: "600px",
                                            overflowY: "auto",
                                            border: "1px solid #eee"
                                        }}
                                    >
                                        <Table className="mb-0 align-middle text-nowrap">

                                            {/* Header */}
                                            <thead
                                                style={{
                                                    background: "#f5f5f5",
                                                    position: "sticky",
                                                    top: 0,
                                                    zIndex: 1
                                                }}
                                            >
                                                <tr className="text-center small fw-semibold">

                                                    <th className="py-3">FIRST NAME</th>
                                                    <th className="py-3">LAST NAME</th>
                                                    <th className="py-3">STUDENT ID</th>
                                                    <th className="py-3">EMAIL</th>
                                                    <th className="py-3">CONTACT</th>
                                                    <th className="py-3">STATUS</th>

                                                </tr>
                                            </thead>

                                            {/* Body */}
                                            <tbody className="text-center">

                                                {projectsData.map((data, index) => (
                                                    <tr
                                                        key={index}
                                                        onClick={() => handleRowClick(data.id)}
                                                        className="table-row-hover"
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {/* 
                                                        <td className="py-3 small">
                                                            {index + 1}
                                                        </td> */}


                                                        <td className="py-3 small">{data.first}</td>

                                                        <td className="py-3 small text-truncate">
                                                            {data.last}
                                                        </td>
                                                        <td className="py-3 small">{data.student}</td>

                                                        <td className="py-3 small text-truncate">

                                                            {data.email}
                                                        </td>

                                                        <td className="py-3 small">{data.contact}</td>


                                                        <td className="py-3">
                                                            <div className="d-flex justify-content-center align-items-center gap-3">
                                                                <EyeIcon
                                                                    className="text-dark cursor-pointer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />

                                                                <LogoutIcon
                                                                    className="text-danger cursor-pointer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </Container>
            </div>
        </div>
    );
};

export default UniversityDetail;
