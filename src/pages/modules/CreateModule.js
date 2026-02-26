import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { InputField } from "../../components/InputField";
import TrashIcon from "../../Icon/TrashIcon";
import AttachmentUpload from "../../components/AttachmentUpload";

const CreateModule = () => {
    const [showSidebar, setShowSidebar] = useState(false);


    const [modules, setModules] = useState([
        { id: Date.now(), moduleName: "", description: "" },
    ]);

    const handleAddModule = () => {
        setModules([
            ...modules,
            { id: Date.now(), moduleName: "", description: "" },
        ]);
    };

    const handleDeleteModule = (id) => {
        setModules(modules.filter((module) => module.id !== id));
    };

    const handleChange = (id, field, value) => {
        setModules(
            modules.map((module) =>
                module.id === id ? { ...module, [field]: value } : module
            )
        );
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
                                <h4 className="fw-bold mt-1 text-start">Create Module</h4>

                                <Card className="p-4 shadow-sm rounded-4">
                                    {modules.map((module, index) => (
                                        <Card key={module.id} className="p-4 mb-4 shadow-sm rounded-4">
                                            {/* Attachment Section */}
                                            <AttachmentUpload />

                                            {/* Input Fields */}
                                            <Row className="align-items-end">
                                                <Col md={6} className="text-start">
                                                    <InputField
                                                        FormLabel="Module Name"
                                                        FormPlaceHolder="Module Name"
                                                        value={module.moduleName}
                                                        onChange={(e) =>
                                                            handleChange(module.id, "moduleName", e.target.value)
                                                        }
                                                        placeholder="Enter module name"
                                                    />
                                                </Col>

                                                <Col md={6} className="text-start">
                                                    <InputField
                                                        FormLabel="Description"
                                                        FormPlaceHolder="Description"
                                                        value={module.description}
                                                        onChange={(e) =>
                                                            handleChange(module.id, "description", e.target.value)
                                                        }
                                                        placeholder="Enter description"
                                                    />
                                                </Col>

                                            </Row>

                                            {/* Buttons */}
                                            <Row className="mt-4">
                                                <Col md={3}>
                                                    <Button
                                                        variant="dark"
                                                        className="w-100 rounded-pill py-3"
                                                    >
                                                        Generate
                                                    </Button>
                                                </Col>

                                                <Col md={3}>
                                                    <Button
                                                        variant="light"
                                                        className="w-100 rounded-pill py-3 "
                                                        onClick={handleAddModule}
                                                    >
                                                        Add Sub Module
                                                    </Button>
                                                </Col>
                                                <Col md={1}>
                                                    {index !== 0 && (
                                                        <div className="mt-3"
                                                            onClick={() => handleDeleteModule(module.id)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <TrashIcon size={26} color="red" />
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Card>
                                    ))}
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default CreateModule;