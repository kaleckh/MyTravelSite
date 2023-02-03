import React from "react";
import "./Header.css";


export default function Header(props) {
  

  return (
    <header className="header">
      <div className="home">{props.home}</div>
      <div className="headerButtonContainer">
        <div className="headerItem">{props.createTrip}</div>
        <div className="headerItem">{props.myTrips}</div>
        <div className="headerItem">{props.myProfile}</div>
      </div>
    </header>
  );
}
