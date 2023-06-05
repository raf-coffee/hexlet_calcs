import {Link} from "react-router-dom";
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
      <Container className={"mb-4"}>
        <Navbar.Brand href="/">Калькуляторы</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded((prev) => !prev)}/>
      </Container>
      <Container>
        <Navbar.Collapse>
          <Nav activeKey="/" className={"container justify-content-evenly mb-5"}>
            <div>
              <h2>Финансовые</h2>
              <div className={"container text-start"}>
                <Nav.Link><Link to={'/nds'} onClick={handleCollapseMenu}>Калькулятор НДС</Link></Nav.Link>
                <Nav.Link><Link to={'/mortgage'} onClick={handleCollapseMenu}>Ипотечный калькулятор</Link></Nav.Link>
                <Nav.Link><Link to={'/loan'} onClick={handleCollapseMenu}>Кредитный калькулятор</Link></Nav.Link>
                <Nav.Link><Link to={'/ndfl'} onClick={handleCollapseMenu}>Калькулятор НДФЛ</Link></Nav.Link>
              </div>
            </div>
            <div>
              <h2>Здоровье</h2>
              <div className={"container text-start"}>
                <Nav.Link><Link to={'/dream'} onClick={handleCollapseMenu}>Калькулятор сна</Link></Nav.Link>
                <Nav.Link><Link to={'/ideal-weight'} onClick={handleCollapseMenu}>Калькулятор индекса массы
                  тела</Link></Nav.Link>
                <Nav.Link><Link to={'/imt'} onClick={handleCollapseMenu}>Калькулятор идеального веса</Link></Nav.Link>
              </div>
            </div>
            <div>
              <h2>Технические</h2>
              <div className={"container text-start"}>
                <Nav.Link><Link to={'/base64'} onClick={handleCollapseMenu}>Кодировщик Base64</Link></Nav.Link>
                <Nav.Link><Link to={'page1'} onClick={handleCollapseMenu}>Калькулятор 1</Link></Nav.Link>
                <Nav.Link><Link to={'page1'} onClick={handleCollapseMenu}>Калькулятор 2</Link></Nav.Link>
                <Nav.Link><Link to={'page1'} onClick={handleCollapseMenu}>Калькулятор 3</Link></Nav.Link>
              </div>
            </div>
            <div>
              <h2>Валюты</h2>
              <div className={"container text-start"}>
                <Nav.Link><Link to={'page1'} onClick={handleCollapseMenu}>Конвертер валют</Link></Nav.Link>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}