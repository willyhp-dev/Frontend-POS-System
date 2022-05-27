import { Container, Nav, Navbar } from "react-bootstrap";

export default function PageNavbar() {
    return (
        <Navbar className="shadow" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">POS SYSTEM</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav>
      <Navbar.Brand href="#home"><small>Login</small></Navbar.Brand>
      <Navbar.Brand href="#home"><small>Register</small></Navbar.Brand>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>     
    )
   
}