import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";


export default function Header(props) {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="home">{props.home}</div>
      <div className="headerButtonContainer">
        <div  className="headerItem">{props.createTrip}</div>
        <div onClick={() => {navigate('/myTrips')}} className="headerItem">{props.myTrips}</div>
        <div className="headerItem">{props.myProfile}</div>
      </div>
    </header>
  );
}
