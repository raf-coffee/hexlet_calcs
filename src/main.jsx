import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.jsx";
import { Loan } from "./pages/Finance/Loan.jsx";
import { Mortgage } from "./pages/Finance/Mortgage.jsx";
import { NDFL } from "./pages/Finance/NDFL.jsx";
import { NDS } from "./pages/Finance/NDS.jsx";
import { Base64Decoder } from "./pages/Tech/Base64Decoder.jsx";
import { IdealWeight } from "./pages/Health/IdealWeight.jsx";
import { IMT } from "./pages/Health/IMT.jsx";
import { Currency } from "./pages/Currency/Currency.jsx";
import { Index } from "./pages/index.jsx";
import { BodyType } from "./pages/Health/BodyType.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeProvider>
);
