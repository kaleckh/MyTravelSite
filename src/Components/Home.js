import "./Home.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import Header from "./pieces/Header";

function Home() {
  const Navigate = useNavigate();
  const [tripLocation, setTripLocation] = useState("");
  const [people, setPeople] = useState([]);
  const [tripDates, setTripDates] = useState("");
  const [createTrip, setCreateTrip] = useState(true);
  //   const [profileToggle, setProfileToggle] = useState(false);
  const [isSettingLocation, setIsSettingLocation] = useState(false);

  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  //   const { email, setEmail } = useContext(UserContext);

  // const handleSubmit = async (id, location, dates) => {
  //   try {
  //     let newTrip = await axios.post("http://localhost:3001/newtrip", {
  //       id: myId,
  //       location: tripLocation,
  //       dates: tripDates,
  //     });
  //     setMyTrips([...myTrips, newTrip.data[0]]);
  //     setIsAddingTrip(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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
  //     url: `http://localhost:3001/personTrips/${auth.currentUser.displayName}`,
  //   }).then((res) => {
  //     setCreateTrip(res.data);
  //   });
  // }, []);

  return (
    <div className="full">
      <div className="wholeScreen">
        <Header />
        <div className="mainContainer">
          <div className="mainBox">
            <div className="title">Where do you want to go?</div>
            <Select
              className="mainInput"
              options={changedData}
              onChange={(obj) => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
