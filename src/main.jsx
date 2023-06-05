import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {Loan} from "./pages/Finance/Loan.jsx";
import {Mortgage} from "./pages/Finance/Mortgage.jsx";
import {NDFL} from "./pages/Finance/NDFL.jsx";
import {NDS} from "./pages/Finance/NDS.jsx";
import {Base64Decoder} from "./pages/Tech/Base64Decoder.jsx";
import {Dream} from "./pages/Health/Dream.jsx";
import {IdealWeight} from "./pages/Health/IdealWeight.jsx";
import {IMT} from "./pages/Health/IMT.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'loan',
        element: <Loan />
      },
      {
        path: 'mortgage',
        element: <Mortgage />
      },
      {
        path: 'ndfl',
        element: <NDFL />
      },
      {
        path: 'nds',
        element: <NDS />
      },
      {
        path: 'base64',
        element: <Base64Decoder />
      },
      {
        path: 'dream',
        element: <Dream />
      },
      {
        path: 'ideal-weight',
        element: <IdealWeight />
      },
      {
        path: 'imt',
        element: <IMT />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
