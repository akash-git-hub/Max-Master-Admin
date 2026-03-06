import { Container, Row, Col, Image, Stack } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import TrashIcon from "../../Icon/TrashIcon"; // ya bootstrap icon use kr lena
import { useLocation } from "react-router-dom";
import { InputField } from "../../components/InputField";
import { LinkIcon } from "../../Icon/LinkIcon";
import { SharedButton } from "../../components/SharedButton";
import BackArrowIcon from "../../Icon/BackArrowIcon";

const ModuleDetails = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const moduleData = location?.state?.data;

  console.log(moduleData);

  return (
    <div className="d-md-flex gap-3 vh-100">
      {/* Sidebar */}
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Right Content */}
      <div className="flex-grow-1 py-3">
        <Container
          fluid
          // className="p-4 bg-white rounded-4 min-vh-100 min-vh-md-auto"
          className="rounded-4 p-4 bg-white overflow-y-auto vh-100"
          style={{ maxHeight: "95vh" }}
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
            <h4 className="fw-bold mb-0 text-start">Module Details</h4>
          </Stack>
          

          <Row className="g-4 p-3">
            <Col md={3} sm={12}>
              <Stack
                direction="vertical"
                className="justify-content-start mt-2 align-items-center h-100"
              >
                <Image
                  src={moduleData?.thumbnail}
                  width={200}
                  height={200}
                  rounded
                  className="border"
                />
              </Stack>
            </Col>

            <Col md={9} sm={12}>
              <Stack direction="vertical" gap={0} className="p-2 text-start">
                <h4 className="fw-bold mb-1">Name</h4>
                <p className={"mb-0 fw-semibold"}>{moduleData?.name}</p>
                <h4 className="fw-bold mb-1 mt-3">Description</h4>
                <p className={"mb-0"}>{moduleData?.description}</p>
              </Stack>
            </Col>
          </Row>

          <Row className="p-3 g-3">
            {moduleData?.assets_bundle_url && (
              <Col md={8} sm={12} className="mb-3">
                <Stack
                  gap={3}
                  direction="horizontal"
                  className="justify-content-start rounded bg-light p-2 "
                >
                  <LinkIcon size="24" />{" "}
                  <h6 className="mb-0">{moduleData?.assets_bundle_url}</h6>
                </Stack>
              </Col>
            )}

            {/* --------------Images section----------------- */}
            <Col md={12} sm={12}>
              <h5 className={"ms-4 mb-4 fw-bold text-center "}>
                {" "}
                Images & Videos{" "}
              </h5>

              {moduleData?.images?.length > 0 && (
                <Row className="g-2 border-top">
                  {moduleData &&
                    moduleData.images &&
                    moduleData?.images.map((item) => (
                      <Col md={3} sm={12} xs={12} key={item.id}>
                        <Stack
                          direction="vertical"
                          className="align-items-center py-3 "
                          gap={3}
                        >
                          <p className={"mb-0 text-center"}>
                            {" "}
                            {item?.label_name}{" "}
                          </p>
                          <Image
                            src={item?.content}
                            height={250}
                            width={250}
                            rounded
                            className="border"
                          />
                        </Stack>
                      </Col>
                    ))}
                </Row>
              )}
            </Col>

            {/* --------------Videos section----------------- */}
            <Col md={12} sm={12}>
              {moduleData?.videos?.length > 0 && (
                <Row className="g-2 border-top">
                  {moduleData &&
                    moduleData.videos &&
                    moduleData?.videos.map((item) => (
                      <Col md={3} sm={12} xs={12} key={item.id}>
                        <Stack
                          direction="vertical"
                          className="align-items-center py-3 "
                          gap={3}
                        >
                          <p className={"mb-0 text-center"}>
                            {" "}
                            {item?.label_name}{" "}
                          </p>
                          <video
                            src={item.content}
                            controls
                            width={250}
                            height={250}
                            className="rounded shadow"
                          />
                        </Stack>
                      </Col>
                    ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ModuleDetails;
