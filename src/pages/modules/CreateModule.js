import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Stack,
} from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { InputField } from "../../components/InputField";
import TrashIcon from "../../Icon/TrashIcon";
import AttachmentUpload from "../../components/AttachmentUpload";
import { createModuleAPI, updateModuleAPI } from "../../services/NetworkCall";
import { errorAlert, successAlert } from "../../components/Alert";
import { SharedButton } from "../../components/SharedButton";
import { UploadAttachments } from "../../components/UploadAttachments";
import { ProfileIcon } from "../../Icon/ProfileIcon";
import { Clipboard } from "../../Icon/Clipboard";
import { BookIcon } from "../../Icon/BookIcon";
import { LinkIcon } from "../../Icon/LinkIcon";
import ImageIcon from "../../Icon/ImageIcon";
import { PlusIcon } from "../../Icon/PlusIcon";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { Loader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const CreateModule = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [inData, setInData] = useState({
    name: "",
    description: "",
    assets_bundle_url: "",
    thumbnail: "",
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const [images, setImages] = useState([
    { id: generateId(), image_name: "", file: null },
  ]);

  const [videos, setVideos] = useState([
    { id: generateId(), video_name: "", file: null },
  ]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInData((pre) => ({ ...pre, [name]: value }));
    setError((pre) => ({ ...pre, [name]: "" }));
  };

  const handleFormSubmit = async (e) => {
   e.preventDefault();

    let isValid = true;

    const { name, description, thumbnail, assets_bundle_url } = inData;

    if (!name.trim()) {
      setError((prev) => ({ ...prev, name: "Required" }));
      isValid = false;
    }

    if (!description.trim()) {
      setError((prev) => ({ ...prev, description: "Required" }));
      isValid = false;
    }

    // if (!assets_bundle_url.trim()) {
    //   setError((prev) => ({ ...prev, assets_bundle_url: "Required" }));
    //   isValid = false;
    // }

    if (!thumbnail) {
      setError((prev) => ({ ...prev, thumbnail: "Required" }));
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("assets_bundle_url", assets_bundle_url);
    formData.append("thumbnail", thumbnail)
     
    // IMAGES (optional)
    images.forEach((img) => {
      if (img.file instanceof File) {
        formData.append("images", img.file);
        formData.append("image_label[]", img.image_name || "");
      }
    });
    console.log("images",images)


    // VIDEOS (optional)
    videos.forEach((vid) => {
      if (vid.file instanceof File) {
        formData.append("videos", vid.file);
        formData.append("video_label[]", vid.video_name || "");
        console.log("video file type:", vid.file);
console.log("is File:", vid.file instanceof File);
      }
    });

    const res = await createModuleAPI(formData);

    if (res.success) {
      successAlert({ message: res.message });
      navigate("/module-list");
    } else {
      errorAlert({ message: res.message });
    }

    setLoading(false);
  };

  const handleImageNameChange = (e, id) => {
    const { value } = e.target;
    setImages((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, image_name: value } : item,
      ),
    );
  };

  const handleImageFileChange = (file, id) => {
    setImages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, file } : item)),
    );
  };

  const handleVideoNameChange = (e, id) => {
    const { value } = e.target;
    setVideos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, video_name: value } : item,
      ),
    );
  };

  const handleVideoFileChange = (file, id) => {
    setVideos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, file } : item)),
    );
  };

  console.log(videos);


  const addImageColumn = (e) => {
    e.preventDefault();
    setImages((prev) => [...prev, { id: generateId(), image_name: "" }]);
  };

  const addVideoColumn = (e) => {
    e.preventDefault();
    setVideos((prev) => [...prev, { id: generateId(), video_name: "" }]);
  };

  const removeImageColumn = (id) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
  };

  const removeVideoColumn = (id) => {
    setVideos((prev) => prev.filter((item) => item.id !== id));
  };

  return ( <>
    <Loader show={loading} />
    <div className="d-md-flex gap-3">
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

      <div className="flex-grow-1 py-3">
        <Container
          fluid
          // className="rounded-4 p-4 bg-white min-vh-100 min-vh-md-auto"
          className="rounded-4 p-4 bg-white overflow-y-auto"  style={{maxHeight:'95vh'}}

        >
           <Stack
                  direction="horizontal"
                  className="align-items-center justify-content-start mb-4"
                  gap={3}
                >
                  <SharedButton
                    BtnLabel={<BackArrowIcon strokeWidth={3} size={25} />}
                    BtnVariant={"transparent"}
                    BtnClass={"border-0 p-0"}
                    BtnTitle={"Back"}
                    BtnClick={() => window.history.back()}
                  />
                  <h4 className="fw-bold mb-0 text-start">Create Module</h4>

                </Stack>
          

          <Row>
            <Col>
              <div className="table_body">

                <Card className="p-4 shadow-sm rounded-4">
                  <Form className="p-3" onSubmit={handleFormSubmit} method="POST">
                    <Row className="g-4">
                      <Col md={12} sm={12} xs={12} className="text-start mb-2">
                        <UploadAttachments
                          label="Upload"
                          onChange={(file) =>
                            setInData((prev) => ({ ...prev, thumbnail: file }))
                          }
                          accept="image"
                          error={error?.thumbnail}
                        />
                      </Col>
                      <Col md={6} sm={12} xs={12}>
                        <InputField
                          type={"text"}
                          name={"name"}
                          value={inData?.name}
                          onChange={inputHandler}
                          error={error?.name}
                          FormPlaceHolder={"Enter Name"}
                          startIcon={<ProfileIcon className="mt-1" />}
                        />
                      </Col>
                      <Col md={12} sm={12} xs={12}>
                        <InputField
                          label={"Description"}
                          name={"description"}
                          isTextArea={true}
                          value={inData?.description}
                          error={error?.description}
                          onChange={inputHandler}
                          rows={5}
                          FormPlaceHolder={"Description"}
                          startIcon={<BookIcon className={"mt-1"} />}
                          className={"h-100 custom-input"}
                        />
                      </Col>
                      <Col md={12} sm={12} xs={12}>
                        <InputField
                          name={"assets_bundle_url"}
                          value={inData?.assets_bundle_url}
                          error={error?.assets_bundle_url}
                          onChange={inputHandler}
                          type={"text"}
                          FormPlaceHolder={"Asset Bundle Url"}
                          startIcon={<LinkIcon size="24" />}
                        />
                      </Col>

                      {/* ---------------------Multiple Image Attachments----------------  */}
                      <Col
                        md={12}
                        sm={12}
                        xs={12}
                        className="shadow rounded p-3"
                      >
                        <Row className="g-2">
                          {images.map((item) => (
                            <Col md={3} key={item.id}>
                              <Stack
                                className="align-items-center border rounded p-3 position-relative"
                                gap={3}
                              >
                                {images.length > 1 && (
                                  <div
                                    className="position-absolute me-1 mt-1 top-0 end-0 z-1 "
                                    onClick={() => removeImageColumn(item.id)}
                                  >
                                    <span className=" px-2 pb-1 rounded-circle fw-bold bg-danger text-white cursor-pointer ">
                                      x
                                    </span>
                                  </div>
                                )}
                                <InputField
                                  value={item.image_name}
                                  onChange={(e) =>
                                    handleImageNameChange(e, item.id)
                                  }
                                  FormPlaceHolder="Image Name"
                                />

                                <UploadAttachments
                                  label={
                                    <>
                                      <ImageIcon className="mb-2" />{" "}
                                      <span className="text-muted">
                                        Upload Image
                                      </span>
                                    </>
                                  }
                                  onChange={(file) =>
                                    handleImageFileChange(file, item.id)
                                  }
                                  accept={"image"}
                                />
                              </Stack>
                            </Col>
                          ))}

                          {/* Add Button */}
                          <Col md={2} sm={12} xs={12} className="text-start">
                            <SharedButton
                              BtnLabel={
                                <div className="pb-1 px-1 bg-dark text-white rounded-circle">
                                  <PlusIcon className={"mt-1"} />
                                </div>
                              }
                              BtnSize={"sm"}
                              BtnVariant="transparent"
                              BtnClass="border-0"
                              BtnType={"button"}
                              BtnClick={addImageColumn}
                            />
                          </Col>
                        </Row>
                      </Col>

                      {/* ---------------------Multiple Video Attachments----------------  */}
                      <Col
                        md={12}
                        sm={12}
                        xs={12}
                        className="shadow rounded p-3"
                      >
                        <Row className="g-2">
                          {videos.map((item) => (
                            <Col md={3} key={item.id}>
                              <Stack
                                className="align-items-center border rounded p-3 position-relative"
                                gap={3}
                              >
                                {videos.length > 1 && (
                                  <div
                                    className="position-absolute me-1 mt-1 top-0 end-0 z-1 "
                                    onClick={() => removeVideoColumn(item.id)}
                                  >
                                   <span className=" px-2 pb-1 rounded-circle fw-bold bg-danger text-white cursor-pointer ">
                                      x
                                    </span>
                                  </div>
                                )}
                               <InputField
                              value={item.video_name}
                              onChange={(e) => handleVideoNameChange(e, item.id)}
                              FormPlaceHolder="Video Name"
                            />

                                <UploadAttachments
                                  label={
                                    <>
                                      {" "}
                                      <ImageIcon className="mb-2" />{" "}
                                      <span className="text-muted">
                                        Upload Video
                                      </span>{" "}
                                    </>     
                                  }
                                  onChange={(file) => handleVideoFileChange(file, item.id)}
                                  accept={"video"}
                                />
                              </Stack>
                            </Col>
                          ))}

                          {/* Add Button */}
                          <Col md={2} sm={12} xs={12} className="text-start">
                           <SharedButton
                              BtnLabel={
                                <div className="pb-1 px-1 bg-dark text-white rounded-circle">
                                  <PlusIcon className={"mt-1"} />
                                </div>
                              }
                              BtnSize={"sm"}
                              BtnVariant="transparent"
                              BtnClass="border-0"
                              BtnType={"button"}
                              BtnClick={addVideoColumn}
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col md={4} sm={12} xs={12}>
                        <SharedButton
                          BtnLabel={"Submit"}
                          BtnVariant={"dark"}
                          BtnClass={"rounded-5 w-100 mt-4 fw-bold py-2"}
                          BtnType={"submit"}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    </>
  );
};

export default CreateModule;
