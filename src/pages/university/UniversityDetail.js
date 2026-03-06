import React, { useEffect, useState } from "react";
import { Col, Container, Row, Stack, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import EyeIcon from "../../Icon/EyeIcon";
import LogoutIcon from "../../Icon/LogoutIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { errorAlert } from "../../components/Alert";
import {
  getUniversityStudentsAPI,
  getUniversityStudentsList,
} from "../../services/NetworkCall";
import Swal from "sweetalert2";
import TablePagination from "../../components/TablePagination";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { SharedButton } from "../../components/SharedButton";

const UniversityDetail = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const universityId = location?.state?.data?.id;
  const universityData = location?.state?.data;
  console.log(universityData, universityId, location?.state.data);
  const [studentsData, setStudentsData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecord: 0,
    limit: 15,
  });

  const fetchStudents = async (page = 1, limit = pagination.limit) => {
    setLoading(true);

    const res = await getUniversityStudentsList({ universityId, limit, page });

    if (res.success) {
      setStudentsData(res?.data?.results);
      if (res.data?.pagination) {
        setPagination((prevPagination) => ({
          ...prevPagination,
          totalPages: res?.data?.pagination?.totalPages,
          totalRecord: res?.data?.pagination?.totalItems,
        }));
      }
    } else {
      errorAlert({ message: res?.message || "Failed to fetch modules" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents(pagination.currentPage);
  }, [pagination.currentPage, location]);

  const pageHandler = (page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: page,
    }));
  };

  const handleRowClick = (id) => {
    navigate("/student-profile");
  };

  return (
    <>
      <Loader show={loading} />

      <div className="d-md-flex gap-3 vh-100">
        <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

        <div className="flex-grow-1 py-3">
          <Container
            fluid
            className="rounded-4 p-4 bg-white overflow-y-auto h-100"
            style={{ height: "100vh" }}
          >
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
              <h4 className="fw-bold mb-0 text-start">University Detail</h4>
            </Stack>
            {/* <p className="text-muted text-start">
              Complete your profile to get personalized career guidance and
              opportunities
            </p> */}

            <div className="mt-4">
              {/* University Info Card */}
              <div
                className="bg-light p-3 rounded-4 shadow-sm mb-5"
                style={{ maxWidth: "650px" }}
              >
                <div className="d-flex align-items-center">
                  {/* Left Image */}
                  <img
                    src={universityData?.thumbnail}
                    alt="University"
                    className="rounded-4"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Right Content */}
                  <div className="ms-4 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-1 fw-bold">{universityData?.name}</h4>
                    </div>

                    <p className="mb-1 text-muted text-start">
                      {universityData?.email}
                    </p>

                    <p className="mb-0 text-muted text-start">
                      {universityData?.full_address}
                      <br />
                      {universityData?.contact_number}
                    </p>
                  </div>
                </div>
              </div>

              <Row>
                <Col>
                  <div className="table_body">
                    <h4 className="fw-bold mb-3 text-start">Student List</h4>

                    <div
                      className="table-responsive rounded-4"
                      style={{
                        maxHeight: "600px",
                        overflowY: "auto",
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
                            <th className="py-3">ID</th>
                            <th className="py-3">FIRST NAME</th>
                            <th className="py-3">LAST NAME</th>
                            <th className="py-3">EMAIL</th>
                            <th className="py-3">CONTACT</th>
                            <th className="py-3">SEMESTER</th>
                            {/* <th className="py-3">STATUS</th> */}
                          </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="text-center">
                          {studentsData.map((data, index) => (
                            <tr
                              key={index}
                              // onClick={() => handleRowClick(data.id)}
                              className="table-row-hover"
                              style={{ cursor: "pointer" }}
                            >
                              {/* 
                                                        <td className="py-3 small">
                                                            {index + 1}
                                                        </td> */}

                              <td className="py-3 small">
                                {data.student_id}
                              </td>

                              <td className="py-3 small">{data.first_name}</td>

                              <td className="py-3 small text-truncate">
                                {data.last_name}
                              </td>

                              <td className="py-3 small text-truncate">
                                {data.email}
                              </td>

                              <td className="py-3 small">
                                {data.contact_number}
                              </td>
                              <td className="py-3 small">{data.semester}</td>

                              {/* <td className="py-3">
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
                                                        </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <TablePagination
                      onPageChange={pageHandler}
                      currentPage={pagination?.currentPage}
                      totalPages={pagination?.totalPages}
                      numberOfRecordsOnCurrentPage={studentsData?.length}
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

export default UniversityDetail;
