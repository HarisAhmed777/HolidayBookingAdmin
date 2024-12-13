import React from "react";
import Header from "./header";
import Menu from "./Menu";
import './alldatatable.css'
import { Link } from "react-router-dom";
function Alldatatable(){
    return(
        <>
        <Header/>
        <div className="content-wrapper">
            
            <Menu/>
            <div className="d-flex align-items-center justify-content-center gap-3 alldb">
            <Link to = '/allbookings'><button className="p-2 btn-primary ">Bookings</button></Link>
            <Link to = '/allusers'><button className="p-2 btn-primary ">Users</button></Link>
            <Link to = '/allforms'><button className="p-2 btn-primary ">Form Request</button></Link>
            </div>

        </div>
        
        </>
    )
}

export default Alldatatable;