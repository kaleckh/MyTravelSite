import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteButton.module.css";
import { auth } from "../Firebase";

export default function Header({isDeletingTrip}) {
  const [toggleDelete, setToggleDelete] = useState(false);
  return (
    <div>
      {toggleDelete ? (
        <button onClick={() => {isDeletingTrip(); setToggleDelete(!setToggleDelete)}}>Cancel</button>
      ) : (
        <div className={styles.dots} onClick={() => {isDeletingTrip(); setToggleDelete(!toggleDelete)}}>...</div>
      )}
    </div>
  );
}
