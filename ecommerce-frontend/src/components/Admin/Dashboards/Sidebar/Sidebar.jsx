import React from "react";
import { NavLink } from "react-router-dom";
import { FaThLarge, FaBoxOpen, FaShoppingBag, FaClipboardList } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h3 className="sidebar-title">Panneau Admin</h3>
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            <FaThLarge className="sidebar-icon" />
            <span>Tableau de bord</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/categories"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            <FaBoxOpen className="sidebar-icon" />
            <span>Gérer les catégories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/products"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            <FaShoppingBag className="sidebar-icon" />
            <span>Produits</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/orders"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            <FaClipboardList className="sidebar-icon" />
            <span>Commandes</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
