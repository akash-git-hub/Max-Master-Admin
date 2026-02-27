import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { BoxIcon, ImageIcon, LocationEditIcon, PhoneIcon, Upload, UserIcon } from "lucide-react";
import { InputField } from "../../components/InputField";
import AddUserIcon from "../../Icon/AddUserIcon";
import MailIcon from "../../Icon/MailIcon";
import ShieldIcon from "../../Icon/ShieldIcon";
import EyeIcon from "../../Icon/EyeIcon";
import LicenseIcon from "../../Icon/LicenseIcon";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../components/Alert";
import { SharedButton } from "../../components/SharedButton";
import { AddressAutocomplete } from "../../components/AddressAutocomplete";
import { addUniversity } from "../../services/NetworkCall";
import AttachmentUpload from "../../components/AttachmentUpload";
import { Loader } from "../../components/Loader";



const CreateUniversity = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    // const [modules, setModules] = useState([]);
    const [inData, setInData] = useState({
        "name": "",
        "email": "",
        // "password": "",
        "contact_person": "",
        "contact_number": "",
        "no_of_license": 1,
        "thumbnail": null,
        // "modules": [],
        "full_address": "",
        "country": "",
        "state": "",
        "city": "",
        "postal_code": "",
        "longitude": "",
        "latitude": ""
    })

    const [error, setError] = useState({
        "name": "",
        "email": "",
        // "password": "",
        "contact_person": "",
        "contact_number": "",
        "no_of_license": "",
        // "modules": "",
        "full_address": "",
        "thumbnail": ""
    })


    // const fetchModules = async () => {
    //   setLoading(true);

    //   const res = await getModulesAPI();

    //   if (res.success && Array.isArray(res.data)) {
    //     const mData = res.data.map(d => ({ label: d?.name, value: d?.id }));
    //     setModules(mData);
    //   } else {
    //     errorAlert({ message: res?.message || "Failed to fetch modules" });
    //   }
    //   setLoading(false);
    // };


    // useEffect(() => {
    //   fetchModules();
    // }, []);


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInData((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
        // if (name === "password") {
        //   const validationError = validatePassword(value);
        //   setError((pre) => ({ ...pre, [name]: validationError }));
        // } else {
        //   setError((pre) => ({ ...pre, [name]: "" }));
        // }

    }


    // const handleModuleSelect = (selectedOptions) => {
    //   setInData((prev) => { return { ...prev, modules: selectedOptions } });
    //   setError((pre) => ({ ...pre, "modules": "" }));
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;

        // 🔹 clear previous errors
        setError({});

        const {
            name,
            email,
            contact_number,
            contact_person,
            full_address,
            country,
            state,
            city,
            postal_code,
            latitude,
            longitude,
            no_of_license,
            thumbnail
        } = inData;

        if (!thumbnail) {
            setError(prev => ({ ...prev, thumbnail: "Required!" }));
            isValid = false;
        }


        if (!name) {
            setError(prev => ({ ...prev, name: "Required!" }));
            isValid = false;
        }

        if (!email) {
            setError(prev => ({ ...prev, email: "Required!" }));
            isValid = false;
        }

        if (!contact_number) {
            setError(prev => ({ ...prev, contact_number: "Required!" }));
            isValid = false;
        }

        if (!contact_person) {
            setError(prev => ({ ...prev, contact_person: "Required!" }));
            isValid = false;
        }

        if (!full_address) {
            setError(prev => ({ ...prev, full_address: "Required!" }));
            isValid = false;
        }

        if (!no_of_license) {
            setError(prev => ({ ...prev, no_of_license: "Required!" }));
            isValid = false;
        }


        if (!isValid) return;
        setLoading(true);
        //FormData
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("contact_number", contact_number);
        formData.append("contact_person", contact_person);
        formData.append("full_address", full_address);
        formData.append("country", country);
        formData.append("state", state);
        formData.append("city", city);
        formData.append("postal_code", postal_code);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("no_of_license", no_of_license);

        if (thumbnail) {
            formData.append("thumbnail", thumbnail); // ✅ FILE
        }

        const res = await addUniversity(formData);

        if (res.success) {
            successAlert({ message: res?.message });
            navigate("/university-list");
        } else {
            errorAlert({ message: res?.message });
        }
        setLoading(false);

    };


    return (
        <>
            <Loader show={loading} />
            <div className="d-md-flex gap-3">
                <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

                <div className="flex-grow-1">
                    <Container fluid className="p-4 bg-white rounded-4 min-vh-100">

                        <h3 className="fw-bold mb-0 text-start">Create University Account</h3>

                        <Form onSubmit={handleSubmit}>
                            {/* Form Box */}
                            <div className="p-4 rounded-4 text-start">
                                <AttachmentUpload
                                    multiple={false}
                                    onFilesChange={(file) => {
                                        setInData((prev) => ({
                                            ...prev,
                                            thumbnail: file,
                                        }));
                                    }}
                                />
                                <Row className="g-4">

                                    {/* Name */}
                                    <Col md={4}>
                                        <InputField
                                            FormLabel="Name"
                                            name="name"
                                            error={error.name}
                                            value={inData.name}
                                            onChange={inputHandler}
                                            startIcon={<AddUserIcon />}
                                            FormPlaceHolder="M1"
                                        />
                                    </Col>

                                    {/* Location */}
                                    <Col md={4}>
                                        <AddressAutocomplete
                                            error={error?.full_address}
                                            label="Location"
                                            value={inData.full_address}
                                            onSelect={(address) => {
                                                setInData((prev) => ({
                                                    ...prev,
                                                    ...address,
                                                }));

                                                setError((prev) => ({
                                                    ...prev,
                                                    full_address: "",
                                                }));
                                            }}
                                        />
                                    </Col>

                                    {/* Email */}
                                    <Col md={4}>
                                        <InputField
                                            FormLabel="Email address"
                                            name="email"
                                            value={inData.email}
                                            onChange={inputHandler}
                                            error={error.email}
                                            startIcon={<MailIcon />}
                                            FormPlaceHolder="Enter email"
                                        />
                                    </Col>

                                    {/* Contact */}
                                    <Col md={4}>
                                        <InputField
                                            FormLabel="Contact Number"
                                            name="contact_number"
                                            value={inData.contact_number}
                                            onChange={inputHandler}
                                            error={error.contact_number}
                                            startIcon={<PhoneIcon />}
                                            FormPlaceHolder="Enter contact"
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <InputField
                                            FormLabel="Contact Person"
                                            name="contact_person"
                                            error={error.contact_person}
                                            value={inData.contact_person}
                                            onChange={inputHandler}
                                            startIcon={<BoxIcon />}
                                            FormPlaceHolder="Contact Person"
                                        />
                                    </Col>

                                    {/* License */}
                                    <Col md={4}>
                                        <InputField
                                            FormLabel="No of license"
                                            name="no_of_license"
                                            error={error.no_of_license}
                                            value={inData.no_of_license}
                                            onChange={inputHandler}
                                            startIcon={<LicenseIcon />}
                                            FormPlaceHolder="10"
                                        />
                                    </Col>

                                </Row>

                                {/* Button */}
                                <div className="mt-4 w-25">
                                    <Button
                                        type="submit"
                                        className="w-100"
                                        variant="dark"
                                        size="md"
                                        style={{
                                            border: "none",
                                            padding: "14px 60px",
                                            borderRadius: "30px",
                                            fontSize: 16,
                                            fontWeight: 600
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Container>
                </div>
            </div>
        </>

    );
};

export default CreateUniversity;