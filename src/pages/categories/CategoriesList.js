import React, { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { data, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Image, Row, Stack, Table, } from "react-bootstrap";
import { EditIcon } from "../../Icon/EditIcon";
import TrashIcon from "../../Icon/TrashIcon";
import Swal from "sweetalert2";
import { errorAlert, successAlert } from "../../components/Alert";
import TablePagination from "../../components/TablePagination";
import { SharedButton } from "../../components/SharedButton";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { PlusIcon } from "../../Icon/PlusIcon";
import {
    deleteCategoriesAPI,
    getCategoriesAPI,
    updateCategoriesAPI,
} from "../../services/NetworkCall";

export const CategoriesList = () => {

    const [loading, setLoading] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const subModuleId = location?.state?.data?.id || null ;
    const moduleId = location?.state?.data?.module?.id || null;
    const subModuleData = location?.state?.data;



    const [categories, setcategories] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecord: 0,
        limit: 15,
    });

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", description: "" });

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const payload = {
                moduleId: !moduleId ? subModuleId : moduleId,
                ...(moduleId  && { subModuleId }),
                page: pagination.currentPage,
            }
            const res = await getCategoriesAPI(payload);

            if (res?.success) {
                setcategories(res?.data?.results || []);
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
        fetchCategories(pagination.page);
    }, [pagination.page, location]);

    const pageHandler = (page) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            page: page,
        }));
        fetchCategories(page);
    };

    const editButtonClickHandler = (data) => {
        setEditingId(data.id);
        setEditForm({
            name: data?.name || "",
            description: data?.description || "",
        });
    };

    const onChangeHandler = (field, value) => {
        setEditForm((prev) => ({ ...prev, [field]: value }));
    };

    const closeEditHandler = () => {
        setEditingId(null);
        setEditForm({ name: "", description: "" });
    };

    const updateHandler = async (id) => {
        try {
            const payload = {
                name: editForm.name,
                description: editForm.description,
            };
            setLoading(true);
            const res = await updateCategoriesAPI({ id, data: payload });

            if (res?.success) {
                successAlert({ message: res.message || "Category updated successfully" });
                closeEditHandler();
                await fetchCategories();
            } else {
                errorAlert({ message: res?.message || "Failed to update category" });
            }
        } catch (error) {
            console.error("Error updating category:", error);
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
            confirmButtonColor: " #1F0F55",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const res = await deleteCategoriesAPI(id);
                if (res.success) {
                    setLoading(false);
                    successAlert({ message: res.message });
                    await fetchCategories();
                } else {
                    setLoading(false);
                    errorAlert({ message: res.message });
                }
                setLoading(false);
            }
        });
    };

    const subModuleCardClick = () => {
        navigate("/sub-module-details", { state: { data: subModuleData } });
    };

    const HandleRowClick = (data) => {
        // don't navigate while this row is being edited
        if (editingId === data.id) return;
        navigate("/steps-list", { state: { data } });
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
                            <h4 className="fw-bold mb-0 text-start">Sub Module</h4>
                        </Stack>

                        <div className="mt-4">
                            {/* Module Info Card */}
                            <div
                                className="bg-light p-3 rounded-4 shadow-sm cursor-pointer mb-5 col-md-10 col-sm-12"
                                onClick={subModuleCardClick}
                            >
                                <div className="d-flex align-items-start">
                                    {/* Left Image */}
                                    {subModuleData?.thumbnail !== " " && <Image
                                        src={subModuleData?.thumbnail}
                                        alt="University"
                                        className="rounded-4 object-fit-cover"
                                        width={150}
                                        height={150}
                                    />}

                                    {/* Right Content */}
                                    <div className="ms-4 text-start flex-grow-1">
                                        <h5 className="mb-1 fw-bold">Name</h5>
                                        <h6 className="mb-1 fw-semibold">{subModuleData?.name}</h6>
                                        <h5 className="mb-1 fw-bold mt-4">Description</h5>
                                        <p className="mb-1 text-muted text-start">
                                            {subModuleData?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Row>
                                <Col>
                                    <div className="table_body">
                                        <div className="d-flex justify-content-between mb-3 algin-items-center">
                                            <h4 className="fw-bold mt-1 text-start">
                                                Category List
                                            </h4>
                                            <Button
                                                variant="transparent"
                                                className="border-0 text-white"
                                                onClick={() => {
                                                    navigate("/create-categories", {
                                                        state: { data: subModuleData },
                                                    });
                                                }}
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
                                                // maxHeight: "600px",
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
                                                        <th className="py-3">STEPS</th>
                                                        <th className="py-3">ACTION</th>
                                                    </tr>
                                                </thead>

                                                {/* Body */}

                                                <tbody className="text-center">
                                                    {categories.map((data, index) => {
                                                        const isEditing = editingId === data.id;

                                                        return (
                                                            <tr
                                                                key={index}
                                                                onClick={() => HandleRowClick(data)}
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

                                                                <td className="py-3 small justify-content-start" style={{ minWidth: 160, }}>
                                                                    {isEditing ? (
                                                                        <Form.Control
                                                                            size="sm"
                                                                            type="text"
                                                                            value={editForm.name}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onChange={(e) =>
                                                                                onChangeHandler("name", e.target.value)
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
                                                                    style={{ maxWidth: isEditing ? 260 : 180, minWidth: isEditing ? 200 : undefined }}
                                                                >
                                                                    {isEditing ? (
                                                                        <Form.Control
                                                                            as="textarea"
                                                                            rows={3}
                                                                            size="sm"
                                                                            value={editForm.description}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onChange={(e) =>
                                                                                onChangeHandler(
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
                                                                    className="py-3 small text-truncate"
                                                                    style={{ maxWidth: 150 }}
                                                                >
                                                                    {data?.stepsCount}
                                                                </td>

                                                                <td className="py-3">
                                                                    {isEditing ? (
                                                                        <div
                                                                            className="d-flex justify-content-center align-items-center gap-2"
                                                                            onClick={(e) => e.stopPropagation()}
                                                                        >
                                                                            <SharedButton
                                                                                BtnClick={() => updateHandler(data?.id)}
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
                                                                                    deleteHandler(data.id);
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
                                            numberOfRecordsOnCurrentPage={categories?.length}
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