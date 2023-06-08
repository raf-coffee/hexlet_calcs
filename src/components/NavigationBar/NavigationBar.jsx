import {Link, NavLink} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useState} from "react";

export const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleCollapseMenu = () => {
    setExpanded(false);
  }

  return (
    <Navbar expand="lg" expanded={expanded} className={"flex-column"}>
      <Container className={"justify-content-end"}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded((prev) => !prev)}/>
      </Container>
      <Container>
        <Navbar.Collapse>
          <Nav activeKey="/" className={"container mx-auto mb-5 row"}>
            <div className={"col d-flex flex-column me-2 p-0"}>
              <h2 className={"bg-color-custom px-1 mb-0"}>Финансовые</h2>
              <div className={"container text-start bg-image-finance flex-grow-1"}>
                <NavLink to={'nds'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Калькулятор НДС</NavLink>
                <NavLink to={'mortgage'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Ипотечный калькулятор</NavLink>
                <NavLink to={'ndfl'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Калькулятор НДФЛ</NavLink>
                <NavLink to={'loan'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Кредитный калькулятор</NavLink>
              </div>
            </div>
            <div  className={"col d-flex flex-column p-0 me-2"}>
              <h2 className={"bg-color-custom px-1 mb-0"}>Здоровье</h2>
              <div className={"container text-start bg-image-health flex-grow-1"}>
                <NavLink to={'imt'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Калькулятор индекса массы
                  тела</NavLink>
                <NavLink to={'ideal-weight'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Калькулятор идеального
                  веса</NavLink>
                <NavLink to={'dream'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Калькулятор сна</NavLink>
              </div>
            </div>
            <div  className={"col d-flex flex-column me-2 p-0"}>
              <h2 className={"bg-color-custom px-1 mb-0"}>Технические</h2>
              <div className={"container text-start bg-image-tech flex-grow-1"}>
                <NavLink to={'base64'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Кодировщик Base64</NavLink>
              </div>
            </div>
            <div  className={"col d-flex flex-column p-0"}>
              <h2 className={"bg-color-custom px-1 mb-0"}>Валюты</h2>
              <div className={"container text-start bg-image-currency flex-grow-1"}>
                <NavLink to={'currency'} onClick={handleCollapseMenu} className={"d-block py-1 link"}>Конвертер валют</NavLink>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}