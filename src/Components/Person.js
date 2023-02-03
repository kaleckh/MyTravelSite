import styles from "./Person.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./pieces/Header";

import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../Firebase";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
function Person() {
  const Navigate = useNavigate();
  const [tripLocation, setTripLocation] = useState("");
  const [people, setPeople] = useState([]);
  const [tripDates, setTripDates] = useState("");
  const [createTrip, setCreateTrip] = useState(true);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [isAddingTrip, setIsAddingTrip] = useState(false);
  const [isSettingDate, setIsSettingDate] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  const [tripCity, setTripCity] = useState("");
  const [tripState, setTripState] = useState("");
  const [email, setEmail] = useState("");
  const [value, onChange] = useState([new Date(), new Date()]);
  const handleSubmit = async (id, location, dates) => {
    try {
      let newTrip = await axios.post("http://localhost:3001/newtrip", {
        id: myId,
        location: tripLocation,
        dates: tripDates,
      });
      setMyTrips([...myTrips, newTrip.data[0]]);
      setIsAddingTrip(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   getAuth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       setEmail(auth.currentUser.email);
  //     } else {
  //       Navigate("/home");
  //     }
  //   });

  const logout = async () => {
    await signOut(auth);
  };

  let changedData = people.map((person) => {
    return {
      value: person.id,
      label: `${person.firstname}`,
    };
  });

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `http://localhost:3001/personTrips/${email}`,
  //   }).then((res) => {
  //     setPeople();
  //   });
  // }, []);

  return (
    <div className={styles.wholeScreen}>
      <Header
        home={"Home"}
        createTrip={"Create Trip"}
        myTrips={"My Trips"}
        myProfile={"My Profile"}
      />
      <div className={styles.container}>
        <div className={styles.title}>Where do you wanna go?</div>
        <input type="text"  />
      </div>
    </div>
  );
}

export default Person;
