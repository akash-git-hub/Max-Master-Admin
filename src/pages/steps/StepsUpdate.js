import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { SharedButton } from "../../components/SharedButton";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { PlusIcon, Trash2 } from "lucide-react";
import { errorAlert, successAlert } from "../../components/Alert";
import { getStepsDetailAPI, updateStepsAPI } from "../../services/NetworkCall";

const StepsUpdate = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get("module_id");
    const subModuleId = searchParams.get("sub_module_id");

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        module_id: "",
        sub_module_id: "",
        steps: []
    });

    // Load Steps Detail for Editing
    useEffect(() => {
        if (!moduleId) return;

        const loadDetail = async () => {
            setLoading(true);
            const res = await getStepsDetailAPI({ module_id: moduleId, sub_module_id: subModuleId || null });

            if (res.success) {
                setFormData({
                    module_id: res.data.module_id,
                    sub_module_id: res.data.sub_module_id || "",
                    steps: res.data.steps || []
                });
            } else {
                errorAlert({ message: res.message });
            }
            setLoading(false);
        };

        loadDetail();
    }, [moduleId, subModuleId]);

    const addStep = () => {
        setFormData(prev => ({
            ...prev,
            steps: [...prev.steps, { name: "", description: "" }]
        }));
    };

    const removeStep = (index) => {
        if (formData.steps.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            steps: prev.steps.filter((_, i) => i !== index)
        }));
    };

    const handleStepChange = (index, field, value) => {
        const updated = [...formData.steps];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, steps: updated }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            module_id: formData.module_id,
            sub_module_id: formData.sub_module_id || null,
            steps: formData.steps.map((step, i) => ({
                step_number: i + 1,
                name: step.name.trim(),
                description: step.description ? step.description.trim() : null
            }))
        };

        const res = await updateStepsAPI(payload);

        if (res.success) {
            successAlert({ message: "Steps updated successfully!" });
            navigate("/steps-list");
        } else {
            errorAlert({ message: res.message });
        }
        setLoading(false);
    };

    return (
        <>
            <Loader show={loading} />
            <Container fluid className="p-4">
                <Stack direction="horizontal" gap={3} className="mb-4">
                    <SharedButton BtnLabel={<BackArrowIcon size={25} />} BtnClick={() => navigate(-1)} />
                    <h4 className="fw-bold">Edit Steps</h4>
                </Stack>

                <div className="p-4 rounded-4 bg-white">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <strong>Module:</strong> {formData.module_id ? "Loaded" : "Loading..."}
                            </Col>
                            {formData.sub_module_id && (
                                <Col md={6}>
                                    <strong>Sub Module:</strong> {formData.sub_module_id}
                                </Col>
                            )}
                        </Row>

                        <div className="mt-4">
                            <div className="d-flex justify-content-between mb-3">
                                <h5>Steps</h5>
                                <Button variant="dark" onClick={addStep}>
                                    <PlusIcon size={18} /> Add Step
                                </Button>
                            </div>

                            <Table bordered hover>
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Step Name *</th>
                                        <th>Description (Optional)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.steps.map((step, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Form.Control
                                                    value={step.name}
                                                    onChange={(e) => handleStepChange(index, "name", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={2}
                                                    value={step.description || ""}
                                                    onChange={(e) => handleStepChange(index, "description", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                {index !== 0 && (
                                                    <Button variant="outline-danger" size="sm" onClick={() => removeStep(index)}>
                                                        <Trash2 size={16} />
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        <Button type="submit" variant="dark" className="mt-4 px-5" style={{ borderRadius: "30px" }}>
                            Update Steps
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    );
};

export default StepsUpdate;