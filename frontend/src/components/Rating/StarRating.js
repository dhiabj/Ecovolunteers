import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";
import Swal from "sweetalert2";
import axios from "axios";

export default function StarRating(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [evid, SetEvid] = useState();
  const [userid, setUserid] = useState();

  const rate = (ratingValue) => {
    setRating(ratingValue);
    SetEvid(props.evid);
    setUserid(props.userid);
    axios
      .post(`http://localhost:5000/events/rating`, {
        rating: rating,
        evid,
        userid,
      })
      .then((response) => {
        //setparticipation(response.data)
        console.log(evid, userid, rating);
        Swal.fire("Success", "Your rating is saved", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => rate(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={50}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
