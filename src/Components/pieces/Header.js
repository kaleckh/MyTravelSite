import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

export default function Header(props) {
  const navigate = useNavigate()
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header className="header">
      <div className="home">{props.home}</div>
      <div className="headerButtonContainer">
        <div  className="headerItem">{props.createTrip}</div>
        <div onClick={() => {navigate('/myTrips')}} className="headerItem">{props.myTrips}</div>
        <div onClick={() => {Promise.all([logout()]).then(navigate('/'))}} className="headerItem">{props.myProfile}</div>
      </div>
    </header>
  );
}
