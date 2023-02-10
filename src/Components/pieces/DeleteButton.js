import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteButton.module.css";
import { auth } from "../Firebase";

export default function Header({isDeletingTrip}) {
  const [toggleDelete, setToggleDelete] = useState(false);
  return (
    <div>
      {toggleDelete ? (
        <button onClick={() => {setToggleDelete(!setToggleDelete); isDeletingTrip()}}>Cancel</button>
      ) : (
        <div className={styles.dots} onClick={() => { setToggleDelete(!toggleDelete); isDeletingTrip()}}>...</div>
      )}
    </div>
  );
}
