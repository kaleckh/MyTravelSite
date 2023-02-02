import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const Navigate = useNavigate();

  return (
    <header className="header">
      <div className="home">Home</div>
      <div className="headerButtonContainer">
        <div className="headerItem">CREATE A TRIP</div>
        <div className="headerItem">MY TRIPS</div>
        <div className="headerItem">MY PROFILE</div>
      </div>
    </header>
  );
}
