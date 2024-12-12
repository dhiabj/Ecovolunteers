import React, { useContext } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect,useState } from "react";
import axios from "axios";
import "./calendar.css"
import LeftBar from "../../components/leftBar/LeftBar";
import AuthContext from "../../context/AuthContext";

function Calendar() {
      const [events, setEvents] = useState([]);
      const { auth } = useContext(AuthContext);
        // const events = [
  //   {
  //     title: "The Title",
  //     start: "2023-01-05T08:00:00",
  //     end: "2023-01-05T09:00:00",
  //   },
  //   {
  //     title: "The Title",
  //     start: "2023-03-05T08:00:00",
     
  //   },
  // ];
  useEffect(() => {
    axios.post(`http://localhost:5000/events/getparticipbyuseridd`, { userid: auth._id })
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
  return (

    <div style={{ display: "flex" }}>
    <LeftBar />
    <div style={{ flex: 6, paddingTop: "20px",marginRight:"40px" }}>

    
      
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
        events={events}
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
           
            content:
              "Your event title:"+info.event.title+"<br/>",
            html: true,
          });
        }}
      />
    </div>
    </div>
  );
}

export default Calendar;