import React from "react";
import logo from "../assets/logo.jpg";
import { LayoutDashboard, PlusCircle, ListChecks } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="bg-blue-200 m-5 h-[95%] rounded-[5px] max-h-screen overflow-y-hidden hidden md:block">
      <div className="p-2 flex items-center gap-1">
        <img src={logo} className="w-12 h-12 p-2 rounded-[50%]" alt="" />
        <h1 className="text-[20px] font-bold">
          <span className="text-blue-700">Y-</span>Trello
        </h1>
      </div>
      <ul className="mt-10 flex flex-col gap-10 p-5 font-bold">
        <li
          className={`flex gap-2 items-center ${
            current === "/dashboard"
              ? "text-white p-2 rounded-[5px] bg-blue-500"
              : ""
          }`}
        >
          <LayoutDashboard /> <Link to="/dashboard">Dashboard</Link>
        </li>
        {/*<li
          className={`flex gap-2 items-center ${
            current === "/dashboard_newBoard"
              ? "text-white p-2 rounded-[5px] bg-blue-500"
              : ""
          }`}
        >
          <PlusCircle /> <Link to="/dashboard_newBoard">New-Board</Link>
        </li>*/}
        <li
          className={`flex gap-2 items-center ${
            current === "/dashboard_card_details"
              ? "text-white p-2 rounded-[5px] bg-blue-500"
              : ""
          }`}
        >
          <ListChecks /> <Link to="dashboard_card_details">Card-Details</Link>
        </li>
      </ul>
      <div className=" p-3 mt-78 text-center text-[12px] opacity-75">
        {/*<div className=" w-[90%] h-[200px] bg-gray-600"></div>*/}© 2025
        YTrello — Tous droits réservés.
      </div>
    </div>
  );
};

export default Sidebar;
