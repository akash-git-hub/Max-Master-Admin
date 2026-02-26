import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { InputField } from "../components/InputField";
import { Checkbox } from "../components/Checkbox";
import MailIcon from "../Icon/MailIcon";
import ShieldIcon from "../Icon/ShieldIcon";
import EyeIcon from "../Icon/EyeIcon";
import EyeSlashIcon from "../Icon/EyeSlashIcon";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/NetworkCall";
import { errorAlert, successAlert } from "../components/Alert";
import { AuthContext } from "../states/AuthContext";
import { Loader } from "../components/Loader";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ "email": "", "password": "" });
    const { setLoggedIn, setProfileData } = useContext(AuthContext);
    const [inData, setInData] = useState({ "email": localStorage.getItem("myEmail"), "password": localStorage.getItem("myPassword"), "reminder": localStorage.getItem("myReminder") === "true" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInData((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: "" }));
    }

    const checkHandler = (e) => {
        const { name, checked } = e.target;
        setInData((pre) => ({ ...pre, [name]: checked }));
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        if (inData.reminder) {
            localStorage.setItem("myReminder", true);
            localStorage.setItem("myEmail", inData.email);
            localStorage.setItem("myPassword", inData.password);
        } else {
            localStorage.removeItem("myReminder");
            localStorage.removeItem("myEmail");
            localStorage.removeItem("myPassword");
        }


        let isValid = 1;

        const { email, password } = inData;

        if (!email) {
            setError((prev) => ({ ...prev, email: "Required !" }));
            isValid = 0;
        }

        if (!password) {
            setError((pre) => ({ ...pre, 'password': "Required !" }));
            isValid = 0;
        }

        if (isValid === 1) {
            setLoading(true);
            const payload = { email, password };

            const res = await loginAPI(payload);

            if (res.success) {
                setLoggedIn(true);
                setProfileData(res.data);
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("authToken", `${res.data.token}`);
                localStorage.setItem("profileData", JSON.stringify(res.data));
                successAlert({ message: res.message })
                navigate("/dashboard", { replace: true });
            } else {
                errorAlert({ message: res.message });
            }
            setLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Loader show={loading} />
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
                                    FormLabel="Email Address"
                                    FormType="text"
                                    name="email"
                                    FormPlaceHolder="Enter email"
                                    value={inData.email}
                                    onChange={inputHandler}
                                    error={error.email}
                                    startIcon={<MailIcon />}
                                />

                                <InputField
                                    FormLabel="Password"
                                    FormType={showPassword ? "text" : "password"}
                                    name="password"
                                    FormPlaceHolder="Enter password"
                                    value={inData.password}
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
                                        checked={inData.reminder}
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
        </>
    );
};

export default Login;
