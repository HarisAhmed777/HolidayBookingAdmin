import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Logo from '../../public/Logo.png';

function Menu() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('sidebar-open', !isSidebarOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <>
      <aside className={`main-sidebar sidebar-dark-primary custom-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="d-flex justify-content-center">
        <Link to="/starholadmin/" className="brand-link">
          <img src={Logo} alt="Star Holidays Logo" className="brand-image" style={{ opacity: '0.8', height: '50px', width: '50px' }} />
          <span className="brand-text font-weight-light">Star Holidays</span>
        </Link>
        <button className="btn btn-sidebar-toggle" onClick={toggleSidebar}>
              <i className={`fas dnn fa-${isSidebarOpen ? 'times':"times"}`} />
            </button>
        </div>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <Link to="/starholadmin/" className="d-block adm">Sample</Link>
            </div>
          </div>
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link to="/starholadmin/admin" className="nav-link  lii">
                  <i className="fas fa-tachometer-alt" />
                  <p className="ms-2">Dashbard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/starholadmin/CalenderPage" className="nav-link">
                  <i className="fas fa-calendar-alt" />
                  <p className="ms-2">Calendar</p>
                </Link>
              </li>
              <li className="nav-item">
  <Link to="/starholadmin/allbookings" className="nav-link">
    <i className="fas fa-calendar-check" />
    <p className="ms-2">Booking Page</p>
  </Link>
</li>
<li className="nav-item">
  <Link to="/starholadmin/allusers" className="nav-link">
    <i className="fas fa-users" />
    <p className="ms-2">Users Page</p>
  </Link>
</li>
<li className="nav-item">
  <Link to="/starholadmin/allforms" className="nav-link">
    <i className="fas fa-file-alt" />
    <p className="ms-2">Form Request</p>
  </Link>
</li>

              <li className="nav-item">
  <Link to="/starholadmin/offers" className="nav-link">
    <i className="fas fa-tags" />
    <p className="ms-2">Offers</p>
  </Link>
</li>
<li className="nav-item">
  <Link to="/starholadmin/blogpage" className="nav-link">
    <i className="fas fa-pen" />
    <p className="ms-2">Add Blog</p>
  </Link>
</li>
<li className="nav-item">
  <Link to="/starholadmin/allblogs" className="nav-link">
    <i className="fas fa-book" />
    <p className="ms-2">Blogs</p>
  </Link>
</li>
<li className="nav-item">
  <Link to="/starholadmin/packageaddpage" className="nav-link">
    <i className="fas fa-box-open" />
    <p className="ms-2">Add Packages</p>
  </Link>
</li>
<li className="nav-item">
  <Link to="/starholadmin/allpackages" className="nav-link">
    <i className="fas fa-boxes" />
    <p className="ms-2">All Packages</p>
  </Link>
</li>
<li className="nav-item">
  <Link to="/starholadmin/logout" className="nav-link">
    <i className="fas fa-sign-out-alt" />
    <p className="ms-2">Logout</p>
  </Link>
</li>

            </ul>
            
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Menu;
