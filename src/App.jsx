import { Container, Row, Col } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.jsx";
import "./App.css";

export function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="container header-height d-flex align-items-center justify-content-between bg-image-custom">
        <Link to="/" className="logo">
          Calcus
        </Link>
      </header>
      <NavigationBar />
      <main className="container flex-grow-1">
        <Outlet />
      </main>
      <footer className="bg-image-custom mt-2 mt-md-5">
        <Container className="footer-height p-md-0">
          <Row className="h-100 w-100 align-items-center justify-content-center justify-content-md-between">
            <Col>
              <p className="m-0">2023 © calcus </p>
            </Col>
            <Col>
              <p className="m-0 text-center">All rights reserved</p>
            </Col>
            <Col>
              <p className="m-0 text-end">made by group 43</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
