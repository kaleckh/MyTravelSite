import styles from "./Trip.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/pieces/Header";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Trip() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const Navigate = useNavigate();

  const [myInfo, setMyInfo] = useState([]);
  const [myTrip, setMyTrip] = useState([]);
  const [myId, setMyId] = useState("");
  const [myTrips, setMyTrips] = useState([]);
  const [loading, setLoading] = useState(true);
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
  
 

  
  
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Header
            home={"Home"}
            createTrip={"Create Trip"}
            myTrips={"My Trips"}
            myProfile={"My Profile"}
            out={"Logout"}
            color={"black"}
          />
          <div className={styles.tripMainContainer}>
            <div className={styles.leftTripContainer}>
              <div className={styles.personaltriptitle}>
                {myTrips[0].triplocation}
              </div>
              <div className={styles.row}>
                <div className={styles.personaltripdate}>
                  {changeFormat(myTrips[0].tripstartdate)}
                </div>
                <div className={styles.personaltripdate}>
                  {changeFormat(myTrips[0].tripenddate)}
                </div>
              </div>
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
                <div className={styles.smallerTitle}>About the trip</div>
                <div className={styles.tripbox} />
                <div className={styles.smallerTitle}>Housing</div>
                <div className={styles.tripbox} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Trip;
