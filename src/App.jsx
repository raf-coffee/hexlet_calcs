import Container from "react-bootstrap/Container";
import { Link, Outlet } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar/NavigationBar.jsx";
import "./App.css";

export function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-image-custom">
        <Container className="header-height d-flex align-items-center justify-content-between p-0">
          <Link to="/" className="logo">
            Calcus
          </Link>
        </Container>
      </header>
      <NavigationBar />
      <main className="container flex-grow-1">
        <Outlet />
      </main>
      <footer className="bg-image-custom mt-5">
        <Container className="d-flex flex-row justify-content-between align-items-center footer-height p-0">
          <p className="m-0">2023 © calcus </p>
          <p className="m-0">All rights reserved</p>
          <p className="m-0">made by group 43</p>
        </Container>
      </footer>
    </div>
  );
}
