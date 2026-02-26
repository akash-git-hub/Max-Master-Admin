import { Navbar, Container, Image, Stack, Button } from "react-bootstrap";
import NotificationIcon from "../Icon/NotificationIcon";
import MenuIcon from "../Icon/MenuIcon";

const Header = ({ PageTitle, notifications = false, onMenuClick }) => {
  return (
    <Navbar bg="white" className="border-bottom px-4 py-3">
      <Container fluid className="d-flex justify-content-between">
        <Button
          variant="light"
          className="d-md-none"
          onClick={onMenuClick}
        >
          <MenuIcon size={22} />
        </Button>
        <h4 className="fw-bold mb-0">{PageTitle}</h4>
        <Stack direction="horizontal" gap={2} className="align-items-center">
          {notifications && <NotificationIcon className="me-3" />}
          <Image
            // src="https://i.pravatar.cc/40"
            src="assets/images/admin-profile.png"
            alt="user"
            className="rounded-circle border border-warning p-1"
            width={60}
            height={60}
          />
          <div className="text-start">
            <h5 className="fw-semibold mb-0">TRADIE</h5>
            <small className="text-warning">Admin</small>
          </div>
        </Stack>
      </Container>
    </Navbar>
  );
};

export default Header;
