import React, { useContext } from 'react'
import { SidebarContext } from '../../context/SidebarContext'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../header/header'
import Cards from '../Cards/Cards';
import UICharts from '../Cards/UiCharts';
function AdminHomePage() {
    const {isSidebarVisible} = useContext(SidebarContext);
  return (
    <div className='d-flex'>
        <Sidebar/>
        <div
        className='flex-grow-1'
        style={{
          marginLeft: isSidebarVisible ? '0px' : '-165px',
          transition: 'margin-left 0.3s ease',
          width: '100%',
        }}
        >
            <Header/>
            <div className='overflow-hidden'>
                <Cards/>
                <UICharts/>
            </div>
        </div>
    </div>
  )
}

export default AdminHomePage