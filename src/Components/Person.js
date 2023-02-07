import styles from "./Person.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./pieces/Header";
import SearchBar from "./pieces/SearchBar";

import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { auth } from "./Firebase";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
function Person() {
  const Navigate = useNavigate();
  const [tripLocation, setTripLocation] = useState("");
  const [people, setPeople] = useState([]);
  const [tripDates, setTripDates] = useState("");
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [isSettingDate, setIsSettingDate] = useState(false);
  const [isAddingTrip, setIsAddingTrip] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  const [value, onChange] = useState([new Date(), new Date()]);
  const [tripCity, setTripCity] = useState("");
  const [tripState, setTripState] = useState("");
  const [trips, setTrips] = useState([]);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
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
  const formattedDate = tripDates.toLocaleString("en,US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let changedData = people.map((person) => {
    return {
      value: person.id,
      label: `${person.firstname}`,
    };
  });
  const handleFilter = () => {
    axios({
      method: "get",
      url: `http://localhost:3001/trips`,
    }).then((res) => {
      setTrips(res.data);
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/trips`,
    }).then((res) => {
      setTrips(res.data);
    });
  }, []);

  console.log(params);

  return (
    <>
      <div className={styles.wholeScreen}>
        <Header
          home={"Home"}
          createTrip={"Create Trip"}
          myTrips={"My Trips"}
          myProfile={"My Profile"}
          out={"Logout"}
          toggleMenu={() => {
            setIsAddingTrip(!isAddingTrip);
          }}
        />
        {isAddingTrip ? (
          <div className={styles.createTripContainer}>
            <div className={styles.halfTripContainer}>
              <div className={styles.blueBoxWords}>
                Start your journey with us
              </div>
              <div className={styles.smallBlueBoxWords}>
                Join our community of thousands
              </div>
            </div>

            <div className={styles.otherHalfContainer}>
              <div
                onClick={() => {
                  setIsSettingLocation(false);
                  setIsAddingTrip(true);
                }}
                className={styles.x}
              >
                x
              </div>
              <div className={styles.backWrapper}>
                {/* <button
                    onClick={() => {
                      setIsAddingTrip(true);
                      setIsSettingLocation(false);
                    }}
                    className="back"
                  >
                    back
                  </button> */}
              </div>
              <div className={styles.createTripInputContainer}>
                <div className={styles.myTripInputContainer}>
                  <div>city</div>
                  <input
                    className={styles.createTripInput}
                    placeholder="City"
                    onChange={(event) => {
                      setTripCity(event.target.value);
                    }}
                    type="text"
                  />
                </div>
                <div>
                  <div>State/Country</div>
                  <input
                    onChange={(event) => {
                      setTripState(event.target.value);
                    }}
                    placeholder="State/Country"
                    type="text"
                    className={styles.createTripInput}
                  />
                </div>
              </div>
              <DateRangePicker
                onChange={onChange}
                value={value}
                className={styles.datePicker}
              />
              <input className={styles.tripInfo} />
              <button
                className={styles.createButton}
                onClick={() => {
                  Promise.all([handleSubmit(), setIsSettingDate(false)]).then(
                    () => {
                      setIsAddingTrip(true);
                    }
                  );
                }}
              >
                Next!
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.title}>Where do you wanna go?</div>
            <SearchBar trips={trips} />
          </div>
        )}
      </div>
      <div className={styles.secondContainer}>
        <div className={styles.title}>Who are we?</div>
        <div>
          <div className={styles.paragraph}>
            A platform focused on connecting travellers
          </div>
        </div>
      </div>
    </>
  );
}

export default Person;
