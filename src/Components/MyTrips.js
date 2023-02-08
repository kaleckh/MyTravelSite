import React, { useState, useEffect } from "react";
import styles from "./MyTrips.module.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { async } from "@firebase/util";
import Header from "./pieces/Header";

function MyTrips() {
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  const [tripLocation, setTripLocation] = useState("");
  const [tripState, setTripState] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [isAddingTrip, setIsAddingTrip] = useState(true);
  const [isSettingDate, setIsSettingDate] = useState(false);
  const [isDeletingTrip, setIsDeletingTrip] = useState(false);
  const [value, onChange] = useState([new Date(), new Date()]);
  const [startDate, setStartDate] = useState(value[0]);
  const [endDate, setEndDate] = useState(value[1]);
  const Navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const logout = async () => {
    await signOut(auth);
  };
  localStorage.setItem(`userEmail`, `${auth.currentUser.email}`)

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/person/${auth.currentUser.email}`,
    }).then((res) => {
      setMyId(res.data[0].id);
      axios({
        method: "get",
        url: `http://localhost:3001/personTrips/${res.data[0].id}`,
      }).then((res) => {
        setIsLoading(false);
        setMyTrips(res.data);
      });
    });
  }, []);
  useEffect(() => {
    changeDateFormat();
  }, [value]);

  const handleSubmit = async () => {
    try {
      let newTrip = await axios.post(`http://localhost:3001/newtrip`, {
        person_id: myId,
        triplocation: tripLocation,
        tripstartdate: startDate,
        tripenddate: endDate,
        tripstate: tripState,
      });

      setMyTrips([...myTrips, newTrip.data[0]]);
      setIsAddingTrip(false);
    } catch (error) {
      console.log(error.message);
    }
  };
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
  const closeMenu = () => {
    setIsDeletingTrip(false);
  };

  
  const regularStartDate = new Date(startDate).toLocaleDateString();
  const regularEndDate = new Date(endDate).toLocaleDateString();

  const changeDateFormat = () => {
    for (let i = 0; i < 2; i++) {
      let day = value[i].getDate();
      let month = value[i].getMonth();
      let year = value[i].getFullYear();
      let fullYear = `${year}/${month + 1}/${day}`;
      if (i === 0) {
        setStartDate(
          fullYear.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      } else {
        setEndDate(fullYear);
      }
    }
  };

  return (
    <div
      onClick={() => {
        closeMenu();
      }}
    >
      {isAddingTrip &&
        (isLoading ? (
          <div className={styles.myTripsWholeScreen}>
            <div className={styles.tripContainer}>
              <div>Loading</div>
            </div>
          </div>
        ) : (
          <div className={styles.wholeScreen}>
            <Header
              home={"Home"}
              createTrip={"Create Trip"}
              myTrips={"My Trips"}
              myProfile={"My Profile"}
              out={"Logout"}
              id={myId}
            />
            <div className={styles.tripContainer}>
              <div className={styles.title}>CURRENT TRIPS</div>
              {myTrips.length === 0 ? (
                <div>
                  <div className={styles.bigTags}>
                    Oops looks like you have no trips!
                  </div>
                </div>
              ) : (
                <div>
                  {myTrips.map((trip) => {
                    return (
                      <div className={styles.myTripsContainer}>
                        <div className={styles.tripBox}>
                          <div
                            onClick={() => {
                              Navigate(`/trip/${trip.id}`);
                            }}
                            className={styles.tripLocation}
                          >
                            <div className={styles.text}>
                              {trip.triplocation}
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              Navigate(`/trip/${trip.id}`);
                            }}
                            className={styles.tripDate}
                          >
                            <div className={styles.text}>
                              {trip.regularStartDate} - {trip.regularEndDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div
                onClick={() => {
                  setIsSettingLocation(true);
                  setIsAddingTrip(false);
                }}
                className={styles.tripLocation}
              >
                + NEW TRIP
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
export default MyTrips;
