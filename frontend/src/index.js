import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import BarComponents from "./components/BarComponents";
import BarComponent from "./components/BarComponent";
import DoughnutComponent from "./components/DoughnutComponent";
import LineComponents from "./components/LineComponents";
import PieComponent from "./components/PieComponent";
import RadarComponent from "./components/RadarComponent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/bar" element={<BarComponent/>}/>
      <Route path="/doughnut" element={<DoughnutComponent/>}/>
      <Route path="/line" element={<LineComponents/>}/>
      <Route path="/pie" element={<PieComponent/>} />
      <Route path="Radar" element={<RadarComponent/>} />

    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
