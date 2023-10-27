import React, { useRef } from "react";

import { RxDashboard } from "react-icons/rx";
import { MdPieChart, MdBarChart } from "react-icons/md";
import { BiDoughnutChart, BiRadar } from "react-icons/bi";
import { VscGraphLine } from "react-icons/vsc";
import { PiChartPolarBold } from "react-icons/pi";
import { AiOutlineMenu } from "react-icons/ai";

import "./sidebar.css";

const SideBar = ({ themeColor }) => {
  const mobileSidebarNav = useRef(null);

  const mobileMenuShow = (e) => {
    e.preventDefault();

    mobileSidebarNav.current.classList.toggle("dashboard-sidebar-nav-show");
  };
  return (
    <div className="dashboard-sidebar vh-md-100">
      <div className="row">
        <div className="col-md-12 py-3 mobile-sidebar-nav">
          <div className="dashboard-logo pr-center">
            <RxDashboard />
            &nbsp;
            <span>
              My<strong className="dash-logo-color">Dashboard</strong>
            </span>
          </div>
          <div className="ham-btn" onClick={(e) => mobileMenuShow(e)}>
            <AiOutlineMenu />
          </div>
        </div>
        <div
          className={`col-md-12 dashboard-sidebar-nav dashboard-sidebar-nav-${themeColor}`}
          ref={mobileSidebarNav}
        >
          <ul className="navbar">
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/bar">
                <MdBarChart /> &nbsp; &nbsp;<span>Bar Graph</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/doughnut">
                <BiDoughnutChart /> &nbsp; &nbsp;<span>Doughnut Graph</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/line">
                <VscGraphLine /> &nbsp; &nbsp;<span>Line Graph</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000">
                <MdPieChart /> &nbsp; &nbsp;<span>Pie Graph</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000">
                <PiChartPolarBold /> &nbsp; &nbsp;<span>Polar graph</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000">
                <BiRadar /> &nbsp; &nbsp;<span>Radar Graph</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
