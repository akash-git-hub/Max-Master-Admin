import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StateCard from "../../components/StateCard";
import AddUserIcon from "../../Icon/AddUserIcon";
import Sidebar from "../../components/Sidebar";
import EyeIcon from "../../Icon/EyeIcon";
import LogoutIcon from "../../Icon/LogoutIcon";
import { getUniversityList } from "../../services/NetworkCall";
import { errorAlert } from "../../components/Alert";
import { Loader } from "../../components/Loader";
import TablePagination from "../../components/TablePagination";

const Dashboard = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
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


    const getBadge = (status) => {
        let className = "";

        if (status === "Completed") className = "text-success border-success";
        if (status === "In Progress") className = "text-primary border-primary";
        if (status === "Pending") className = "text-warning border-warning";

        return (
            <Badge bg="light" className={`border px-3 py-2 rounded-pill ${className}`}>
                {status}
            </Badge>
        );
    };


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


    const handleRowClick = (data) => {
        navigate("/university-detail", { state: { data } });
    };

    return (
        <>
            <Loader show={loading} />
            <div className="d-md-flex gap-3">
                <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

                <div className="flex-grow-1">
                    <Container fluid className="rounded-4 p-4 bg-white vh-100">
                        <h4 className="fw-bold mb-1 text-start">Dashboard</h4>
                        <p className="fw-normal mb-3 text-start">Complete your profile to get personalized career guidance and opportunities</p>
                        {/* Stat Cards */}
                        <Row className="g-4 mb-4">
                            <Col xl={4} md={6}>
                                <StateCard
                                    title="University"
                                    value="555,777"
                                    valueColor="#000"
                                    subText="Today Add 10 Customer"
                                    icon={<AddUserIcon />}
                                />
                            </Col>
                            <Col xl={4} md={6}>
                                <StateCard
                                    title="Total Users"
                                    value="430,493"
                                    valueColor="#000"
                                    subText="Today Add 32 Contractor"
                                    icon={<AddUserIcon />}
                                />
                            </Col>
                            <Col xl={4} md={6}>
                                <StateCard
                                    title="Total Modules"
                                    value="348,931"
                                    valueColor="#000"
                                    subText="Today 40 Complete projects"
                                    icon={<AddUserIcon />}
                                />
                            </Col>
                        </Row>

                        {/* University List */}
                        <Row>
                            <Col>
                                <div className="table_body">
                                    <h4 className="fw-bold mb-3 text-start">University List</h4>

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

export default Dashboard;
