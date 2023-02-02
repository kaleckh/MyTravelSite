import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Person from './Person';
import MyTrips from './MyTrips.js';
import Trip from './Trip';
import MyProfile from './MyProfile';

export default (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			{/* <Route path="/login" element={<Login />} />
			<Route path="/person/:id" element={<Person />} />
			<Route path="/myTrips/:id" element={<MyTrips />} />
			<Route path="/trip/:id" element={<Trip />} />
			<Route path="/profile/:id" element={<MyProfile />} /> */}
		</Routes>
	</BrowserRouter>
);
