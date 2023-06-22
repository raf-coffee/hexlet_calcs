import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Col, Nav, Navbar, CloseButton } from "react-bootstrap";
import { useCategory } from "../../hooks/useCategory.js";

export function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const category = useCategory();

  const handleCollapseMenu = () => {
    setExpanded(false);
  };

  return (
    <Navbar expand="lg" expanded={expanded} className="py-0 py-lg-2">
      <Container className="justify-content-end">
        {expanded ? (
          <CloseButton
            onClick={() => setExpanded((prev) => !prev)}
            aria-controls="navigation"
            aria-label="Close menu"
            className="my-3 my-lg-0 close-button"
          />
        ) : (
          <Navbar.Toggle
            aria-controls="navigation"
            aria-label="Open menu"
            onClick={() => setExpanded((prev) => !prev)}
            className="my-3 my-lg-0"
          />
        )}
        <Navbar.Collapse>
          <Nav activeKey="/" id="navigation" className="w-100 mx-auto mb-5">
            <Col className="d-flex flex-column me-lg-2 p-0">
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  category === "finance" ? "active-category" : ""
                }`}
              >
                Финансовые
              </h2>
              <div className="menu-container">
                <div className="bg-image-finance menu-img" />
                <div className="p-2 text-center flex-grow-1 menu-text">
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
              </div>
            </Col>
            <Col className="d-flex flex-column me-lg-2 p-0">
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  category === "health" ? "active-category" : ""
                }`}
              >
                Здоровье
              </h2>
              <div className="menu-container">
                <div className="bg-image-finance menu-img" />
                <div className="p-2 text-center flex-grow-1 menu-text">
                  <NavLink to="imt" onClick={handleCollapseMenu} className="d-block py-1 link">
                    Калькулятор индекса массы тела
                  </NavLink>
                  <NavLink to="body-type" onClick={handleCollapseMenu} className="d-block py-1 link">
                    Калькулятор типа телосложения
                  </NavLink>
                  <NavLink to="ideal-weight" onClick={handleCollapseMenu} className="d-block py-1 link">
                    Калькулятор идеального веса
                  </NavLink>
                </div>
              </div>
            </Col>
            <Col className="d-flex flex-column me-lg-2 p-0">
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  category === "tech" ? "active-category" : ""
                }`}
              >
                Технические
              </h2>
              <div className="menu-container">
                <div className="bg-image-finance menu-img" />
                <div className="p-2 text-center flex-grow-1 menu-text">
                  <NavLink to="base64" onClick={handleCollapseMenu} className="d-block py-1 link">
                    Кодировщик Base64
                  </NavLink>
                </div>
              </div>
            </Col>
            <Col className="d-flex flex-column p-0">
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  category === "currency" ? "active-category" : ""
                }`}
              >
                Валюты
              </h2>
              <div className="menu-container">
                <div className="bg-image-finance menu-img" />
                <div className="p-2 text-center flex-grow-1 menu-text">
                  <NavLink to="currency" onClick={handleCollapseMenu} className="d-block py-1 link">
                    Конвертер валют
                  </NavLink>
                </div>
              </div>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
