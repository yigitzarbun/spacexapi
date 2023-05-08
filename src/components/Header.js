import React from "react";
import { Link, NavLink } from "react-router-dom";
function Header(props) {
  return (
    <div className="flex justify-between items-center xl:flex-col xl:text-center">
      <NavLink to="/">
        <h1 className="text-blue-400 font-bold text-4xl italic hover:text-slate-300 ">
          SpaceX Launches
        </h1>
      </NavLink>
      <div>
        <nav className="flex items-center justify-between">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "text-xl p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Latest
          </NavLink>
          <NavLink
            to="/past"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "text-xl p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Past
          </NavLink>
          <NavLink
            to="/future"
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "text-xl p-2 font-bold cursor-pointer hover:bg-gradient-to-r from-sky-500 to-indigo-500 hover:rounded-md hover:text-white"
            }
          >
            Future
          </NavLink>
        </nav>
        <NavLink
          to="/all"
          className={({ isActive }) =>
            isActive
              ? "active-link-searchAll"
              : "italic text-sm hover:text-blue-400 flex-inline p-2"
          }
        >
          Search in all launches
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
