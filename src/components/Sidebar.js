import { useContext, useState } from "react";
import { Nav, Collapse, Offcanvas, Image, Button } from "react-bootstrap";
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
import StepsIcon from "../Icon/StepsIcon";

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
    <div className="sidebar-container px-3 py-4 rounded-4"  >
      {/* Logo */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <Image
          src="assets/Images/Max-Logo.png"
          alt="Max Logo"
          width={100}
          height={100}
          className="w-100"
        />
      </div>

      <Nav className="flex-column gap-2">
        {/* Dashboard */}
        <Nav.Link
          onClick={() => handleLinkClick("/dashboard")}
          className={`d-flex align-items-center gap-3 px-4 py-3 rounded-5 ${pathname === "/dashboard" ||
            pathname === "/university-detail" ||
            pathname === "/student-profile"
            ? "bg-warning text-white fw-semibold"
            : "text-white"
            }`}
        >
          <DashboardIcon color={"#fff"} />
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
          className={`d-flex align-items-center gap-3 px-4 py-3 rounded-5 ${pathname === "/university-list" || pathname === "/create-university"
            ? "bg-warning text-white fw-semibold"
            : "text-white"
            }`}
        >
          <ProjectIcon color={"#fff"} />
          University
        </Nav.Link>

        <Nav.Link
          onClick={() => handleLinkClick("/module-list")}
          className={`d-flex align-items-center gap-3 px-4 py-3 rounded-5 ${pathname.startsWith("/module-list") || pathname.startsWith("/create-module") || pathname.startsWith("/edit-module") || pathname.startsWith("/sub-module-list") || pathname.startsWith("/create-sub-module") || pathname.startsWith("/edit-sub-module") || pathname.startsWith("/module-details")
            ? "bg-warning text-white fw-semibold"
            : "text-white"
            }`}
        >
          <BoxIcon color={"#fff"} /> Modules </Nav.Link>

        {/* Steps  */}
        <Nav.Link
          onClick={() => handleLinkClick("/steps-list")}
          className={`d-flex align-items-center gap-3 px-4 py-3 rounded-5 ${pathname.startsWith("/steps-list") || pathname.startsWith("/steps-create") || pathname.startsWith("/steps-edit")
            ? "bg-warning text-white fw-semibold"
            : "text-white"
            }`}
        >
          <StepsIcon color={"#fff"} />
          Assessments
        </Nav.Link>

        <hr />

        {/* Settings */}
        <Nav.Link
          onClick={() => handleLinkClick("#")}
          className="d-flex align-items-center gap-3 px-4 py-3 text-white"
        >
          <SettingIcon color="#fff" />
          Settings
        </Nav.Link>

        {/* Logout (Static) */}
        <Nav.Link
          onClick={logOutHandler}
          className="d-flex align-items-center gap-3 px-4 py-3 text-white"
        >
          <LogoutIcon color="#ff5757" />
          Logout
        </Nav.Link>
      </Nav>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="d-none py-3 d-md-block ">
        <SidebarContent />
      </div>

        {/* Mobile */}
      <div className="d-flex justify-content-between align-items-center mt-2 p-2 rounded-4 w-100 d-md-none" style={{backgroundColor:'#1F0F55'}}>
        <Image src="assets/Images/Max-Logo.png" alt="Max Logo" width={200} height={50}  className="object-fit-cover"/>
        <Button variant="transparent" onClick={() => setExpanded(!expanded)} className="d-md-none border-0 fw-bold fs-1 p-0 text-white me-3" > ≡  </Button>
      </div>

    
      <Offcanvas
        show={expanded}
        onHide={() => setExpanded(false)}
        placement="start"
        className="d-md-none rounded-4"
        style={{ width: 300 }}
      >
        <SidebarContent />
      </Offcanvas>
    </>
  );
};

export default Sidebar;
