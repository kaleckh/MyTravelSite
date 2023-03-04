import styles from "./Person.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./pieces/Header";
import SearchBar from "./pieces/SearchBar";
import { Arrow } from "./Media/Arrow";
import homePhoto from "./Media/homebottm.jpg";

import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { auth } from "./Firebase";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Search } from "./Media/Search";
import { Audio } from "react-loader-spinner";
const { REACT_APP_URL } = process.env;
function Person() {
  const Navigate = useNavigate();
  const [tripLocation, setTripLocation] = useState("");
  const [people, setPeople] = useState([]);
  const [tripDates, setTripDates] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  const [isAddingTrip, setIsAddingTrip] = useState(false);
  const [value, onChange] = useState([new Date(), new Date()]);

  const [tripState, setTripState] = useState("");
  const [trips, setTrips] = useState([]);
  const [description, setDescription] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState([]);

  const localEmail = localStorage.getItem("userEmail");

  const handleSubmit = async (id, location, dates) => {
    try {
      let newTrip = await axios.post("/newtrip", {
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
      url: `${REACT_APP_URL}/trips`,
    }).then((res) => {
      setTrips(res.data);
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `${REACT_APP_URL}/trips`,
    }).then((res) => {
      setTrips(res.data);
    });
  }, []);
  useEffect(() => {
    if (trips.length > 0) {
      axios({
        method: "get",
        url: `${REACT_APP_URL}/person/${localStorage.getItem("userEmail")}`,
      }).then((res) => {
        setMyId(res.data[0].id);
        setIsConnected(true);
      });
    }
  }, [trips]);

  useEffect(() => {
    if (isConnected) {
      setIsLoading(false);
    }
  }, [isConnected]);

  console.log(trips, "these are my trips");

  return (
    <>
      <div className={styles.wholeScreen}>
        <Header
          home={"Home"}
          myTrips={"My Trips"}
          myProfile={"My Profile"}
          out={"Logout"}
          id={myId}
          toggleMenu={() => {
            setIsAddingTrip(!isAddingTrip);
          }}
        />
        {isLoading ? (
          <div className={styles.audio}>
            {" "}
            <Audio
              height="80"
              width="80"
              radius="9"
              color="white"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
            <div className={styles.free}>My servers are free</div>
            <div className={styles.smallfree}>Give it a sec haha</div>
          </div>
        ) : (
          <>
            {isAddingTrip ? (
              <div className={styles.center}>
                <div className={`${styles.createTripContainer} ${styles.blur}`}>
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
                    <div className={styles.eightyPercent}>
                      <div className={styles.xContainer}>
                        <div
                          className={styles.x}
                          onClick={() => {
                            setIsAddingTrip(false);
                          }}
                        >
                          x
                        </div>
                      </div>

                      <div className={styles.createTripInputContainer}>
                        <div className={styles.half}>
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
                        <div className={styles.half}>
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

                      <div className={styles.datePickerContainer}>
                        <DateRangePicker
                          onChange={onChange}
                          value={value}
                          className={styles.datePicker}
                        />
                      </div>
                      <textarea
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                        className={styles.tripInfo}
                        placeholder="Description of what you guys will do"
                      />
                      <div className={styles.nextContainer}>
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
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.searchContainer}>
                <div className={styles.inputSizer}>
                  <div className={styles.title}>Open Trips</div>
                  <div className={styles.container}>
                    <SearchBar trips={trips} />
                    <div></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className={styles.downContainer}>
          <div className={styles.bottomText}>Huh?</div>
          <Arrow />
        </div>
      </div>
      <div className={styles.secondContainer}>
        <div className={styles.bottomPiece}>
          <div className={styles.bottomLeft}>
            <div className={styles.title}>What's this?</div>
            <div className={styles.paragraph}>
              A platform focused on connecting travellers! Create a trip or
              request to join someone else's
            </div>
          </div>
          <div className={styles.reviews}>
            <img className={styles.homeImage} src={homePhoto} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Person;
