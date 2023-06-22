import Container from "react-bootstrap/Container";
import { Link, Outlet } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import { NavigationBar } from "../NavigationBar/NavigationBar.jsx";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";

export function Layout() {
  const [theme, setTheme] = useContext(ThemeContext);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="header-container">
        <div className="header-img header-height bg-image-header" />
        <Container className="header-text">
          <Link to="/" className="logo">
            Calcus
          </Link>
          <Form.Group controlId="variants">
            <Row className="align-items-center">
              <Col md={5} className="text-end text-nowrap d-md-block d-none">
                <Form.Label className="mb-0">Сменить тему:</Form.Label>
              </Col>
              <Col md={7}>
                <Form.Select aria-label="Вариант расчета" defaultValue={theme} onChange={handleThemeChange}>
                  <option value="light">Светлая тема</option>
                  <option value="dark">Темная тема</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Container>
      </header>
      <NavigationBar />
      <main className="container flex-grow-1">
        <Outlet />
      </main>
      <footer className="footer-container mt-2 mt-md-5">
        <div className="bg-image-footer footer-height footer-img" />
        <Container className="footer-text">
          <div>2023 © calcus</div>
          <div>All rights reserved</div>
          <div>made by group 43</div>
        </Container>
      </footer>
    </div>
  );
}
