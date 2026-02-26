import { Container, Row, Col, Image } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import TrashIcon from "../../Icon/TrashIcon"; // ya bootstrap icon use kr lena

const ModuleDetails = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="d-md-flex gap-3">

            {/* Sidebar */}
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

            {/* Right Content */}
            <div className="flex-grow-1">

                <Container fluid className="p-4 bg-white rounded-4 min-vh-100 min-vh-md-auto">

                    <h4 className="fw-bold mb-1 text-start">Modules Details</h4>
                    <p className="fw-normal mb-3 text-start">Complete your profile to get personalized career guidance and opportunities</p>
                    {/* MODULE CARD */}
                    <div className="p-4 rounded-4 mb-5" style={{ background: "#f3f3f3" }}>
                        <Row className="align-items-center">

                            {/* LEFT ATTACHMENT */}
                            <Col md={3}>
                                <h6 className="fw-semibold mb-3 text-start">Attachment</h6>

                                <div className="d-flex flex-column gap-3">
                                    <Image
                                        src="https://picsum.photos/200"
                                        className="rounded-3"
                                        style={{ width: 90, height: 90, objectFit: "cover" }}
                                    />

                                    <Image
                                        src="https://picsum.photos/201"
                                        className="rounded-3"
                                        style={{ width: 90, height: 90, objectFit: "cover" }}
                                    />
                                </div>
                            </Col>

                            {/* RIGHT CONTENT */}
                            <Col md={9}>
                                <div className="d-flex justify-content-between text-start">
                                    <div>
                                        <h5 className="fw-semibold">Module Name</h5>
                                        <p className="text-muted mb-4">Module A</p>
                                    </div>

                                    <TrashIcon className="text-muted cursor-pointer" />
                                </div>
                                <div className="text-start">
                                    <h5 className="fw-semibold">Description</h5>
                                    <p className="text-muted mt-2">
                                        Ut sodales, ex sit amet consectetur accumsan...
                                    </p>

                                </div>

                            </Col>

                        </Row>
                    </div>

                    {/* SUB MODULE TITLE */}
                    <h3 className="fw-bold text-start mb-4">Sub Modules A</h3>

                    {/* SUB MODULE CARD */}
                    <div className="p-4 rounded-4" style={{ background: "#f3f3f3" }}>
                        <Row className="align-items-center">

                            {/* LEFT */}
                            <Col md={3}>
                                <h6 className="fw-semibold mb-3 text-start">Attachment</h6>

                                <div className="d-flex flex-column gap-3">
                                    <Image
                                        src="https://picsum.photos/202"
                                        className="rounded-3"
                                        style={{ width: 90, height: 90, objectFit: "cover" }}
                                    />
                                    <Image
                                        src="https://picsum.photos/202"
                                        className="rounded-3"
                                        style={{ width: 90, height: 90, objectFit: "cover" }}
                                    />
                                </div>
                            </Col>

                            {/* RIGHT */}
                            <Col md={9}>
                                <div className="d-flex justify-content-between text-start">
                                    <div>
                                        <h5 className="fw-semibold">Module Name</h5>
                                        <p className="text-muted mb-4">Sub Module A</p>
                                    </div>
                                    <TrashIcon className="text-muted cursor-pointer" />
                                </div>


                                <div className="text-start">
                                    <h5 className="fw-semibold">Description</h5>
                                    <p className="text-muted">
                                        Aliquam a dui vel justo fringilla euismod...
                                    </p>
                                </div>
                            </Col>

                        </Row>
                    </div>

                </Container>
            </div>
        </div>
    );
};

export default ModuleDetails;