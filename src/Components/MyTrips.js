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
import DeleteButton from "./pieces/DeleteButton";

function MyTrips() {
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  const [tripLocation, setTripLocation] = useState("");
  const [tripState, setTripState] = useState("");
  const [tripCity, setTripCity] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [isAddingTrip, setIsAddingTrip] = useState(true);
  const [isDeletingTrip, setIsDeletingTrip] = useState(false);
  const [value, onChange] = useState([new Date(), new Date()]);
  const [startDate, setStartDate] = useState(value[0]);
  const [endDate, setEndDate] = useState(value[1]);
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState("");
  const Navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/person/${localStorage.getItem("userEmail")}`,
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
        description: description,
      });

      setMyTrips([...myTrips, newTrip.data[0]]);
      setIsAdding(false);
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
            month: "long",
            day: "numeric",
          })
        );
      } else {
        setEndDate(fullYear);
      }
    }
  };
  const changeFormat = (isoDate) => {
    const regularDate = new Date(isoDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    return regularDate;
  };

  console.log(myTrips);
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
              toggleMenu={() => {
                setIsAdding(!isAdding);
              }}
            />
            <div className={styles.tripContainer}>
              {isAdding ? (
                <div className={styles.title}>Create Trip</div>
              ) : (
                <div className={styles.title}>CURRENT TRIPS</div>
              )}

              {myTrips.length === 0 ? (
                <div>
                  <div className={styles.bigTags}>
                    Oops looks like you have no trips!
                  </div>
                </div>
              ) : (
                <div>
                  {isAdding ? (
                    <div
                      className={`${styles.createTripContainer} ${styles.blur}`}
                    >
                      <div className={styles.halfTripContainer}>
                        <div className={styles.blueBoxWords}>
                          Start your journey with us
                        </div>
                        <div className={styles.smallBlueBoxWords}>
                          Join our community of thousands
                        </div>
                        <div>A quote would go here</div>
                      </div>

                      <div className={styles.otherHalfContainer}>
                        <div
                          onClick={() => {
                            setIsAdding(!isAdding);
                          }}
                          className={styles.x}
                        >
                          x
                        </div>
                        <div className={styles.backWrapper}></div>
                        <div className={styles.createTripInputContainer}>
                          <div className={styles.myTripInputContainer}>
                            <div>city</div>
                            <input
                              className={styles.createTripInput}
                              placeholder="City"
                              onChange={(event) => {
                                setTripLocation(event.target.value);
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
                        <input
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                          className={styles.tripInfo}
                        />
                        <button
                          className={styles.createButton}
                          onClick={() => {
                            handleSubmit().then(() => {
                              setIsAdding(false);
                            });
                          }}
                        >
                          Next!
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {myTrips.map((trip) => {
                        return (
                          <div className={styles.myTripsContainer}>
                            <div className={styles.tripBox}>
                              <div className={styles.tripLocation}>
                                <div
                                  onClick={() => {
                                    Navigate(`/trip/${trip.id}`);
                                  }}
                                  className={styles.location}
                                >
                                  {trip.triplocation}
                                </div>
                                <div className={styles.location}>
                                  {trip.tripstate}
                                </div>
                              </div>
                              <div className={styles.tripDate}>
                                <div className={styles.dateContainer}>
                                  <div className={styles.dates}>
                                    {changeFormat(trip.tripstartdate)}
                                  </div>
                                  <div>-</div>
                                  <div className={styles.dates}>
                                    {changeFormat(trip.tripenddate)}
                                  </div>
                                  <button> Delete</button>
                                </div>
                              </div>
                              
                            </div>
                            
                          </div>
                          
                        );
                      })}
                      
                    </>
                  )}
                </div>
                
              )}
              <DeleteButton deletingTrip={() => {setIsDeletingTrip(!isDeletingTrip)}}/>
            </div>
          </div>
        ))}
    </div>
  );
}
export default MyTrips;
