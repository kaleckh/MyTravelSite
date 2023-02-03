import styles from "./Home.module.css";
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
  const [homeScreen, sethomeScreen] = useState(true);
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
    <div className={styles.full}>
      <div className={styles.wholeScreen} >
        {homeScreen ? (
          <>
            <Header />
            <div className={styles.mainContainer}>
              <div className={styles.mainBox}>
                <div className={styles.homeTitle}>
                  Meet cool people and travel the world
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={() => {
                      sethomeScreen(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      sethomeScreen(false);
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={`${styles.loginContainer} ${styles.blur}`}>
            <div className={styles.loginPage}>
              <div className={styles.leftSideInput}></div>
              <div className={styles.inputContainer}>
                <div className={styles.words}>Welcome</div>
                <div className={styles.row}>
                  <input placeholder="first name" type="text" />
                  <input placeholder="last name" type="text" />
                </div>
                <input placeholder="email" type="text" />
                <input placeholder="password" type="text" />
                <input placeholder="confirm password" type="text" />
                <div>
                  <button className={styles.color} onClick={() => {Navigate('/person/:money')}}>Register</button>
                  <button className={styles.color}>Login instead</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
