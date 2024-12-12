import React from "react";
import "./event.css";
import Share from "../../components/share/Share";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import PropertyList from "../../components/propertyList/PropertyList";
import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar";
import Featured from "../../components/featured/Featured";
import io from "socket.io-client";
import { useContext, useEffect,useState } from "react";
import { getAllEvents } from "../../api/EventRequests";

  


 
const Event = () => {
    const [event ,setEvent] = useState({});

    useEffect(() => {
    
        async function fetchUser() {
          const response = await fetch(`http://localhost:5000/events`);
          const data = await response.json();
          console.log(data);
          setEvent(data);
        }
    
        //fetchUser();
      });
    return (
        <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6, paddingTop: "20px" }}>
       
      
            <div>


                <div className="homeContainer">
                    <Featured />
                    <h1 className="homeTitle">Browse by property type</h1>
                    <PropertyList />
                    <h1 className="homeTitle">Homes guests love</h1>
                    <FeaturedProperties />


                </div>
            </div>

            </div>
        </div>


    );
};

export default Event;
