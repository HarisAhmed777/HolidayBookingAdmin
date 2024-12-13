import React, { useContext } from 'react'
import { SidebarContext } from '../../context/SidebarContext';
import { AlignJustify } from 'lucide-react';

function Header() {
    const {toggleSidebar} = useContext(SidebarContext);
  return (
    <div>
        <div className='d-flex gap-5'>
        <AlignJustify style={{ cursor: 'pointer' }} onClick={toggleSidebar} /> 
        <a href="/starholadmin/admin"><p>Home</p></a>
        </div>

    </div>
  )
}

export default Header;