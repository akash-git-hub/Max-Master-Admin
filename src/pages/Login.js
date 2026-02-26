import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { InputField } from "../components/InputField";
import { Checkbox } from "../components/Checkbox";
import MailIcon from "../Icon/MailIcon";
import ShieldIcon from "../Icon/ShieldIcon";
import EyeIcon from "../Icon/EyeIcon";
import EyeSlashIcon from "../Icon/EyeSlashIcon";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        emailOrMobile: "",
        password: "",
        reminder: false,
    });

    const [error, setError] = useState({
        emailOrMobile: "",
        password: "",
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError((prev) => ({ ...prev, [name]: "" }));
    };

    const checkHandler = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        let isValid = true;

        if (!formData.emailOrMobile) {
            setError((prev) => ({ ...prev, emailOrMobile: "Required *" }));
            isValid = false;
        }

        if (!formData.password) {
            setError((prev) => ({ ...prev, password: "Required *" }));
            isValid = false;
        }

        if (isValid) {
            alert("Static Login Submitted ✅");
        }
    };

    return (
        <Container fluid className="login-wrapper">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col xs={11} sm={8} md={6} lg={4} xl={4} className="text-center">
                    <div className="login-body">
                        <img
                            src="/assets/Images/Max_Logo.png"
                            alt="Max Logo"
                            className="login-logo mb-3"
                        />
                        <h2 className="login-title mb-4">LOGIN</h2>

                        <Form onSubmit={submitHandler}>
                            <InputField
                                FormLabel="Email Address / Mobile Number"
                                FormType="text"
                                name="emailOrMobile"
                                FormPlaceHolder="Enter email OR Mobile"
                                value={formData.emailOrMobile}
                                onChange={inputHandler}
                                error={error.emailOrMobile}
                                startIcon={<MailIcon />}
                            />

                            <InputField
                                FormLabel="Password"
                                FormType={showPassword ? "text" : "password"}
                                name="password"
                                FormPlaceHolder="Enter password"
                                value={formData.password}
                                error={error.password}
                                onChange={inputHandler}
                                startIcon={<ShieldIcon />}
                                endIcon={
                                    showPassword ? (
                                        <EyeIcon
                                            className="text-secondary cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        />
                                    ) : (
                                        <EyeSlashIcon
                                            className="text-secondary cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        />
                                    )
                                }
                            />

                            <Stack
                                direction="horizontal"
                                className="justify-content-between mt-3 mb-4"
                                gap={3}
                            >
                                <Checkbox
                                    type="CheckBox"
                                    className="remember-check"
                                    checked={formData.reminder}
                                    name="reminder"
                                    label="Remember me"
                                    id="custom-check"
                                    onClick={checkHandler}
                                />
                                <span className="forgot-link">
                                    Forgot password?
                                </span>
                            </Stack>

                            <Button className="login-btn w-100 p-2 rounded-5" variant="dark" type="submit">
                                Log In
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
