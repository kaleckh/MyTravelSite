import styles from "./Trip.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/pieces/Header";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";

function Trip() {
  const Navigate = useNavigate();

  const [myInfo, setMyInfo] = useState([]);
  const [myTrip, setMyTrip] = useState([]);
  const [myId, setMyId] = useState("");
  const { id } = useParams();
  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/trip/${id}`,
    }).then((res) => {
      console.log(res);
      setMyTrip(res.data[0], "first then");
      axios({
        method: "get",
        url: `http://localhost:3001/person/${auth.currentUser.email}`,
      }).then((res) => {
        setMyInfo(res.data);
      });
    });
  }, []);

  return (
    <div>
      <Header
        home={"Home"}
        createTrip={"Create Trip"}
        myTrips={"My Trips"}
        myProfile={"My Profile"}
      />
      <div className={styles.tripMainContainer}>
        <div className={styles.leftTripContainer}>
          <div className={styles.personaltriptitle}>{myTrip.trip_location}</div>
          <div className={styles.personaltripdate}>{myTrip.trip_dates}</div>
          <img className={styles.tripImage} alt="" />
        </div>
        <div className={styles.rightTripContainer}>
          <div className={styles.daysTill}>
            <div className={styles.daysTillText}>days till</div>
            <div className={styles.daysTillNumber}>200</div>
          </div>
          <div className={styles.boxContainer}>
            <div className={styles.smallerTitle}>Whose Coming</div>
            <div className={styles.tripbox} />
            <div className={styles.smallerTitle}>Flights</div>
            <div className={styles.tripbox} />
            <div className={styles.smallerTitle}>Housing</div>
            <div className={styles.tripbox} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trip;
