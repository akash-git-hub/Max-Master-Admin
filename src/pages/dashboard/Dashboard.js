import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StateCard from "../../components/StateCard";
import AddUserIcon from "../../Icon/AddUserIcon";
import Sidebar from "../../components/Sidebar";
import EyeIcon from "../../Icon/EyeIcon";
import LogoutIcon from "../../Icon/LogoutIcon";

const Dashboard = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    // Static Dummy Data
    const projectsData = [
        {
            id: 1,
            name: "M1",
            location: "4525 Saints Alley, Plant City, FL 33564",
            modules: "M1, M2, M3",
            email: "university@gmail.com",
            contact: "48934892340",
            license: "9",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <LogoutIcon className="text-danger cursor-pointer" />
                </div>
            )
        },
        {
            id: 1,
            name: "M1",
            location: "4525 Saints Alley, Plant City, FL 33564",
            modules: "M1, M2, M3",
            email: "university@gmail.com",
            contact: "48934892340",
            license: "9",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <LogoutIcon className="text-danger cursor-pointer" />
                </div>
            )
        },
        {
            id: 1,
            name: "M1",
            location: "4525 Saints Alley, Plant City, FL 33564",
            modules: "M1, M2, M3",
            email: "university@gmail.com",
            contact: "48934892340",
            license: "9",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <LogoutIcon className="text-danger cursor-pointer" />
                </div>
            )
        }
    ];

    const pagination = {
        page: 1,
        limit: 10,
        totalPages: 1
    };

    const getBadge = (status) => {
        let className = "";

        if (status === "Completed") className = "text-success border-success";
        if (status === "In Progress") className = "text-primary border-primary";
        if (status === "Pending") className = "text-warning border-warning";

        return (
            <Badge bg="light" className={`border px-3 py-2 rounded-pill ${className}`}>
                {status}
            </Badge>
        );
    };

    const handleRowClick = (id) => {
        navigate("/university-detail");
    };

    return (
        <div className="d-md-flex gap-3">
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

            <div className="flex-grow-1">
                <Container fluid className="rounded-4 p-4 bg-white vh-100">
                    <h4 className="fw-bold mb-1 text-start">Dashboard</h4>
                    <p className="fw-normal mb-3 text-start">Complete your profile to get personalized career guidance and opportunities</p>
                    {/* Stat Cards */}
                    <Row className="g-4 mb-4">
                        <Col xl={4} md={6}>
                            <StateCard
                                title="University"
                                value="555,777"
                                valueColor="#000"
                                subText="Today Add 10 Customer"
                                icon={<AddUserIcon />}
                            />
                        </Col>
                        <Col xl={4} md={6}>
                            <StateCard
                                title="Total Contractors"
                                value="430,493"
                                valueColor="#000"
                                subText="Today Add 32 Contractor"
                                icon={<AddUserIcon />}
                            />
                        </Col>
                        <Col xl={4} md={6}>
                            <StateCard
                                title="Total Projects"
                                value="348,931"
                                valueColor="#000"
                                subText="Today 40 Complete projects"
                                icon={<AddUserIcon />}
                            />
                        </Col>
                    </Row>

                    {/* University List */}
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

                                                <th className="py-3">NO</th>
                                                <th className="py-3">NAME</th>
                                                <th className="py-3">LOCATION</th>
                                                <th className="py-3">MODULES</th>
                                                <th className="py-3">EMAIL</th>
                                                <th className="py-3">CONTACT</th>
                                                <th className="py-3">NO OF LICENSE</th>
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

                                                    <td className="py-3 small">
                                                        {index + 1}
                                                    </td>

                                                    <td className="py-3 small">{data.name}</td>

                                                    <td className="py-3 small text-truncate"
                                                        style={{ maxWidth: 180 }}>
                                                        {data.location}
                                                    </td>

                                                    <td className="py-3 small">{data.modules}</td>

                                                    <td className="py-3 small text-truncate"
                                                        style={{ maxWidth: 150 }}>
                                                        {data.email}
                                                    </td>

                                                    <td className="py-3 small">{data.contact}</td>

                                                    <td className="py-3 small">{data.license}</td>

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
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
