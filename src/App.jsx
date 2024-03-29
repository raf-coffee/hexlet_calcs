import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/Layout/Layout.jsx";
import { Index } from "./pages/index.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { IMT } from "./pages/Health/IMT.jsx";
import { BodyType } from "./pages/Health/BodyType.jsx";
import { IdealWeight } from "./pages/Health/IdealWeight.jsx";
import { Currency } from "./pages/Currency/Currency.jsx";
import { Base64Decoder } from "./pages/Tech/Base64Decoder.jsx";
import { ConvertCSS } from "./pages/Tech/ConvertCSS.jsx";
import { PasswordGenerator } from "./pages/Tech/PasswordGenerator.jsx";
import { Loan } from "./pages/Finance/Loan.jsx";
import { NDS } from "./pages/Finance/NDS.jsx";
import { NDFL } from "./pages/Finance/NDFL.jsx";
import { Mortgage } from "./pages/Finance/Mortgage.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "loan",
        element: <Loan />,
      },
      {
        path: "mortgage",
        element: <Mortgage />,
      },
      {
        path: "ndfl",
        element: <NDFL />,
      },
      {
        path: "nds",
        element: <NDS />,
      },
      {
        path: "base64",
        element: <Base64Decoder />,
      },
      {
        path: "ideal-weight",
        element: <IdealWeight />,
      },
      {
        path: "imt",
        element: <IMT />,
      },
      {
        path: "body-type",
        element: <BodyType />,
      },
      {
        path: "currency",
        element: <Currency />,
      },
      {
        path: "password-generator",
        element: <PasswordGenerator />,
      },
      {
        path: "convert-css",
        element: <ConvertCSS />,
      },
    ],
  },
]);

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </ThemeProvider>
    </HelmetProvider>
  );
}
