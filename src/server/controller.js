const e = require('express');

let getpeople = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance.get_people().then((peopletravelling) => res.status(200).send(peopletravelling)).catch((err) => {
		res.status(500).send({
			errorMessage: 'Oops! Something went wrong. Our engineers have been informed!'
		});
		console.log(err);
	});
};
let getPerson = (req, res) => {
	const dbInstance = req.app.get('db');

	dbInstance
		.get_person([ req.params.email ])
		.then((peopletravelling) => res.status(200).send(peopletravelling))
		.catch((err) => {
			res.status(500).send({
				errorMessage: 'somethin aint right'
			});
			console.log(err);
		});
};
let getTrips = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.get_trips()
		.then((trips) => res.status(200).send(trips))
		.catch((err) => {
			res.status(500).send({
				errorMessage: 'somethin aint right'
			});
			console.log(err);
		});
};
let getPersonTrips = (req, res) => {
	const dbInstance = req.app.get('db');
	console.log(req.params.id);
	dbInstance
		.get_person_trips([ req.params.id ])
		.then((peopletravelling) => res.status(200).send(peopletravelling))
		.catch((err) => {
			res.status(500).send({
				errorMessage: 'somethin aint right'
			});
			console.log(err);
		});
};
let newperson = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.new_person([ req.body.firstname, req.body.lastname, req.body.email ])
		.then((peopletravelling) => {
			res.status(200).send(peopletravelling);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: 'Oops! Something went wrong. Our engineers have been informed!'
			});
			console.log(err);
		});
};
let newTrip = (req, res) => {
	console.log(req.body, "this is body");
	const dbInstance = req.app.get('db');
	dbInstance
		.new_trip([ req.body.person_id, req.body.triplocation, req.body.tripstartdate, req.body.tripenddate, req.body.tripstate, req.body.description ])
		.then((trips) => {
			res.status(200).send(trips);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: 'Oops! Something went wrong. Our engineers have been informed!'
			});
			console.log(err);
		});
};

let editdetails = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.edit_person([ req.body.instagram, req.body.bio, req.params.id ])
		.then((peopletravelling) => {
			res.status(200).send(peopletravelling);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: err
			});
		});
};
let edittrip = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.edit_trip([ req.body.description, req.body.housing, req.body.friends, req.body.photo, req.params.id ])
		.then((trips) => {
			res.status(200).send(trips);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: err
			});
		});
};
let deleteperson = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.delete_person([ req.params.id ])
		.then((peopletravelling) => {
			res.status(200).send(peopletravelling);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: err
			});
		});
};
let deletetrip = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.delete_trip([ req.params.id ])
		.then((trips) => {
			res.status(200).send(trips);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: err
			});
		});
};
let deleteTripGroup = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.delete_trip_group([ req.params.id ])
		.then((trips) => {
			res.status(200).send(trips);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: err
			});
		});
};
let getTrip = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.get_trip(req.params.id)
		.then((trip) => {
			res.status(200).send(trip);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: err
			});
		});
};
let getTripGroup = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.get_trip_group(req.params.id)
		.then((trip) => {
			res.status(200).send(trip);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: err
			});
		});
};
let newDate = (req, res) => {
	const dbInstance = req.app.get('db')
	dbInstance
	.new_date()
}
let newTripGroup = (req, res) => {
	const dbInstance = req.app.get('db');
	dbInstance
		.new_trip_group(req.body.personid, req.body.tripid, req.body.email)
		.then((trip) => {
			res.status(200).send(trip);
		})
		.catch((err) => {
			res.status(500).send({
				errorMessage: err
			});
		});
};
module.exports = {
	getpeople,
	newperson,
	editdetails,
	deleteperson,
	deleteTripGroup,
	getPerson,
	getPersonTrips,
	newTrip,
	deletetrip,
	getTrip,
	getTrips,
	getTripGroup,
	newDate,
	edittrip,
	newTripGroup
};
