import { NavigationBar} from "./components/NavigationBar/NavigationBar.jsx";
import { Outlet } from "react-router-dom";
import './App.css'

function App() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}

export default App
