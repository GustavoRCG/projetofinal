import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "rgb(255, 102, 0)" }}>
      <Container>
        <Navbar.Brand style={{ fontSize: "30px" }} href="#home">
          Arcanum
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} style={{ fontSize: "20px" }} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} style={{ fontSize: "20px" }} to="/Cortes">
              Cortes
            </Nav.Link>
            <Nav.Link as={Link} style={{ fontSize: "20px" }} to="/login">
              Login
            </Nav.Link>
            <NavDropdown
              title="Serviços"
              id="basic-nav-dropdown"
              style={{ fontSize: "20px" }}
            >
              <NavDropdown.Item as={Link} to={"/Barba"}>
                Barba
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/"}>
                Combos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/">
                Agendamento
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
