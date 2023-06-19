import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Container, Col, Nav, Navbar, CloseButton } from "react-bootstrap";

export function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const location = useLocation();

  const handleCollapseMenu = () => {
    setExpanded(false);
  };

  useEffect(() => {
    setActiveCategory(location.pathname);
  }, [location]);

  return (
    <Navbar expand="lg" expanded={expanded} className="py-0 py-lg-2">
      <Container className="justify-content-end">
        {expanded ? (
          <CloseButton onClick={() => setExpanded((prev) => !prev)} className=" my-3 my-lg-0 close-button" />
        ) : (
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded((prev) => !prev)}
            className="my-3 my-lg-0"
          />
        )}
        <Navbar.Collapse>
          <Nav activeKey="/" className="w-100 mx-auto mb-5">
            <Col className="d-flex flex-column me-lg-2 p-0">
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  ["/nds", "/ndfl", "/mortgage", "/loan"].includes(activeCategory) ? "active-category" : ""
                }`}
              >
                Финансовые
              </h2>
              <div className="p-2 text-center bg-image-finance flex-grow-1">
                <NavLink to="nds" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Калькулятор НДС
                </NavLink>
                <NavLink to="mortgage" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Ипотечный калькулятор
                </NavLink>
                <NavLink to="ndfl" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Калькулятор НДФЛ
                </NavLink>
                <NavLink to="loan" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Кредитный калькулятор
                </NavLink>
              </div>
            </Col>
            <Col className="d-flex flex-column me-lg-2 p-0">
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  ["/imt", "/ideal-weight", "/dream", "/body-type"].includes(activeCategory) ? "active-category" : ""
                }`}
              >
                Здоровье
              </h2>
              <div className="p-2 text-center bg-image-health flex-grow-1">
                <NavLink to="imt" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Калькулятор индекса массы тела
                </NavLink>
                <NavLink to="body-type" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Калькулятор типа телосложения
                </NavLink>
                <NavLink to="ideal-weight" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Калькулятор идеального веса
                </NavLink>
                <NavLink to="dream" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Калькулятор сна
                </NavLink>
              </div>
            </Col>
            <Col className="d-flex flex-column me-lg-2 p-0">
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  ["/base64"].includes(activeCategory) ? "active-category" : ""
                }`}
              >
                Технические
              </h2>
              <div className="p-2 text-center bg-image-tech flex-grow-1">
                <NavLink to="base64" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Кодировщик Base64
                </NavLink>
              </div>
            </Col>
            <Col className="d-flex flex-column p-0">
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  ["/currency"].includes(activeCategory) ? "active-category" : ""
                }`}
              >
                Валюты
              </h2>
              <div className="p-2 text-center bg-image-currency flex-grow-1">
                <NavLink to="currency" onClick={handleCollapseMenu} className="d-block py-1 link">
                  Конвертер валют
                </NavLink>
              </div>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
