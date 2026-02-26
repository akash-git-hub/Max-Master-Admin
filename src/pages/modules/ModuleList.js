import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import EyeIcon from "../../Icon/EyeIcon";
import TrashIcon from "../../Icon/TrashIcon";

const ModuleList = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    // Static Dummy Data
    const projectsData = [
        {
            id: 1,
            name: "M1",
            description: "4525 Saints Alley, Plant City, FL 33564",
            attachment: "5",
            sub: "M1, M2, M3",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <TrashIcon className="text-danger cursor-pointer" />
                </div>
            )
        },
        {
            id: 1,
            name: "M1",
            description: "4525 Saints Alley, Plant City, FL 33564",
            attachment: "5",
            sub: "M1, M2, M3",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <TrashIcon className="text-danger cursor-pointer" />
                </div>
            )
        },
        {
            id: 1,
            name: "M1",
            description: "4525 Saints Alley, Plant City, FL 33564",
            attachment: "5",
            sub: "M1, M2, M3",
            status: (
                <div className="d-flex align-items-center gap-2">
                    <EyeIcon className="text-primary cursor-pointer" />
                    <TrashIcon className="text-danger cursor-pointer" />
                </div>
            )
        },
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
                <Container fluid className="rounded-4 p-4 bg-white min-vh-100 min-vh-md-auto">
                    <h4 className="fw-bold mb-1 text-start">Modules</h4>
                    <p className="fw-normal mb-3 text-start">Complete your modules to get personalized career guidance and opportunities</p>

                    {/* University List */}
                    <Row>
                        <Col>
                            <div className="table_body">
                                <div className="d-flex justify-content-between mb-3 algin-items-center">
                                    <h4 className="fw-bold mt-1 text-start">Module List</h4>
                                    <Button variant="dark rounded-5">Create Module</Button>
                                </div>

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

                                                <th className="py-3">S NO</th>
                                                <th className="py-3">MODULE NAME</th>
                                                <th className="py-3">DESCRIPTION</th>
                                                <th className="py-3">ATTACHMENT</th>
                                                <th className="py-3">SUB MODULES</th>
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
                                                        {data.description}
                                                    </td>

                                                    <td className="py-3 small">{data.attachment}</td>
                                                    <td className="py-3 small text-truncate"
                                                        style={{ maxWidth: 150 }}>
                                                        {data.sub}
                                                    </td>

                                                    <td className="py-3">
                                                        <div className="d-flex justify-content-center align-items-center gap-3">
                                                            <EyeIcon
                                                                className="text-dark cursor-pointer"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />

                                                            <TrashIcon
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

export default ModuleList;
