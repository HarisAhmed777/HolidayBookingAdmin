import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import Header from "./Header";
// import Menu from "./Menu";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";

function CalendarComponent() {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        },
        events: [
          {
            title: "Event 1",
            start: "2024-07-15",
          },
          {
            title: "Event 2",
            start: "2024-07-16",
          },
        ],
      });

      calendar.render();
    }
  }, []);

  return (
    <>
      {/* <Header /> */}
      {/* <Menu /> */}
      <div className="">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>FullCalendar</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">FullCalendar</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card bg-gradient-succss">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="far fa-calendar-alt" />
                      Calendar
                    </h3>
                    <div className="card-tools">
                      <div className="btn-group">
                        <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
                          <i className="fas fa-bars" />
                        </button>
                        <div className="dropdown-menu" role="menu">
                          <a href="#" className="dropdown-item">Add new event</a>
                          <a href="#" className="dropdown-item">Clear events</a>
                          <div className="dropdown-divider" />
                          <a href="#" className="dropdown-item">View calendar</a>
                        </div>
                      </div>
                      <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                        <i className="fas fa-minus" />
                      </button>
                      <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div id="calendar" ref={calendarRef} style={{ width: '100%' ,height:"100%"}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CalendarComponent;
