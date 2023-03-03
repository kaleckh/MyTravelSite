import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

import Person from "./Person";
import MyTrips from "./MyTrips.js";
import Trip from "./Trip";
import MyProfile from "./MyProfile";
import Profile from "./Profile";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trip/:id" element={<Trip />} />
      <Route path="/person/:id" element={<Person />} />
      <Route path="/myTrips/:id" element={<MyTrips />} />
      <Route path="/myprofile/:id" element={<MyProfile />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
