"use client";

import React from "react";
import "./layout.css";

// Layout principal con header y sidebar
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-container">
      <div className="main-header">
        <div className="logo">
          <img src="/iso-logo.png" alt="logo" style={{ height: "40px" }} />
        </div>
        <i className="pi pi-cog" style={{ fontSize: "1rem" }}></i>
      </div>
      <div className="main-layout">
        <div className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li>
                <a href="#">
                  <i className="pi pi-home"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="pi pi-users"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="pi pi-box"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="pi pi-chart-bar"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="pi pi-cog"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <main className="content">
          <div className="content-body">{children}</div>
        </main>
      </div>
    </div>
  );
}
