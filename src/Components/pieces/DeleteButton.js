import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteButton.module.css";
import { auth } from "../Firebase";

export default function Header({ isDeletingTrip }) {
  const [toggleDelete, setToggleDelete] = useState(false);
  return (
    <div className={styles.deleteContainer}>
      <div
        onClick={() => {
          setToggleDelete(!setToggleDelete);
          isDeletingTrip();
        }}
      >
        cancel
      </div>
      <div
        onClick={() => {
          setToggleDelete(!setToggleDelete);
          isDeletingTrip();
        }}
      >
        edit
      </div>
      {/* <div className={`${styles.absolute}`} onClick={() => {setToggleDelete(!setToggleDelete); isDeletingTrip()}}>Cancel</div> */}

      {/* <div className={styles.dots} onClick={() => { setToggleDelete(!toggleDelete); isDeletingTrip()}}>...</div> */}
    </div>
  );
}
