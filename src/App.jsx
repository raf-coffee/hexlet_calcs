import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/Layout/Layout.jsx";
import { Index } from "./pages/index.jsx";
import { Base64Decoder } from "./pages/Tech/Base64Decoder.jsx";
import { IdealWeight } from "./pages/Health/IdealWeight.jsx";
import { IMT } from "./pages/Health/IMT.jsx";
import { BodyType } from "./pages/Health/BodyType.jsx";
import { Currency } from "./pages/Currency/Currency.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { Mortgage } from "./pages/Finance/Mortgage.jsx";
import { NDFL } from "./pages/Finance/NDFL.jsx";
import { Loan } from "./pages/Finance/Loan.jsx";
import { NDS } from "./pages/Finance/NDS.jsx";
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
