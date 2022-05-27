import { faBars, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Card, Col, Container, Navbar, Row } from "react-bootstrap";
import "./index.css";
import RouterPage from "./Router";
import SidebarPage from "./SideBar/SideBar";
import swal from "sweetalert";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const Logout = () => {
    swal({
      title: "Are you sure?",
      text: "Once Your LOGOUT, you will not be able to setting System POS !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const url = "http://localhost:4000/api/auth/logout";
    
        await axios.get(url, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }).then(result => {
          localStorage.removeItem("user");
          swal(`Akun Anda Berhasil LogOut`, {
            icon: "success",
          });
          navigate("/")
         
          return result;
        }).catch(error => {
          swal(error.message, {
            icon: "error",
          });
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  const NavbarPages = () => {
    return (
      <Navbar className="shadow margin-settings" bg="dark" variant="dark">
        <Container>
          <Button className="btn btn-dark" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <Navbar.Brand>
            {currentUser === null ? (
              <div>
                <Link to="/login">
                  <Button className="btn btn-primary btn-sm">
                    <FontAwesomeIcon icon={faUser} /> LOGIN
                  </Button>
                </Link>
                <Link to="/Register">
                  <Button className="btn btn-primary btn-sm ml-3">
                    <FontAwesomeIcon icon={faUser} /> REGISTER
                  </Button>
                </Link>
              </div>
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
            <Card className="bg-dark shadow heights rounded-0">
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
