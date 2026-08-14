import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { SharedButton } from "../../components/SharedButton";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { PlusIcon, Trash2 } from "lucide-react";
import { errorAlert, successAlert } from "../../components/Alert";
import { getStepsDetailAPI, updateStepsAPI } from "../../services/NetworkCall";
import Sidebar from "../../components/Sidebar";

const StepsUpdate = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();
    const moduleId = location?.state?.data?.module_id;
    const subModuleId = location?.state?.data?.sub_module_id;


    const [loading, setLoading] = useState(false);
    const [stepsDetail, setStepsDetail] = useState({});
    const [error, setError] = useState({});
    const [formData, setFormData] = useState([{
        id: "",
        name: "",
        description: ""
    }]);


    const fetchStepsDetail = async () => {
        if (!moduleId) return;
        try {
            setLoading(true);
            const res = await getStepsDetailAPI({ module_id: moduleId, sub_module_id: subModuleId || "" });
            if (res.success) {
                setStepsDetail(res?.data || {});
                setFormData(res?.data?.steps || [])
            } else {
                errorAlert({ message: res.message });
            }
        } catch (err) {
            errorAlert({ message: err.message });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStepsDetail();
    }, [moduleId, subModuleId]);


    // const handleStepChange = (index, field, value) => {
    //     const updated = [...formData.steps];
    //     updated[index][field] = value;
    //     setFormData(prev => ({ ...prev, steps: updated }));
    // };

    const handleStepChange = (id, field, value) => {
        setFormData(prev => prev.map(s =>
            s.id === id ? { ...s, [field]: value } : s
        ));
        if (error?.id === id) {
            setError({})
        }
    }

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

    const handleUpdateSteps = async (id) => {
        setLoading(true)
        const step = formData.find((s) => s.id === id);

        if (!step?.name || step.name === "") {
            setError((pre) => ({ ...pre, id, "name": "Step name is required." }));
            setLoading(false)
            return;
        }

        const payload = {
            name: step.name,
            description: step.description || null,
        };
        try {
            const res = await updateStepsAPI({ id, data: payload });
            if (res?.success) {
            successAlert({ message: "Steps updated successfully!" });
            // navigate("/steps-list");
        } else {
            errorAlert({ message: res?.message || "something went wrong"});
        }
        setLoading(false);
        } catch (err) {
            errorAlert({ message: err?.message || "something went wrong"});
        } finally {
            setLoading(false);
        }
    }

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
                             <h4 className="fw-bold mb-0 text-start">Assessment</h4>
                         </Stack>

                     <div className="p-4 rounded-4 bg-white">
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                    <Col md={6}>
                                        <div className="text-start">
                                            <strong>Module:</strong> {stepsDetail?.module_id ? stepsDetail?.module_name : "Loading..."}
                                            </div>
                            </Col>
                            {stepsDetail.sub_module_id && (
                                        <Col md={6}>
                                             <div className="text-start">
                                                <strong>Sub Module:</strong> {stepsDetail?.sub_module_name || ""}
                                                </div>
                                </Col>
                            )}
                            </Row>

                        <div className="mt-4">
                            {/* <div className="d-flex justify-content-between mb-3">
                                <h5>Steps</h5>
                                <Button variant="dark" onClick={addStep}>
                                    <PlusIcon size={18} /> Add Step
                                </Button>
                            </div> */}

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
                                    {formData?.length > 0 ? (
                                        formData?.map((step, index) => (
                                         <tr key={index}>
                                            <td>{step?.step_number || index + 1}</td>
                                            <td>
                                                <Form.Control
                                                    name="name"
                                                    required={true}
                                                    value={step.name}
                                                    onChange={(e) => handleStepChange(step.id, "name", e.target.value)}
                                                />
                                                {error?.id === step.id && <p className="error text-danger text-start small">{error?.name}</p>}
                                            </td>
                                            <td>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={2}
                                                    value={step.description || ""}
                                                    onChange={(e) => handleStepChange(step.id, "description", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <SharedButton
                                                    BtnClick={() => { handleUpdateSteps(step.id) }}
                                                    BtnType={'button'}
                                                    BtnVariant={'dark'}
                                                    BtnLabel={'Update'}
                                                    BtnClass={'px-3 mt-3'}
                                                />
                                                 
                                            </td>
                                         </tr>
                                        )) ) : (
                                         <tr>
                                            <td colSpan={12}>No steps Found.</td>
                                         </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        {/* <Button type="submit" variant="dark" className="mt-4 px-5" style={{ borderRadius: "30px" }}>
                            Update Steps
                        </Button> */}
                    </Form>
                </div>

                    </Container>
                </div>
                </div>
        </>
    );
};

export default StepsUpdate;



// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { Loader } from "../../components/Loader";
// import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
// import { SharedButton } from "../../components/SharedButton";
// import BackArrowIcon from "../../Icon/BackArrowIcon";
// import { PlusIcon, Trash2 } from "lucide-react";
// import { errorAlert, successAlert } from "../../components/Alert";
// import { getStepsDetailAPI, updateStepsAPI } from "../../services/NetworkCall";
// import Sidebar from "../../components/Sidebar";

// const StepsUpdate = () => {
//     const [showSidebar, setShowSidebar] = useState(false)
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [stepsdata, setStepsdata] = useState({});
//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         module_id: "",
//         sub_module_id: "",
//         steps: []
//     });
    
//     const [errors, setErrors] = useState({
//         module_id: "",
//         sub_module_id: "",
//         steps: ""
//     });

    
//     useEffect(() => {
//         setStepsdata(location?.data);
//     },[location])

    

//     // Load Steps Detail for Editing
//     useEffect(() => {
//         if (!moduleId) return;

//         const loadDetail = async () => {
//             setLoading(true);
//             const res = await getStepsDetailAPI({ module_id: moduleId, sub_module_id: subModuleId || null });

//             if (res.success) {
//                 setFormData({
//                     module_id: res.data.module_id,
//                     sub_module_id: res.data.sub_module_id || "",
//                     steps: res.data.steps || []
//                 });
//             } else {
//                 errorAlert({ message: res.message });
//             }
//             setLoading(false);
//         };

//         loadDetail();
//     }, [moduleId, subModuleId]);

//     const addStep = () => {
//         setFormData(prev => ({
//             ...prev,
//             steps: [...prev.steps, { name: "", description: "" }]
//         }));
//     };

//     const removeStep = (index) => {
//         if (formData.steps.length <= 1) return;
//         setFormData(prev => ({
//             ...prev,
//             steps: prev.steps.filter((_, i) => i !== index)
//         }));
//     };

//     const handleStepChange = (index, field, value) => {
//         const updated = [...formData.steps];
//         updated[index][field] = value;
//         setFormData(prev => ({ ...prev, steps: updated }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const payload = {
//             module_id: formData.module_id,
//             sub_module_id: formData.sub_module_id || null,
//             steps: formData.steps.map((step, i) => ({
//                 step_number: i + 1,
//                 name: step.name.trim(),
//                 description: step.description ? step.description.trim() : null
//             }))
//         };

//         const res = await updateStepsAPI(payload);

//         if (res.success) {
//             successAlert({ message: "Steps updated successfully!" });
//             navigate("/steps-list");
//         } else {
//             errorAlert({ message: res.message });
//         }
//         setLoading(false);
//     };

//     return (
//         <>
//             <Loader show={loading} />
//             <div className="d-md-flex gap-3 vh-100">
//                 <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

//                 <div className="flex-grow-1 py-3">
//                     <Container
//                         fluid
//                         className="rounded-4 p-4 bg-white h-100 overflow-y-auto"
//                         style={{ maxHeight: "100vh" }}
//                     >
//                         <Stack direction="horizontal" className="align-items-center justify-content-start mb-4" gap={3}>
//                             <SharedButton
//                                 BtnLabel={<BackArrowIcon strokeWidth={3} size={25} />}
//                                 BtnVariant={"transparent"}
//                                 BtnClass={"border-0 p-0"}
//                                 BtnTitle={"Back"}
//                                 BtnClick={() => window.history.back()}
//                             />
//                             <h4 className="fw-bold mb-0 text-start">Assessment</h4>
//                         </Stack>

//                         <Form onSubmit={handleSubmit}>
//                             <div className="p-4 rounded-4 text-start">
//                                 <Row>
//                                     <Col md={6}>
//                                         <strong>Module:</strong> {formData.module_id ? "Loaded" : "Loading..."}
//                                     </Col>
//                                     {formData.sub_module_id && (
//                                         <Col md={6}>
//                                             <strong>Sub Module:</strong> {formData.sub_module_id}
//                                         </Col>
//                                     )}
//                                 </Row>

//                                 {/* Steps Section */}
//                                 <div className="mt-5">
//                                     <div className="d-flex justify-content-between align-items-center mb-3">
//                                         <h5 className="fw-bold mb-0">Steps</h5>
//                                         <Button variant="dark" onClick={addStep} className="d-flex align-items-center gap-2">
//                                             <PlusIcon size={18} />
//                                         </Button>
//                                     </div>

//                                     {errors.steps && <p className="text-danger mb-3">{errors.steps}</p>}

//                                     <Table bordered hover responsive>
//                                         <thead className="table-light">
//                                             <tr>
//                                                 <th style={{ width: "50px" }}>#</th>
//                                                 <th>Step Name <span className="text-danger">*</span></th>
//                                                 <th>Description (Optional)</th>
//                                                 <th style={{ width: "90px" }}>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {formData.steps.map((step, index) => (
//                                                 <tr key={index}>
//                                                     <td className="text-center fw-medium">{index + 1}</td>
//                                                     <td>
//                                                         <Form.Control
//                                                             type="text"
//                                                             value={step.name}
//                                                             placeholder="Enter step name"
//                                                             onChange={(e) => handleStepChange(index, "name", e.target.value)}
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <Form.Control
//                                                             as="textarea"
//                                                             rows={2}
//                                                             value={step.description}
//                                                             placeholder="Enter description (optional)"
//                                                             onChange={(e) => handleStepChange(index, "description", e.target.value)}
//                                                             style={{ resize: 'none' }}
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         {index !== 0 && (
//                                                             <Button
//                                                                 variant="outline-danger"
//                                                                 size="sm"
//                                                                 onClick={() => removeStep(index)}
//                                                             >
//                                                                 <Trash2 size={16} />
//                                                             </Button>
//                                                         )}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </Table>
//                                 </div>

//                                 {/* Submit Button */}
//                                 <div className="mt-4 w-25">
//                                     <Button
//                                         type="submit"
//                                         className="w-100"
//                                         variant="dark"
//                                         size="md"
//                                         style={{
//                                             border: "none",
//                                             padding: "14px 60px",
//                                             borderRadius: "30px",
//                                             fontSize: 16,
//                                             fontWeight: 600,
//                                         }}
//                                     >
//                                         Submit
//                                     </Button>
//                                 </div>
//                             </div>
//                         </Form>
//                     </Container>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default StepsUpdate;