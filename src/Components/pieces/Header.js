import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

export default function Header({
  home, 
  toggleMenu,
  myTrips,
  myProfile,
  createTrip
}) {
  const navigate = useNavigate()
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header className="header">
      <div className="home">{home}</div>
      <div className="headerButtonContainer">
        <div onClick={() => {toggleMenu()}}  className="headerItem">{createTrip}</div>
        <div onClick={() => {navigate('/myTrips')}} className="headerItem">{myTrips}</div>
        <div onClick={() => {Promise.all([logout()]).then(navigate('/'))}} className="headerItem">{myProfile}</div>
      </div>
    </header>
  );
}
