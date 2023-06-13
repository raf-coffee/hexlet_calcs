import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  let location = useLocation();

  const handleCollapseMenu = () => {
    setExpanded(false);
  };

  useEffect(() => {
    setActiveCategory(location.pathname);
  }, [location]);

  return (
    <Navbar expand="lg" expanded={expanded} className={"flex-column"}>
      <Container className={"justify-content-end"}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded((prev) => !prev)} />
      </Container>
      <Container>
        <Navbar.Collapse>
          <Nav activeKey="/" className={"container mx-auto mb-5 row"}>
            <div className={`col d-flex flex-column me-2 p-0`}>
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  ["/nds", "/ndfl", "/mortgage", "/loan"].includes(activeCategory) ? "active-category" : ""
                }`}
              >
                Финансовые
              </h2>
              <div className={"container py-2 text-center bg-image-finance flex-grow-1"}>
                <NavLink to={"nds"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Калькулятор НДС
                </NavLink>
                <NavLink to={"mortgage"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Ипотечный калькулятор
                </NavLink>
                <NavLink to={"ndfl"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Калькулятор НДФЛ
                </NavLink>
                <NavLink to={"loan"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Кредитный калькулятор
                </NavLink>
              </div>
            </div>
            <div className={"col d-flex flex-column p-0 me-2"}>
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  ["/imt", "/ideal-weight", "/dream"].includes(activeCategory) ? "active-category" : ""
                }`}
              >
                Здоровье
              </h2>
              <div className={"container py-2 text-center bg-image-health flex-grow-1"}>
                <NavLink to={"imt"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Калькулятор индекса массы тела
                </NavLink>
                <NavLink to={"ideal-weight"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Калькулятор идеального веса
                </NavLink>
                <NavLink to={"dream"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Калькулятор сна
                </NavLink>
              </div>
            </div>
            <div className={"col d-flex flex-column me-2 p-0"}>
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  ["/base64"].includes(activeCategory) ? "active-category" : ""
                }`}
              >
                Технические
              </h2>
              <div className={"container py-2 text-center bg-image-tech flex-grow-1"}>
                <NavLink to={"base64"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Кодировщик Base64
                </NavLink>
              </div>
            </div>
            <div className={"col d-flex flex-column p-0"}>
              <h2
                className={`bg-color-custom text-center px-1 mb-0 letter-spacing-1 ${
                  ["/currency"].includes(activeCategory) ? "active-category" : ""
                }`}
              >
                Валюты
              </h2>
              <div className={"container py-2 text-center bg-image-currency flex-grow-1"}>
                <NavLink to={"currency"} onClick={handleCollapseMenu} className={"d-block py-1 link"}>
                  Конвертер валют
                </NavLink>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
