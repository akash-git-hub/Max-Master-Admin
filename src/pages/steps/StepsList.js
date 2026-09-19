import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { EditIcon, PlusIcon } from "lucide-react";
import TrashIcon from "../../Icon/TrashIcon";
import {
    deleteStepsAPI,
    getStepsAPI,
    updateStepsAPI,
} from "../../services/NetworkCall";
import TablePagination from "../../components/TablePagination";
import { SharedButton } from "../../components/SharedButton";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { errorAlert, successAlert } from "../../components/Alert";
import Swal from "sweetalert2";

const StepsList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const location = useLocation();
    const categoryId = location?.state?.data?.id;
    const predata = location?.state?.data;

    const [stepsData, setStepsData] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecord: 0,
        limit: 10,
    });

    // ---- inline edit state ----
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        description: "",
        // key: null,
        correct_answer: "",
        is_order_matters: false,
    });

    const fetchSteps = async () => {
        try {
            setLoading(true);
            const payload = {
                categoryId,
                page: pagination.currentPage
            }
            const res = await getStepsAPI(payload);

            if (res?.success) {
                setStepsData(res?.data?.results || []);
                if (res?.data?.pagination) {
                    setPagination((prevPagination) => ({
                        ...prevPagination,
                        totalPages: res?.data?.pagination?.totalPages,
                        totalRecord: res?.data?.pagination?.totalItems,
                    }));
                }
            }
        } catch (error) {
            console.error("Error fetching steps:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSteps(pagination.currentPage);
    }, [pagination.currentPage, location]);

    const pageHandler = (page) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            currentPage: page,
        }));
    };

    const handleCreateButtonClick = () => {
        navigate("/steps-create", { state: { data: predata } });
    }

    // ---- start inline edit ----
    const editButtonClickHandler = (data) => {
        setEditingId(data.id);
        setEditForm({
            name: data?.name || "",
            description: data?.description || "",
            // key: data?.key ?? null,
            correct_answer: Array.isArray(data?.correct_answer)
                ? data.correct_answer.join(", ")
                : (data?.correct_answer || ""),
            is_order_matters: !!data?.is_order_matters,
        });
    };

    const editFieldChangeHandler = (field, value) => {
        setEditForm((prev) => ({ ...prev, [field]: value }));
    };

    const closeEditHandler = () => {
        setEditingId(null);
        setEditForm({
            name: "",
            description: "",
            key: null,
            correct_answer: "",
            is_order_matters: false,
        });
    };

    const updateHandler = async (id) => {
        try {
            setLoading(true);

            const payload = {
                name: editForm.name,
                description: editForm.description,
                // key: editForm.key,
                correct_answer: editForm.correct_answer
                    .split(",")
                    .map((ans) => ans.trim())
                    .filter((ans) => ans.length > 0),
                is_order_matters: editForm.is_order_matters,
            };

            const res = await updateStepsAPI({id, data:payload});

            if (res?.success) {
                successAlert({ message: res.message || "Step updated successfully" });
                closeEditHandler();
                await fetchSteps();
            } else {
                errorAlert({ message: res?.message || "Failed to update step" });
            }
        } catch (error) {
            console.error("Error updating step:", error);
            errorAlert({ message: "Something went wrong while updating" });
        } finally {
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1F0F55",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const res = await deleteStepsAPI(id);
                if (res.success) {
                    setLoading(false);
                    successAlert({ message: res.message });
                    await fetchSteps();
                } else {
                    setLoading(false);
                    errorAlert({ message: res.message });
                }
                setLoading(false);
            }
        });
    };

    return (
        <>
            <Loader show={loading} />
            <div className="d-md-flex  gap-3 ">
                <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

                <div
                    className="flex-grow-1 py-3 overflow-y-auto"
                    style={{ maxHeight: "100vh" }}
                >
                    <Container fluid className="rounded-4 p-4 bg-white min-vh-100">
                        <Stack
                            direction="horizontal"
                            className="align-items-center justify-content-start"
                            gap={3}
                        >
                            <SharedButton
                                BtnLabel={<BackArrowIcon strokeWidth={3} size={25} />}
                                BtnVariant={"transparent"}
                                BtnClass={"border-0 p-0"}
                                BtnTitle={"Back"}
                                BtnClick={() => window.history.back()}
                            />
                            <h4 className="fw-bold mb-0 text-start">Category</h4>
                        </Stack>

                        <div className="mt-4">
                            {/* Module Info Card */}
                            <div className="bg-light p-3 rounded-4 shadow-sm cursor-pointer mb-5 col-md-10 col-sm-12" >
                                <div className="ms-4 text-start flex-grow-1">
                                    <h5 className="mb-1 fw-bold">Name</h5>
                                    <h6 className="mb-1 fw-semibold">{predata?.name}</h6>
                                    <h5 className="mb-1 fw-bold mt-4">Description</h5>
                                    <p className="mb-1 text-muted text-start">
                                        {predata?.description}
                                    </p>
                                </div>
                            </div>

                            <Row>
                                <Col>
                                    <div className="table_body">
                                        <div className="d-flex justify-content-between mb-3 algin-items-center">
                                            <h4 className="fw-bold mt-1 text-start">
                                                Steps List
                                            </h4>
                                            <Button
                                                variant="transparent"
                                                className="border-0 text-white"
                                                onClick={handleCreateButtonClick}
                                                title="Create Categories"
                                            >
                                                <PlusIcon
                                                    strokeWidth="2.5"
                                                    size={30}
                                                    className={"p-1 bg-dark rounded-circle"}
                                                />{" "}
                                            </Button>


                                        </div>

                                        <div
                                            className="table-responsive rounded-4 overflow-y-auto"
                                            style={{
                                                border: "1px solid #eee",
                                            }}
                                        >
                                            <Table className="mb-0 align-middle text-nowrap">
                                                {/* Header */}
                                                <thead
                                                    style={{
                                                        background: "#f5f5f5",
                                                        position: "sticky",
                                                        top: 0,
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    <tr className="text-center small fw-semibold">
                                                        <th className="py-3">S NO</th>
                                                        <th className="py-3">NAME</th>
                                                        <th className="py-3">DESCRIPTION</th>
                                                        <th className="py-3">CORRECT ANSWER</th>
                                                        <th className="py-3">ACTION</th>
                                                    </tr>
                                                </thead>

                                                {/* Body */}

                                                <tbody className="text-center">
                                                    {stepsData.map((data, index) => {
                                                        const isEditing = editingId === data.id;

                                                        return (
                                                            <tr
                                                                key={index}
                                                                className={
                                                                    isEditing
                                                                        ? "table-row-editing"
                                                                        : "table-row-hover cursor-pointer"
                                                                }
                                                            >
                                                                <td className="py-3 small">
                                                                    {" "}
                                                                    {(pagination.currentPage - 1) *
                                                                        pagination.limit +
                                                                        index +
                                                                        1}{" "}
                                                                </td>

                                                                <td
                                                                    className="py-3 small text-wrap"
                                                                    style={{
                                                                        minWidth: 160,
                                                                         maxWidth: isEditing ? 260 : 180,
                                                                        verticalAlign: "top",
                                                                    }}
                                                                >
                                                                    {isEditing ? (
                                                                        <Form.Control
                                                                           as="textarea"
                                                                            rows={3}
                                                                            size="sm"
                                                                            value={editForm.name}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onChange={(e) =>
                                                                                editFieldChangeHandler("name", e.target.value)
                                                                            }
                                                                            autoFocus
                                                                        />
                                                                    ) : (
                                                                        data?.name
                                                                    )}
                                                                </td>

                                                                <td
                                                                    className={
                                                                        isEditing
                                                                            ? "py-3 small"
                                                                            : "py-3 small text-truncate"
                                                                    }
                                                                    style={{
                                                                        maxWidth: isEditing ? 260 : 180,
                                                                        minWidth: isEditing ? 200 : undefined,
                                                                        verticalAlign:  "top" ,
                                                                    }}
                                                                >
                                                                    {isEditing ? (
                                                                        <Form.Control
                                                                            as="textarea"
                                                                            rows={3}
                                                                            size="sm"
                                                                            value={editForm.description}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onChange={(e) =>
                                                                                editFieldChangeHandler(
                                                                                    "description",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        data?.description
                                                                    )}
                                                                </td>

                                                                <td
                                                                    className={
                                                                        isEditing
                                                                            ? "py-3 small"
                                                                            : "py-3 small text-truncate"
                                                                    }
                                                                    style={{
                                                                        maxWidth: isEditing ? 220 : 150,
                                                                        minWidth: isEditing ? 180 : undefined,
                                                                        verticalAlign: isEditing ? "top" : "middle",
                                                                    }}
                                                                >
                                                                    {isEditing ? (
                                                                        <Form.Control
                                                                            size="sm"
                                                                            type="text"
                                                                            placeholder="Comma separated e.g. Healthy, Active"
                                                                            value={editForm.correct_answer}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onChange={(e) =>
                                                                                editFieldChangeHandler(
                                                                                    "correct_answer",
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                        />
                                                                    ) : Array.isArray(data?.correct_answer) ? (
                                                                        data.correct_answer.join(", ")
                                                                    ) : (
                                                                        data?.correct_answer
                                                                    )}
                                                                </td>

                                                                <td className="py-3" style={{ verticalAlign: isEditing ? "top" : "middle" }}>
                                                                    {isEditing ? (
                                                                        <div
                                                                            className="d-flex justify-content-center align-items-center gap-2"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <SharedButton
                                                                                BtnClick={() => updateHandler(data.id)}
                                                                                BtnType={'button'}
                                                                                BtnVariant={'dark'}
                                                                                BtnLabel={'Update'}
                                                                                BtnSize={'sm'}
                                                                                BtnClass={'px-3'}
                                                                            />
                                                                            <SharedButton
                                                                                BtnClick={closeEditHandler}
                                                                                BtnType={'button'}
                                                                                BtnVariant={'outline-danger'}
                                                                                BtnLabel={'X'}
                                                                                BtnSize={'sm'}
                                                                                BtnClass={'px-2 py-1 fw-bold'}
                                                                            />

                                                                        </div>
                                                                    ) : (
                                                                        <div className="d-flex justify-content-center align-items-center gap-3">
                                                                            <EditIcon
                                                                                size={18}
                                                                                className={"text-dark cursor-pointer"}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    editButtonClickHandler(data);
                                                                                }}
                                                                            />

                                                                            <TrashIcon
                                                                                className="text-danger cursor-pointer"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    deleteHandler(data?.id);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>

                                        <TablePagination
                                            onPageChange={pageHandler}
                                            currentPage={pagination?.currentPage}
                                            totalPages={pagination?.totalPages}
                                            numberOfRecordsOnCurrentPage={stepsData?.length}
                                            limit={pagination?.limit}
                                            totalRecord={pagination?.totalRecord}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default StepsList;