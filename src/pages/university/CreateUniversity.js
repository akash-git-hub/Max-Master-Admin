import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { BoxIcon, LocationEditIcon, PhoneIcon, UserIcon } from "lucide-react";
import { InputField } from "../../components/InputField";
import AddUserIcon from "../../Icon/AddUserIcon";
import MailIcon from "../../Icon/MailIcon";
import ShieldIcon from "../../Icon/ShieldIcon";
import EyeIcon from "../../Icon/EyeIcon";
import LicenseIcon from "../../Icon/LicenseIcon";



const CreateUniversity = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        email: "",
        password: "",
        contact: "",
        modules: "",
        license: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="d-md-flex gap-3">
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

            <div className="flex-grow-1">
                <Container fluid className="p-4 bg-white rounded-4 min-vh-100">

                    <h3 className="fw-bold mb-0 text-start">Create University Account</h3>


                    {/* Form Box */}
                    <div className="p-4 rounded-4 text-start">
                        <Row className="g-4">

                            {/* Name */}
                            <Col md={4}>
                                <InputField
                                    FormLabel="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    startIcon={<AddUserIcon />}
                                    FormPlaceHolder="M1"
                                />
                            </Col>

                            {/* Location */}
                            <Col md={4}>
                                <InputField
                                    FormLabel="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    startIcon={<LocationEditIcon />}
                                    FormPlaceHolder="Enter location"
                                />
                            </Col>

                            {/* Email */}
                            <Col md={4}>
                                <InputField
                                    FormLabel="Email address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    startIcon={<MailIcon />}
                                    FormPlaceHolder="Enter email"
                                />
                            </Col>

                            {/* Password */}
                            <Col md={4}>
                                <InputField
                                    FormLabel="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    startIcon={<ShieldIcon />}
                                    endIcon={<EyeIcon />}
                                    FormPlaceHolder="Enter password"
                                />
                            </Col>

                            {/* Contact */}
                            <Col md={4}>
                                <InputField
                                    FormLabel="Contact Number"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    startIcon={<PhoneIcon />}
                                    FormPlaceHolder="Enter contact"
                                />
                            </Col>

                            {/* Modules */}
                            <Col md={4}>
                                <InputField
                                    FormLabel="Modules"
                                    name="modules"
                                    value={formData.modules}
                                    onChange={handleChange}
                                    startIcon={<BoxIcon />}
                                    FormPlaceHolder="Module A, Module B"
                                />
                            </Col>

                            {/* License */}
                            <Col md={4}>
                                <InputField
                                    FormLabel="NO of license"
                                    name="license"
                                    value={formData.license}
                                    onChange={handleChange}
                                    startIcon={<LicenseIcon />}
                                    FormPlaceHolder="10"
                                />
                            </Col>

                        </Row>

                        {/* Button */}
                        <div className="mt-4 w-25">
                            <Button
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
                                Generate
                            </Button>
                        </div>
                    </div>

                </Container>
            </div>
        </div>
    );
};

export default CreateUniversity;