import React, { useState, useEffect } from "react";
import "./MyProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./pieces/Header";

function MyProfile() {
  const [profileToggle, setProfileToggle] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");

  const [tripLocation, setTripLocation] = useState("");
  const [tripDates, setTripDates] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [isAddingTrip, setIsAddingTrip] = useState(true);
  const [isSettingDate, setIsSettingDate] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const Navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/person/${auth.currentUser.email}`,
    }).then((res) => {
      setFirstName(res.data[0].firstname);
      setLastName(res.data[0].lastname);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      let deleteTrip = await axios.delete(
        `http://localhost:3001/deletetrip/${id}`,
        {}
      );
      setMyTrips(myTrips.filter((trip) => trip.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header
        home={"Home"}
        createTrip={"Create Trip"}
        myTrips={"My Trips"}
        myProfile={"My Profile"}
      />
      <div className={profileWholeScreen}>
        <div className={leftProfileContainer}>
          <div className={profileTitle}>{firstName}</div>
          <div className={profileTitle}>{lastName}</div>
          <div>
            <div className={profileItem}>{auth.currentUser.email}</div>
            <div className={profileItem}>Insta: </div>
            <div className={profileItem}>
              Bio: Looking to travel and meet new friends
            </div>
            <div className={profileItem}>3 Trips Taken</div>
            <button className={profileItem}>Send Message</button>
          </div>
        </div>
        <div className={rightProfileContainer}>
          <div>
            <div className={mainImageContainer}>
              <img
                className={mainImage}
                src={require("../photos/kidsFace.jpg")}
                alt=""
              />
              <div className={topImagesContainer}>
                <img
                  className={smallImage}
                  src={require("../photos/kidsFace.jpg")}
                  alt=""
                />
                <img
                  className={smallImage}
                  src={require("../photos/kidsFace.jpg")}
                  alt=""
                />
              </div>
            </div>
            <div className={smallImageContainer}>
              <img
                className={smallImage}
                src={require("../photos/kidsFace.jpg")}
                alt=""
              />
              <img
                className={smallImage}
                src={require("../photos/kidsFace.jpg")}
                alt=""
              />
              <img
                className={smallImage}
                src={require("../photos/kidsFace.jpg")}
                alt=""
              />
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
export default MyProfile;
