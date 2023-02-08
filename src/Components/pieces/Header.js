import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

export default function Header({
  toggleMenu,
  home,
  out,
  id,  
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
      <div className="home" onClick={() => {navigate(`/person/${auth.currentUser.uid}`)}}>{home}</div>
      <div className="headerButtonContainer">
        <div onClick={() => {toggleMenu()}}  className="headerItem">{createTrip}</div>
        <div onClick={() => {navigate(`/myTrips/${id}`)}} className="headerItem">{myTrips}</div>
        <div onClick={() => {navigate(`/myprofile/${id}`)}} className="headerItem">{myProfile}</div>
        <div onClick={() => {Promise.all([logout()]).then([navigate('/'), localStorage.removeItem('userEmail')])}} className="headerItem">{out}</div>
      </div>
    </header>
  );
}
