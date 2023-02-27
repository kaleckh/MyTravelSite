import styles from "./Trip.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/pieces/Header";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { isAdmin } from "@firebase/util";
import { Hike } from "./Media/Hike";
import { Surf } from "./Media/Surf";
import { Relax } from "./Media/Relax";
import { Cheers } from "./Media/Cheers";
import surf from './Media/surf.jpg'
import explore from './Media/explore.jpg'
import hike from './Media/hike.jpg'
import party from './Media/party.jpg'

function Trip() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const Navigate = useNavigate();

  const [myId, setMyId] = useState("");
  const [description, setDescription] = useState("");
  const [housing, setHousing] = useState("");
  const [friends, setFriends] = useState("");
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(true);
  const [admin, setIsAdmin] = useState(true);
  const [image, setImage] = useState();
  const [tripGroup, setTripGroup] = useState();
  const [toggleTripDetails, setToggleTripDetails] = useState(false);
  const [photo, setPhoto] = useState("");
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
        console.log(res.data[0], `this is the response`);
        setDescription(res.data[0].description);
        setHousing(res.data[0].housing);
        setFriends(res.data[0].friends);
        setPhoto(res.data[0].photo)

        axios({
          method: "get",
          url: `http://localhost:3001/tripgroup/${id}`,
        }).then((res) => {
          if (myId === res.data[0].personid) {
            setIsAdmin(true);
          }
          setTripGroup(res.data);
        });
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
  const handleSubmit = async (photo) => {
    
    try {
      await axios.put(`http://localhost:3001/edittrip/${id}`, {
        description: description,
        housing: housing,
        friends: friends,
        photo: photo
      }).then((res) => {
        
        setPhoto(res.data[0].photo)
      });

      await setRender(!render);
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <div className={styles.wholeScreen}>
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
            myTrips={"My Trips"}
            myProfile={"My Profile"}
            out={"Logout"}
            color={"black"}
            id={myId}
          />

          <div className={styles.tripMainContainer}>
            <div className={styles.tripContainer}>
              <div className={styles.leftTripContainer}>
                <div className={styles.personaltriptitle}>
                  {myTrips[0].triplocation}
                </div>
                <div className={styles.row}>
                  <div className={styles.personaltripdate}>
                    <div>{changeFormat(myTrips[0].tripstartdate)}</div>
                    <div>-</div>
                    <div>{changeFormat(myTrips[0].tripenddate)}</div>
                  </div>
                </div>
                <div className={styles.svgContainer}>
                  <div className={styles.blackBoxContainer}>
                    <div onClick={() => {setPhoto(explore); handleSubmit(explore)}}  className={styles.blackBox}>
                      <Relax />
                    </div>
                    <div onClick={() => {setPhoto(party); handleSubmit(party)}} className={styles.blackBox}>
                      <Cheers/>
                    </div>
                    <div onClick={() => {setPhoto(hike); handleSubmit(hike)}} className={styles.blackBox}>
                      <Hike/>
                    </div>
                    <div onClick={() => {setPhoto(surf); handleSubmit(surf)}} className={styles.blackBox}>
                      <Surf/>
                    </div>
                  </div>
                  <div className={styles.imgContainer}>
                    <img className={styles.tripImage} src={photo} alt="" />
                  </div>
                </div>
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
                      <div className={styles.tripbox}>
                        {tripGroup?.map((trip) => {
                          
                          return (
                            <div className={styles.tagContainer}>
                              <div
                                className={styles.tag}
                                onClick={() => {
                                  Navigate(`/myprofile/${trip.email}`);
                                }}
                              >
                                {trip.email}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className={styles.smallerTitle}>About the trip</div>

                      <div className={styles.tripbox}>
                        <div className={styles.tagContainer}>
                          {myTrips[0].description}{" "}
                        </div>
                      </div>
                      <div className={styles.smallerTitle}>Housing</div>

                      <div className={styles.tripbox}>
                        <div className={styles.tagContainer}>{myTrips[0].housing}</div>
                      </div>

                      <div className={styles.row}>
                        {!admin ? (
                          <button>Request Join</button>
                        ) : (
                          <button
                            className={`${styles.smallerTitle} ${styles.tripButton}`}
                            onClick={() => {
                              setToggleTripDetails(true);
                            }}
                          >
                            Edit
                          </button>
                        )}
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
                          placeholder="Invite friends from their profile or tag friends here!"
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
