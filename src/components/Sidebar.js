import { useContext, useState } from "react";
import { Nav, Collapse, Offcanvas } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import CustomerIcon from "../Icon/CustomerIcon";
import DashboardIcon from "../Icon/DashboardIcon";
import ContractIcon from "../Icon/ContractIcon";
import ProjectIcon from "../Icon/ProjectIcon";
import ChatIcon from "../Icon/ChatIcon";
import LicenseIcon from "../Icon/LicenseIcon";
import SettingIcon from "../Icon/SettingIcon";
import LogoutIcon from "../Icon/LogoutIcon";
import BoxIcon from "../Icon/BoxIcon";
import RevenueIcon from "../Icon/RevenueIcon";
import PlatformSuspensionIcon from "../Icon/PlatformSuspensionIcon";
import { AuthContext } from "../states/AuthContext";

const Sidebar = ({ show, onClose }) => {
  const [openRevenue, setOpenRevenue] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { setLoggedIn, setProfileData } = useContext(AuthContext);

  const logOutHandler = () => {
    // alert(",,,,,,,,,,,,,,,,,")
    localStorage.removeItem("authToken");
    localStorage.removeItem("profileData");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setProfileData({});
    navigate("/", { replace: true });
  };

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleLinkClick = (route) => {
    if (route && route !== "#") navigate(route);
    onClose?.();
  };

  /* ================= SIDEBAR CONTENT ================= */
  const SidebarContent = () => (
    <div
      className="d-flex flex-column px-3 py-4 vh-100"
      style={{
        width: 300,
        background: "#FFF",
        overflowY: "auto",
        borderRadius: "20px"
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <img
          src="/assets/Images/Max_Logo.png"
          alt="Max"
          width={64}
          className="me-3"
        />
        <h4 className="mb-0 fw-bold">Max</h4>
      </div>

      <Nav className="flex-column gap-2">

        {/* Dashboard */}
        <Nav.Link
          onClick={() => handleLinkClick("/dashboard")}
          className={`d-flex align-items-center gap-3 px-4 py-3 rounded-5 ${pathname === "/dashboard"
            || pathname === "/university-detail" || pathname === "/student-profile" ? "bg-dark text-white fw-semibold"
            : "text-dark"
            }`}
        >
          <DashboardIcon color={pathname === "/dashboard" || pathname === "/university-detail" || pathname === "/student-profile" ? "#fff" : "#292D32"} />
          Dashboard
        </Nav.Link>


        {/* user list */}
        {/* <Nav.Link
          onClick={() => handleLinkClick("/user-list")}
          className={`d-flex align-items-center gap-3 px-4 py-3 rounded-5 ${pathname.startsWith("/user-list")
            ? "bg-dark text-white fw-semibold"
            : "text-dark"
            }`}
        >
          <ContractIcon color={pathname.startsWith("/user-list") ? "#fff" : "#292D32"} />
          User List
        </Nav.Link> */}

        {/* University */}
        <Nav.Link
          onClick={() => handleLinkClick("/university-list")}
          className={`d-flex align-items-center gap-3 px-4 py-3 rounded-5 ${
            pathname.startsWith("/university-list")
              ? "bg-dark text-white fw-semibold"
              : "text-dark"
          }`}
        >
          <ProjectIcon color={pathname.startsWith("/university-list") ? "#fff" : "#292D32"} />
          University
        </Nav.Link>

        <Nav.Link
          onClick={() => handleLinkClick("/module-list")}
          className={`d-flex align-items-center gap-3 px-4 py-3 rounded-5 ${
            pathname.startsWith("/module-list")
              ? "bg-dark text-white fw-semibold"
              : "text-dark"
          }`}
        >
          <BoxIcon color={pathname.startsWith("/module-list") ? "#fff" : "#292D32"} />
          Modules
        </Nav.Link>

        <hr />


        {/* Settings */}
        <Nav.Link
          onClick={() => handleLinkClick("#")}
          className="d-flex align-items-center gap-3 px-4 py-3 text-dark"
        >
          <SettingIcon />
          Settings
        </Nav.Link>

        {/* Logout (Static) */}
        <Nav.Link
          onClick={logOutHandler}
          className="d-flex align-items-center gap-3 px-4 py-3 text-dark"
        >
          <LogoutIcon />
          Logout
        </Nav.Link>

      </Nav>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="d-none d-md-block">
        <SidebarContent />
      </div>

      {/* Mobile */}
      <Offcanvas
        show={show}
        onHide={onClose}
        placement="start"
        className="d-md-none"
        style={{ width: 300 }}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body className="p-0">
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
