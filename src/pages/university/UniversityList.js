import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import EyeIcon from "../../Icon/EyeIcon";
import TrashIcon from "../../Icon/TrashIcon";
import { errorAlert } from "../../components/Alert";
import { getUniversityList } from "../../services/NetworkCall";
import TablePagination from "../../components/TablePagination";
import { Loader } from "../../components/Loader";
import LogoutIcon from "../../Icon/LogoutIcon";

const UniversityList = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [universityAccounts, setUniversityAccounts] = useState([]);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalRecord: 0, limit: 15 });

    const fetchAccountsData = async (page = 1) => {
        setLoading(true);
        const res = await getUniversityList(page, pagination.limit);
        if (res.success) {
            setUniversityAccounts(res.data?.results);
            if (res.data?.pagination) {
                setPagination(prevPagination => ({
                    ...prevPagination,
                    totalPages: res?.data?.pagination?.totalPages,
                    totalRecord: res?.data?.pagination?.totalItems
                }));
            }

        } else {
            errorAlert({ message: res.message });
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchAccountsData();
    }, []);


    const handleCreateButtonClick = () => {
        navigate("/create-university");
    }

    useEffect(() => {
        fetchAccountsData(pagination.page);
    },
        [pagination.page]);

    const pageHandler = (page) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            page: page
        }));
        fetchAccountsData(page);
    }

    // const getBadge = (status) => {
    //     let className = "";

    //     if (status === "Completed") className = "text-success border-success";
    //     if (status === "In Progress") className = "text-primary border-primary";
    //     if (status === "Pending") className = "text-warning border-warning";

    //     return (
    //         <Badge bg="light" className={`border px-3 py-2 rounded-pill ${className}`}>
    //             {status}
    //         </Badge>
    //     );
    // };

    const handleRowClick = (data) => {
        navigate("/university-detail", { state: { data } });
    };

    return (
        <>
            <Loader show={loading} />
            <div className="d-md-flex gap-3">
                <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

                <div className="flex-grow-1">
                    <Container fluid className="rounded-4 p-4 bg-white min-vh-100 min-vh-md-auto">
                        {/* <h4 className="fw-bold mb-1 text-start">University</h4> */}
                        {/* <p className="fw-normal mb-3 text-start">Complete your modules to get personalized career guidance and opportunities</p> */}

                        {/* University List */}
                        <Row>
                            <Col>
                                <div className="table_body">
                                    <div className="d-flex justify-content-between mb-3 algin-items-center">
                                        <h4 className="fw-bold mt-1 text-start">University</h4>
                                        <Button variant="dark rounded-5" onClick={handleCreateButtonClick}>Create University</Button>
                                    </div>

                                    <div
                                        className="table-responsive rounded-4"
                                        style={{
                                            maxHeight: "600px",
                                            overflowY: "auto",
                                            border: "1px solid #eee"
                                        }}
                                    >
                                        <Table className="mb-0 align-middle text-nowrap">

                                            {/* Header */}
                                            <thead
                                                style={{
                                                    background: "#f5f5f5",
                                                    position: "sticky",
                                                    top: 0,
                                                    zIndex: 1
                                                }}
                                            >
                                                <tr className="text-center small fw-semibold">

                                                    <th className="py-3">NO</th>
                                                    <th className="py-3">NAME</th>
                                                    <th className="py-3">LOCATION</th>
                                                    <th className="py-3">MODULES</th>
                                                    <th className="py-3">EMAIL</th>
                                                    <th className="py-3">CONTACT</th>
                                                    <th className="py-3">NO OF LICENSE</th>
                                                    <th className="py-3">STATUS</th>
                                                </tr>
                                            </thead>

                                            {/* Body */}
                                            {/* Body */}
                                            <tbody className="text-center">

                                                {universityAccounts.map((data, index) => (
                                                    <tr
                                                        key={index}
                                                        onClick={() => handleRowClick(data)}
                                                        className="table-row-hover"
                                                        style={{ cursor: "pointer" }}
                                                    >

                                                        <td className="py-3 small">
                                                            {(pagination.currentPage - 1) * pagination.limit + index + 1}
                                                        </td>

                                                        <td className="py-3 small">{data?.name}</td>

                                                        <td className="py-3 small text-truncate"
                                                            style={{ maxWidth: 180 }}>
                                                            {data?.full_address}
                                                        </td>

                                                        <td className="py-3 small">{data?.modules}</td>

                                                        <td className="py-3 small text-truncate"
                                                            style={{ maxWidth: 150 }}>
                                                            {data?.user?.email}
                                                        </td>

                                                        <td className="py-3 small">{data?.contact_number}</td>

                                                        <td className="py-3 small">{data?.no_of_license}</td>

                                                        <td className="py-3">
                                                            <div className="d-flex justify-content-center align-items-center gap-3">
                                                                <EyeIcon
                                                                    className="text-dark cursor-pointer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />

                                                                <LogoutIcon
                                                                    className="text-danger cursor-pointer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </Table>
                                    </div>
                                    <TablePagination
                                        onPageChange={pageHandler}
                                        currentPage={pagination?.currentPage}
                                        totalPages={pagination?.totalPages}
                                        numberOfRecordsOnCurrentPage={universityAccounts?.length}
                                        limit={pagination?.limit}
                                        totalRecord={pagination?.totalRecord}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>

    );
};

export default UniversityList;
