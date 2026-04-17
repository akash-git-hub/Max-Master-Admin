import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { getStepsAPI } from "../../services/NetworkCall";

const StepsList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [stepsData, setStepsData] = useState([]);

    useEffect(() => {
        fetchSteps();
    }, []);

    const fetchSteps = async () => {
        try {
            setLoading(true);
            const res = await getStepsAPI();

            if (res?.success) {
                console.log(res?.data)
                setStepsData(res?.data || []);
            }
        } catch (error) {
            console.error("Error fetching steps:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateButtonClick = () => {
        navigate("/steps-create");
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

                        <Row>
                            <Col>
                                <div className="table_body">
                                    <div className="d-flex justify-content-between mb-3 algin-items-center">
                                        <h4 className="fw-bold mt-1 text-start">Assessments</h4>
                                        <Button
                                            variant="transparent"
                                            className="border-0 text-white"
                                            onClick={handleCreateButtonClick}
                                            title="Create University"
                                        >
                                            <PlusIcon
                                                strokeWidth="2.5"
                                                size={30}
                                                className={"p-1 bg-dark rounded-circle"}
                                            />{" "}
                                        </Button>
                                    </div>

                                    {/* Table Section */}
                                    <div
                                        className="table-responsive rounded-4"
                                        style={{
                                            maxHeight: "580px",
                                            overflowY: "auto",
                                            border: "1px solid #eee",
                                        }}
                                    >
                                        <Table className="mb-0 align-middle text-nowrap">
                                            <thead
                                                style={{
                                                    background: "#f5f5f5",
                                                    position: "sticky",
                                                    top: 0,
                                                    zIndex: 1,
                                                }}
                                            >
                                                <tr className="text-center small fw-semibold">
                                                    <th>S/N</th>
                                                    <th>Module</th>
                                                    <th>Sub-Module</th>
                                                    <th>Total Steps</th>
                                                    {/* <th>Action</th> */}
                                                </tr>
                                            </thead>

                                            <tbody className="text-center">
                                                {stepsData.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={4}>No Assessments found</td>
                                                    </tr>
                                                ) : (
                                                    stepsData.map((item, index) =>
                                                        // item.steps.map((step, stepIndex) => (
                                                        <tr key={`${index}-${index}`}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.module_name}</td>
                                                            <td>{item.sub_module_name || "-"}</td>
                                                            <td>{item.total_steps}</td>
                                                            {/* <td></td> */}
                                                        </tr>
                                                        // ))
                                                    )
                                                )}
                                            </tbody>

                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </div>
        </>
    );
};

export default StepsList;