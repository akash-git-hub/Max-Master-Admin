import React, { useEffect, useState } from "react";
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
import { errorAlert, successAlert } from "../../components/Alert";
import { SharedButton } from "../../components/SharedButton";
import { UploadAttachments } from "../../components/UploadAttachments";
import { ProfileIcon } from "../../Icon/ProfileIcon";
import { BookIcon } from "../../Icon/BookIcon";
import { LinkIcon } from "../../Icon/LinkIcon";
import ImageIcon from "../../Icon/ImageIcon";
import { PlusIcon } from "../../Icon/PlusIcon";
import { useLocation } from "react-router-dom";
import { updateModuleAPI } from "../../services/NetworkCall";
import BackArrowIcon from "../../Icon/BackArrowIcon";
import { Loader } from "../../components/Loader";

const EditModule = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [inData, setInData] = useState({
    id: null,
    name: "",
    description: "",
    assets_bundle_url: "",
    thumbnail: "",
    thumbnail_url: "",
    deleted_content_id: [],
  });
  const [error, setError] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const createEmptyImage = () => ({
    id: generateId(),
    image_name: "",
    file: null,
    isExisting: false,
  });

  const createEmptyVideo = () => ({
    id: generateId(),
    video_name: "",
    file: null,
    isExisting: false,
  });

  const [images, setImages] = useState([createEmptyImage()]);
  const [videos, setVideos] = useState([createEmptyVideo()]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInData((pre) => ({ ...pre, [name]: value }));
    setError((pre) => ({ ...pre, [name]: "" }));
  };

  useEffect(() => {
    if (location?.state?.data) {
      const data = location.state.data;

      setInData({
        id: data?.id,
        name: data?.name,
        description: data?.description,
        assets_bundle_url: data?.assets_bundle_url,
        thumbnail_url: data?.thumbnail,
        thumbnail: null,
        deleted_content_id: [],
      });

      setImages(
        data.images?.length
          ? data.images.map((img) => ({
              id: img.id,
              image_name: img.label_name,
              url: img?.content,
              file: null,
              isExisting: true,
            }))
          : [createEmptyImage()],
      );

      setVideos(
        data.videos?.length
          ? data.videos.map((vid) => ({
              id: vid.id,
              video_name: vid.label_name,
              url: vid.content,
              file: null,
              isExisting: true,
            }))
          : [createEmptyVideo()],
      );
    }
  }, [location]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let isValid = true;
    const {
      id,
      name,
      description,
      thumbnail,
      deleted_content_id,
      assets_bundle_url,
    } = inData;

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

    if (!isValid) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("assets_bundle_url", assets_bundle_url);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    if (deleted_content_id && deleted_content_id.length) {
      formData.append("deleted_content_id", JSON.stringify(deleted_content_id));
    }

    // IMAGES (optional)
    images.forEach((img) => {
      if (img.file instanceof File) {
        formData.append("images", img.file);
        formData.append("image_label[]", img.image_name || "");
      }
    });

    // VIDEOS (optional)
    videos.forEach((vid) => {
      if (vid.file instanceof File) {
        formData.append("videos", vid.file);
        formData.append("video_label[]", vid.video_name || "");
      }
    });

    const res = await updateModuleAPI({ id, data: formData });

    if (res.success) {
      successAlert({ message: res.message });
      window.history.back();
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

  const addImageColumn = (e) => {
    e.preventDefault();
    setImages((prev) => [...prev, { id: generateId(), image_name: "" }]);
  };

  const addVideoColumn = (e) => {
    e.preventDefault();
    setVideos((prev) => [...prev, { id: generateId(), video_name: "" }]);
  };

  const removeImageColumn = (item) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== item.id);

      if (item.isExisting) {
        setInData((pre) => ({
          ...pre,
          deleted_content_id: [...pre.deleted_content_id, item.id],
        }));
      }

      // always keep at least one
      return updated.length ? updated : [createEmptyImage()];
    });
  };

  const removeVideoColumn = (item) => {
    setVideos((prev) => {
      const updated = prev.filter((vid) => vid.id !== item.id);

      if (item.isExisting) {
        setInData((pre) => ({
          ...pre,
          deleted_content_id: [...pre.deleted_content_id, item.id],
        }));
      }

      // always keep at least one
      return updated.length ? updated : [createEmptyVideo()];
    });
  };

  return (
     <>
        <Loader show={loading} />
    <div className="d-md-flex vh-100 gap-3">
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

      <div className="flex-grow-1 py-3">
        <Container
          fluid
          // className="rounded-4 p-4 bg-white min-vh-100 min-vh-md-auto"
          className="rounded-4 p-4 bg-white overflow-y-auto"  style={{maxHeight:'95vh'}}
        >
             <Stack
                  direction="horizontal"
                  className="align-items-center justify-content-start mb-3"
                  gap={3}
                >
                  <SharedButton
                    BtnLabel={<BackArrowIcon strokeWidth={3} size={25} />}
                    BtnVariant={"transparent"}
                    BtnClass={"border-0 p-0"}
                    BtnTitle={"Back"}
                    BtnClick={() => window.history.back()}
                  />
                  <h4 className="fw-bold mb-0 text-start ">Edit Module</h4>

                </Stack>
          {/* <p className="fw-normal mb-3 mt-1 text-start">
            Complete your modules to get personalized career guidance and
            opportunities
          </p> */}

          <Row>
            <Col>
              <div className="table_body">
          {/* <h4 className="fw-bold mb-1 text-start  mb-3">Edit Modules</h4> */}
               

                <Card className="p-4 shadow-sm rounded-4">
                  <Form className="p-3" onSubmit={submitHandler}>
                    <Row className="g-4">
                      <Col md={12} sm={12} xs={12} className="text-start mb-2">
                        <UploadAttachments
                          label="Upload"
                          accept="image"
                          value={inData?.thumbnail_url}
                          error={error?.thumbnail}
                          onChange={(file) =>
                            setInData((prev) => ({ ...prev, thumbnail: file }))
                          }
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
                          startIcon={<BookIcon className={"mt-2"} />}
                          className={"h-100"}
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
                                {!(
                                  item.isExisting === false &&
                                  images.length === 1
                                ) && (
                                  <div
                                    className="position-absolute me-1 mt-1 top-0 end-0 z-1 "
                                    onClick={() => removeImageColumn(item)}
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
                                      <ImageIcon /> <span>Upload Image</span>
                                    </>
                                  }
                                  value={item?.url}
                                  accept="image"
                                  onChange={(file) =>
                                    handleImageFileChange(file, item.id)
                                  }
                                />
                              </Stack>
                            </Col>
                          ))}

                          {/* Add Button */}
                          <Col md={2} sm={12} xs={12}>
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
                                {!(
                                  item.isExisting === false &&
                                  images.length === 1
                                ) && (
                                  <div
                                    className="position-absolute me-1 mt-1 top-0 end-0 z-1 "
                                    onClick={() => removeVideoColumn(item)}
                                  >
                                    <span className=" px-2 pb-1 rounded-circle fw-bold bg-danger text-white cursor-pointer ">
                                      x
                                    </span>
                                  </div>
                                )}
                                <InputField
                                  value={item.video_name}
                                  onChange={(e) =>
                                    handleVideoNameChange(e, item.id)
                                  }
                                  FormPlaceHolder="Video Name"
                                />

                                <UploadAttachments
                                  value={item?.url}
                                  label={
                                    <>
                                      <ImageIcon /> <span>Upload Video</span>
                                    </>
                                  }
                                  accept="video"
                                  onChange={(file) =>
                                    handleVideoFileChange(file, item.id)
                                  }
                                />
                              </Stack>
                            </Col>
                          ))}

                          {/* Add Button */}
                          <Col md={2} sm={12} xs={12}>
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
                          BtnLabel={"Update"}
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

export default EditModule;
