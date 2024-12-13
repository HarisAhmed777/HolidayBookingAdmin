import React, { useEffect,useState,useContext } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import Sidebar from './Sidebar/Sidebar'
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalenderPage.css"; 
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { baseUrl } from "../baseUrl";
import Header from './header/header';

const localizer = momentLocalizer(moment);

function CalenderPage() {
    const {isSidebarVisible} = useContext(SidebarContext);
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseUrl}/allbookings`);
          const bookings = response.data.map((booking) => ({
            id: booking._id,
            title: `${booking.name} - ${booking.city}`,
            start: new Date(booking.startdate),
            end: new Date(booking.enddate),
          }));
          setData(bookings);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
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
            <div className='d-flex justify-content-center'>
            <Calendar
          localizer={localizer}
          events={data}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, width: "80%" }}
          className="custom-calendar" // Custom CSS class
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: "#4caf50", // Custom background color
              borderRadius: "5px",
              color: "white",
              border: "none",
              padding: "5px",
            },
          })}
        /> 
            </div>
        </div>
    </div>
  )
}

export default CalenderPage;