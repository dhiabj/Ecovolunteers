import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import ToggleContext from '../../context/ToggleContext';
import './sidebar.scss';
import { SidebarList } from './SidebarList.js';

const Sidebar = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const { isOpen } = useContext(ToggleContext);

  return (
    <div className="d-flex">
      <div className="sidebar" style={{ marginLeft: isOpen ? '-300px' : null }}>
        <div className="admin-welcome">
          <img
            src={`http://localhost:5000/uploads/${auth.img}`}
            alt="pfp"
            className="admin-pfp mb-3"
          />
          <div className="welcome">
            Welcome,{' '}
            <span style={{ fontWeight: 'bold' }}>
              {auth.firstname} {auth.lastname}
            </span>
            <div className="role-text">Admin</div>
          </div>
        </div>
        <div className="nav-title">Navigation</div>
        <ul className="sidebarlist">
          {SidebarList.map((list, key) => {
            return (
              <li key={key}>
                <NavLink
                  to={list.link}
                  className="list-item"
                  activeClassName="active"
                >
                  <div className="item-icon">
                    <i className={list.icon}></i>
                  </div>
                  <div className="item-title">{list.title}</div>
                </NavLink>

              </li>
            );
          })}
        </ul>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Sidebar;
