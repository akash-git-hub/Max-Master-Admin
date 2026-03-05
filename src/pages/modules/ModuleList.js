import { Container, Row, Col, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import EyeIcon from "../../Icon/EyeIcon";
import TrashIcon from "../../Icon/TrashIcon";
import { deleteModuleAPI, getModulesAPI } from "../../services/NetworkCall";
import { errorAlert, successAlert } from "../../components/Alert";
import Swal from "sweetalert2";
import { EditIcon } from "../../Icon/EditIcon";
import TablePagination from "../../components/TablePagination";

const ModuleList = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCreateModule, setShowCreateModule] = useState(false);
  const [modulesData, setModulesData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecord: 0,
    limit: 15,
  });
  const [selectedModule, setSelectedModule] = useState(null);

  const fetchModules = async (page = 1) => {
    setLoading(true);

    const res = await getModulesAPI(page, pagination.limit);

    if (res.success) {
      setModulesData(res?.data?.results);
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
    fetchModules(pagination.page);
  }, [pagination.page]);

  const pageHandler = (page) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: page,
    }));
    fetchModules(page);
  };

  const editButtonClickHandler = (data) => {
    navigate("/edit-module", { state: { data } });
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
        const res = await deleteModuleAPI({ id });
        if (res.success) {
          setLoading(false);
          successAlert({ message: res.message });
          await fetchModules(1);
        } else {
          setLoading(false);
          errorAlert({ message: res.message });
        }
        setLoading(false);
      }
    });
  };

  const getBadge = (status) => {
    let className = "";

    if (status === "Active") className = "text-success border-success";
    if (status === "In Progress") className = "text-primary border-primary";
    if (status === "Inactive") className = "text-warning border-warning";

    return (
      <Badge
        bg="light"
        className={`border px-3 py-2 rounded-pill ${className}`}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="d-md-flex gap-3">
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

      <div className="flex-grow-1">
        <Container
          fluid
          className="rounded-4 p-4 bg-white min-vh-100 min-vh-md-auto"
        >
          {/* <h4 className="fw-bold mb-1 text-start">Modules</h4> */}

          {/* University List */}
          <Row>
            <Col>
              <div className="table_body">
                <div className="d-flex justify-content-between mb-3 algin-items-center">
                  <h4 className="fw-bold mt-1 text-start">Module </h4>
                  <Button
                    variant="dark rounded-5"
                    onClick={() => {
                      navigate("/create-module");
                    }}
                  >
                    Create Module
                  </Button>
                </div>

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
                        <th className="py-3">S NO</th>
                        <th className="py-3">MODULE NAME</th>
                        <th className="py-3">DESCRIPTION</th>
                        <th className="py-3">SUB MODULES</th>
                        <th className="py-3">STATUS</th>
                        <th className="py-3">ACTION</th>
                      </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="text-center">
                      {modulesData.map((data, index) => (
                        <tr
                          key={index}
                          //   onClick={() => handleRowClick(data.id)}
                          className="table-row-hover"
                          style={{ cursor: "pointer" }}
                        >
                          <td className="py-3 small">
                            {(pagination.currentPage - 1) * pagination.limit +
                              index +
                              1}
                          </td>

                          <td className="py-3 small">{data.name}</td>

                          <td
                            className="py-3 small text-truncate"
                            style={{ maxWidth: 180 }}
                          >
                            {data.description}
                          </td>

                          <td
                            className="py-3 small text-truncate"
                            style={{ maxWidth: 150 }}
                          >
                            {data.subModuleCount}
                          </td>

                          <td className="py-3 small">
                            {" "}
                            {getBadge(data.status)}
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
                  numberOfRecordsOnCurrentPage={modulesData?.length}
                  limit={pagination?.limit}
                  totalRecord={pagination?.totalRecord}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ModuleList;
