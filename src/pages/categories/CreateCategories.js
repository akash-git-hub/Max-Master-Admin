import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { SharedButton } from "../../components/SharedButton";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import Sidebar from "../../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusIcon, Trash2 } from "lucide-react";
import { errorAlert, successAlert } from "../../components/Alert";
import { createCategoriesAPI, createStepsAPI, getAllSubModuleAPI, getModulesAPI } from "../../services/NetworkCall";

const CreateCategories = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();
    const predata = location?.state?.data;

    // Form Data
    const [formData, setFormData] = useState({  module_id: null, sub_module_id: null,  steps: [  { name: "", description: "" } ] });

    const [errors, setErrors] = useState({
        module_id: "",
        sub_module_id: "",
        steps: ""
    });

    useEffect(() => {
        if (predata?.id) {
             setFormData(prev => ({ ...prev, module_id: predata?.module?.id  }));
             setFormData(prev => ({ ...prev, sub_module_id: predata?.id  }));
        }
    }, [predata])
    

    // Add New Step
    const addStep = () => {
        setFormData(prev => ({
            ...prev,
            steps: [
                ...prev.steps,
                { name: "", description: "" }
            ]
        }));
        setErrors(prev => ({ ...prev, steps: "" }));
    };

    // Remove Step (Only after first step)
    const removeStep = (index) => {
        if (index === 0) return;

        setFormData(prev => ({
            ...prev,
            steps: prev.steps.filter((_, i) => i !== index)
        }));
    };

    // Handle Step Input Change
    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...formData.steps];
        updatedSteps[index][field] = value;
        setFormData(prev => ({ ...prev, steps: updatedSteps }));
    };

    // Form Validation - Only Module and Step Name required
    const validateForm = () => {
        let isValid = true;
        const newErrors = { module_id: "", sub_module_id: "", steps: "" };
 

        // Sub Module is now optional → No validation for it

        // Check Step Names
        const hasEmptyName = formData.steps.some(step => !step.name.trim());
        if (hasEmptyName) {
            newErrors.steps = "Step name is required for all steps";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    // Submit Handler
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const payload = {
            module_id: formData.module_id,
            sub_module_id: formData.sub_module_id || null,   // Send null if empty
            categories: formData.steps.map((step, index) => ({
                // step_number: index + 1,
                name: step.name.trim(),
                description: step.description ? step.description.trim() : null
            }))
        };


        const res = await createCategoriesAPI(payload);

        if (res.success) {
            successAlert({ message: "Category created successfully" });
            window.history.back();
        } else {
            errorAlert({ message: res?.message || "Failed to create Assessments" });
        }

        setLoading(false);
    };

    return (
        <>
            <Loader show={loading} />
            <div className="d-md-flex gap-3 vh-100">
                <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

                <div className="flex-grow-1 py-3">
                    <Container
                        fluid
                        className="rounded-4 p-4 bg-white h-100 overflow-y-auto"
                        style={{ maxHeight: "100vh" }}
                    >
                        <Stack direction="horizontal" className="align-items-center justify-content-start mb-4" gap={3}>
                            <SharedButton
                                BtnLabel={<BackArrowIcon strokeWidth={3} size={25} />}
                                BtnVariant={"transparent"}
                                BtnClass={"border-0 p-0"}
                                BtnTitle={"Back"}
                                BtnClick={() => window.history.back()}
                            />
                            <h4 className="fw-bold mb-0 text-start">Create Categories</h4>
                        </Stack>

                        <Form onSubmit={handleSubmit}>
                            <div className="p-4 rounded-4 text-start">
                                 <Row>
                                    <Col md={6}>
                                        <div className="text-start">
                                            <strong>Module:</strong> {predata?.module?.name ? predata?.module?.name : "Loading..."}
                                            </div>
                            </Col>
                            {predata.id && (
                                        <Col md={6}>
                                             <div className="text-start">
                                                <strong>Sub Module:</strong> {predata?.name || ""}
                                                </div>
                                </Col>
                            )}
                            </Row>

                                {/* Steps Section */}
                                <div className="mt-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold mb-0">Categories</h5>
                                        <Button variant="dark" onClick={addStep} className="d-flex align-items-center gap-2">
                                            <PlusIcon size={18} />
                                        </Button>
                                    </div>

                                    {errors.steps && <p className="text-danger mb-3">{errors.steps}</p>}

                                    <Table bordered hover responsive>
                                        <thead className="table-light">
                                            <tr>
                                                <th style={{ width: "50px" }}>#</th>
                                                <th>Category Name <span className="text-danger">*</span></th>
                                                <th>Description (Optional)</th>
                                                <th style={{ width: "90px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.steps.map((step, index) => (
                                                <tr key={index}>
                                                    <td className="text-center fw-medium">{index + 1}</td>
                                                    <td>
                                                        <Form.Control
                                                            type="text"
                                                            value={step.name}
                                                            placeholder="Enter step name"
                                                            onChange={(e) => handleStepChange(index, "name", e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={2}
                                                            value={step.description}
                                                            placeholder="Enter description (optional)"
                                                            onChange={(e) => handleStepChange(index, "description", e.target.value)}
                                                            style={{ resize: 'none' }}
                                                        />
                                                    </td>
                                                    <td>
                                                        {index !== 0 && (
                                                                <SharedButton
                                                                    BtnVariant={'transparent'}
                                                                    BtnSize={'sm'}
                                                                    BtnLabel={<Trash2 size={25} color="red" />}
                                                                    BtnClick={() => removeStep(index)}
                                                                    BtnClass={"p-3 w-100 border-0"}
                                                                /> 
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>

                                {/* Submit Button */}
                                {/* <div className="mt-4 w-25"> */}
                                    <SharedButton
                                        BtnType={'submit'}
                                        BtnClass={'col-md-4 col-12'}
                                        BtnVariant={'dark'}
                                        BtnSize={"md"}
                                        BtnLabel={"Submit"}
                                    />
                                    {/* <Button
                                        type="submit"
                                        className="w-100"
                                        variant="dark"
                                        size="md"
                                        style={{
                                            border: "none",
                                            padding: "14px 60px",
                                            borderRadius: "30px",
                                            fontSize: 16,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Submit
                                    </Button> */}
                                {/* </div> */}
                            </div>
                        </Form>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default CreateCategories;