import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
const {user} = useSelector((state) => state.user);
const location = useLocation();
const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  //******************doctor menu*******************

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    
    {
      name: "Profile",
      path: `/doctor/profile/${user&&user._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  //******************doctor menu*******************
  

  // redering menu list
  const Sidebarmenu = user&&user.isAdmin ? adminMenu: user&&user.isDoctor?doctorMenu:userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>AppointCare</h6>
              <hr />
            </div>
            <div className="menu">
              {Sidebarmenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style ={{cursor:"pointer"}}>

                <Badge count={user && user.notification && user.notification.length} onClick={()=>{navigate("/notification")}}  >
                  
                    <i  class="fa-solid fa-bell fa-2xl icon-color "></i>
                </Badge>
                {user && <Link to={`/doctor/profile/${user._id}`}>{user.name}</Link>}

              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;