import React, { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import { data, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { EditIcon } from "../../Icon/EditIcon";
import TrashIcon from "../../Icon/TrashIcon";
import Swal from "sweetalert2";
import {
  deleteSubModuleAPI,
  getSubModuleAPI,
} from "../../services/NetworkCall";
import { errorAlert, successAlert } from "../../components/Alert";
import TablePagination from "../../components/TablePagination";
import { SharedButton } from "../../components/SharedButton";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { PlusIcon } from "../../Icon/PlusIcon";

export const SubmoduleList = () => {
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const moduleId = location?.state?.data?.id;
  const moduleData = location?.state?.data;

  const [subModulesData, setSubModulesData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecord: 0,
    limit: 15,
  });

  const fetchSubModules = async (page = 1) => {
    setLoading(true);

    const res = await getSubModuleAPI({ moduleId, page });

    if (res.success) {
      setSubModulesData(res?.data?.results);
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
    fetchSubModules(pagination.page);
  }, [pagination.page, location]);

  const pageHandler = (page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: page,
    }));
    fetchSubModules(page);
  };

  const editButtonClickHandler = (data) => {
    navigate("/edit-sub-module", { state: { data } });
  };

  const deleteHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const res = await deleteSubModuleAPI(id);
        if (res.success) {
          setLoading(false);
          successAlert({ message: res.message });
          await fetchSubModules(1);
        } else {
          setLoading(false);
          errorAlert({ message: res.message });
        }
        setLoading(false);
      }
    });
  };

  const ModuleCardClick = () => {
    navigate("/module-details", { state: { data: moduleData } });
  };

  const HandleRowClick = (data) => {
    navigate("/module-details", { state: { data } });
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
              <h4 className="fw-bold mb-0 text-start">Module</h4>
            </Stack>

            <div className="mt-4">
              {/* Module Info Card */}
              <div
                className="bg-light p-3 rounded-4 shadow-sm cursor-pointer mb-5 col-md-10 col-sm-12"
                onClick={ModuleCardClick}
              >
                <div className="d-flex align-items-start">
                  {/* Left Image */}
                  <Image
                    src={moduleData?.thumbnail}
                    alt="University"
                    className="rounded-4 object-fit-cover"
                    width={150}
                    height={150}
                  />

                  {/* Right Content */}
                  <div className="ms-4 text-start flex-grow-1">
                    <h5 className="mb-1 fw-bold">Name</h5>
                    <h6 className="mb-1 fw-semibold">{moduleData?.name}</h6>
                    <h5 className="mb-1 fw-bold mt-4">Description</h5>
                    <p className="mb-1 text-muted text-start">
                      {moduleData?.description}
                    </p>
                  </div>
                </div>
              </div>

              <Row>
                <Col>
                  <div className="table_body">
                    <div className="d-flex justify-content-between mb-3 algin-items-center">
                      <h4 className="fw-bold mt-1 text-start">
                        Sub Module List
                      </h4>
                      <Button
                        variant="transparent"
                        className="border-0 text-white"
                       onClick={() => {
                          navigate("/create-sub-module", {
                            state: { data: { id: moduleId } },
                          });
                        }}
                        title="Create Sub Module"
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
                            <th className="py-3">SUB MODULES</th>
                            <th className="py-3">ACTION</th>
                          </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="text-center">
                          {subModulesData.map((data, index) => (
                            <tr
                              key={index}
                              onClick={() => HandleRowClick(data)}
                              className="table-row-hover cursor-pointer"
                            >
                              <td className="py-3 small">
                                {" "}
                                {(pagination.currentPage - 1) *
                                  pagination.limit +
                                  index +
                                  1}{" "}
                              </td>

                              <td className="py-3 small">{data.name}</td>

                              <td
                                className="py-3 small text-truncate"
                                style={{ maxWidth: 180 }}
                              >
                                {" "}
                                {data.description}{" "}
                              </td>

                              <td
                                className="py-3 small text-truncate"
                                style={{ maxWidth: 150 }}
                              >
                                {data.subModuleCount}
                              </td>

                              <td className="py-3">
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
                      numberOfRecordsOnCurrentPage={subModulesData?.length}
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
