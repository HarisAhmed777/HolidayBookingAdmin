import React, { useContext ,useRef,useEffect,useState} from 'react';
import { User } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { BookCopy } from 'lucide-react';
import { BookText } from 'lucide-react';
import { BadgeIndianRupee } from 'lucide-react';
import { Logs } from 'lucide-react';
import { BadgePlus } from 'lucide-react';
import { Package } from 'lucide-react';
import { PackagePlus } from 'lucide-react';
import { LogOut } from 'lucide-react';
import styles from './sidebar.module.css';
import Logo from '/Logo.png';
import smallLogo from '/Logo.png';
import { Tickets } from 'lucide-react';
import { SidebarContext } from '../../context/SidebarContext';
import {Link} from 'react-router-dom'

function Sidebar() {
  const sidebarRef = useRef(null);
  const [sidebarHeight, setSidebarHeight] = useState(window.innerHeight);
    const { isSidebarVisible } = useContext(SidebarContext);
    const [isUsersListOpen, setIsUsersListOpen] = useState(false);
  
   // Function to update sidebar height dynamically
   const updateSidebarHeight = () => {
    // Calculate the height considering both window height and scroll
    const newHeight = window.innerHeight + window.scrollY;
    setSidebarHeight(newHeight);
  };

  useEffect(() => {
    // Set initial height
    if (sidebarRef.current) {
      sidebarRef.current.style.height = `${window.innerHeight}px`;
    }

    // Listen for window resize and scroll events
    window.addEventListener('resize', updateSidebarHeight);
    window.addEventListener('scroll', updateSidebarHeight);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('resize', updateSidebarHeight);
      window.removeEventListener('scroll', updateSidebarHeight);
    };
  }, []);

  useEffect(() => {
    // Update the height whenever the window is resized or scrolled
    if (sidebarRef.current) {
      sidebarRef.current.style.height = `${sidebarHeight}px`;
    }
  }, [sidebarHeight]);
    const toggleUsersList = () => {
      setIsUsersListOpen(!isUsersListOpen);
    };
  
    return (
      <>
        <div  ref={sidebarRef} className={`bg-dark text-white ${styles.sidebar}`}
        style={{
          transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-70%)',
          transition: 'transform 0.3s ease',
          width:'250px'
        }}>
        <div className={isSidebarVisible?'mt-2':styles.border}>
        <img 
  src={isSidebarVisible ? Logo : smallLogo} 
  className={isSidebarVisible ? styles.logo : styles.smalllogo } 
  alt=" Logo" 
/>
        </div>
        <Link to = '/starholadmin/admin'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <LayoutDashboard className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Dashboard</p>
        </div>
        </Link>
       
        <Link to = '/starholadmin/CalenderPage'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <Calendar className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Calender</p>
        </div>
        </Link>
        <Link to = '/starholadmin/allbookings'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <BookCopy className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Booking Page</p>
        </div>
        </Link>
        <Link to = '/starholadmin/allusers'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <User className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Users Profile</p>
        </div>
        </Link>
        <Link to = '/starholadmin/allforms'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <BookText className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Form Request</p>
        </div>
        </Link>
        <Link to = '/starholadmin/offers'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <BadgeIndianRupee className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Offers</p>
        </div>
        </Link>
        <Link to = '/starholadmin/blogpage'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <Logs className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Add Blog</p>
        </div>
        </Link>
        <Link to = '/starholadmin/allblogs'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <BadgePlus className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Blogs</p>
        </div>
        </Link>
        <Link to = '/starholadmin/packageaddpage'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <PackagePlus className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Add Packages</p>
        </div>
        </Link>
        <Link to = '/starholadmin/allpackages'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <Package className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>All Packages</p>
        </div>
        </Link>
        <Link to = '/starholadmin/riseticket'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <Tickets className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Rise Tickets</p>
        </div>
        </Link>
        <Link to = '/starholadmin/logout'>
        <div className={`${isSidebarVisible?'d-flex mt-3':'text-end mt-3'}`}>
          <div className={`${isSidebarVisible? '': ''}`}>
          <LogOut className={`m-2 ${styles.icon} ${isSidebarVisible?'':'me-4'}`}/>
          </div>
          <p className={` ${isSidebarVisible? 'mt-1' :'d-none'} ${styles.onhover}`}>Logout</p>
        </div>
        </Link>
        
        
        
      </div>
      </>
    );
  }
  
  export default Sidebar;
