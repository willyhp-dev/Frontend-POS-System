import { faBars, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Navbar,
  Row,
  Spinner,
} from "react-bootstrap";
import "./index.css";
import RouterPage from "./Router";
import SidebarPage from "./SideBar/SideBar";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageLogin from "./BodyCard/LoginRegister";
import RegisterPage from "./BodyCard/LoginRegister/Register";

export default function AdminPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showR, setShowR] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloses = () => setShowR(false);
  const handleShows = () => setShowR(true);

  const [loading, setloading] = useState(false);

  const Logout = () => {
    swal({
      title: "Are you sure?",
      text: "Once Your LOGOUT, you will not be able to setting System POS !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setloading(true);
        const url = "http://localhost:4000/api/auth/logout";

        await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          })
          .then((result) => {
            localStorage.removeItem("user");
            setloading(false);
            swal(`Akun Anda Berhasil LogOut`, {
              icon: "success",
            });

            navigate("/");
            return result;
          })
          .catch((error) => {
            setloading(false);
            swal(error.message, {
              icon: "error",
            });
          });
      } else {
        swal("OK");
      }
    });
  };
  const NavbarPages = () => {
    return (
      <Navbar className="shadow margin-settings" bg="primary" variant="secondary">
        <Container>
          <Button className="btn btn-primary" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <Navbar.Brand>
            {currentUser === null ? (
              <div>
                <Button
                  variant="primary"
                  className="btn btn-sm"
                  onClick={handleShow}
                >
                  <FontAwesomeIcon icon={faUser} /> Login
                </Button>

                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header>
                    <Modal.Title>Login Page</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <PageLogin />
                  </Modal.Body>
                </Modal>
                <Button
                  variant="primary"
                  className="btn btn-sm ml-2"
                  onClick={handleShows}
                >
                  <FontAwesomeIcon icon={faUser} /> Register
                </Button>
                <Modal show={showR} onHide={handleCloses} animation={false}>
                  <Modal.Header>
                    <Modal.Title>Register Form</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <RegisterPage />
                  </Modal.Body>
                </Modal>
              </div>
            ) : loading ? (
              <Button className="btn btn-danger btn-sm" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            ) : (
              <Button className="btn btn-danger btn-sm" onClick={Logout}>
                <FontAwesomeIcon icon={faPowerOff} /> LOGOUT
              </Button>
            )}
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  };
  return (
    <div>
      <Row>
        {!open && (
          <Col sm={2}>
            <Card className="bg-primary shadow heights rounded-0">
              <SidebarPage />
            </Card>
          </Col>
        )}
        <Col sm>
          <NavbarPages />
          {open ? (
            <Container>
              <RouterPage />
            </Container>
          ) : (
            <RouterPage />
          )}
        </Col>
      </Row>
    </div>
  );
}
