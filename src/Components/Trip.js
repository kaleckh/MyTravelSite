import styles from "./Trip.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/pieces/Header";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Audio } from "react-loader-spinner";

function Trip() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const Navigate = useNavigate();

  const [myInfo, setMyInfo] = useState([]);
  const [myTrip, setMyTrip] = useState([]);
  const [myId, setMyId] = useState("");
  const [description, setDescription] = useState("");
  const [housing, setHousing] = useState("");
  const [friends, setFriends] = useState("");
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(true);
  const [toggleTripDetails, setToggleTripDetails] = useState(false);
  const { id } = useParams();
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
        url: `http://localhost:3001/trip/${id}`,
      }).then((res) => {
        setMyTrips(res.data);
        setLoading(false);
      });
    });
  }, []);

  const changeFormat = (isoDate) => {
    const regularDate = new Date(isoDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    return regularDate;
  };
  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/edittrip/${id}`, {
        description: description,
        housing: housing,
        friends: friends,
      });

      return await setRender(!render);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(myTrips[0]);
  return (
    <div>
      {loading ? (
        <div className={styles.loadingContainer}>
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
        </div>
      ) : (
        <div>
          <Header
            home={"Home"}
            createTrip={"Create Trip"}
            myTrips={"My Trips"}
            myProfile={"My Profile"}
            out={"Logout"}
            color={"black"}
          />

          <div className={styles.tripMainContainer}>
            <div className={styles.tripContainer}>
              <div className={styles.leftTripContainer}>
                <div className={styles.personaltriptitle}>
                  {myTrips[0].triplocation}
                </div>
                <div className={styles.row}>
                  <div className={styles.personaltripdate}>
                    {`${changeFormat(
                      myTrips[0].tripstartdate
                    )} - ${changeFormat(myTrips[0].tripenddate)}`}
                  </div>
                </div>
                <img className={styles.tripImage} alt="" />
              </div>
              <div className={styles.rightTripContainer}>
                <div className={styles.daysTill}>
                  <div className={styles.center}>
                    <div className={styles.daysTillText}>days till</div>
                    <div className={styles.daysTillNumber}>200</div>
                  </div>
                </div>
                <div className={styles.boxContainer}>
                  {!toggleTripDetails ? (
                    <div className={styles.center}>
                      <div className={styles.smallerTitle}>Whose Coming</div>
                      <div className={styles.tripbox}>{myTrips[0].friends}</div>
                      <div className={styles.smallerTitle}>About the trip</div>
                      <div className={styles.tripbox}>
                        {myTrips[0].description}{" "}
                      </div>
                      <div className={styles.smallerTitle}>Housing</div>
                      <div className={styles.tripbox}>{myTrips[0].housing}</div>
                      <div className={styles.row}>
                        <button
                          className={`${styles.smallerTitle} ${styles.tripButton}`}
                          onClick={() => {
                            setToggleTripDetails(true);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <div className={styles.smallerTitle}>Whose Coming</div>
                      <div className={styles.tripbox}>
                        <textarea
                          onChange={(event) => {
                            setFriends(event.target.value);
                          }}
                          placeholder="Tag Friends Coming"
                          type="text"
                        />
                      </div>
                      <div className={styles.smallerTitle}>About the trip</div>
                      <div className={styles.tripbox}>
                        <textarea
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                          placeholder="What are you gonna be doing this trip?"
                          type="text"
                        />
                      </div>
                      <div className={styles.smallerTitle}>Housing</div>
                      <div className={styles.tripbox}>
                        <textarea
                          onChange={(event) => {
                            setHousing(event.target.value);
                          }}
                          placeholder="What kind of housing and where will you be staying"
                          type="text"
                        />
                      </div>
                      <div className={styles.row}>
                        <button
                          onClick={() => {
                            setToggleTripDetails(!toggleTripDetails);
                            handleSubmit();
                          }}
                          className={`${styles.smallerTitle} ${styles.tripButton}`}
                        >
                          Done
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trip;
