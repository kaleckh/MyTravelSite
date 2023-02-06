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
		.new_trip([ req.body.person_id, req.body.triplocation, req.body.tripstartdate, req.body.tripenddate, req.body.tripstate ])
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
		.edit_person([ req.body.firstname, req.body.lastname, req.body.hometown, req.body.location, req.params.id ])
		.then((peopletravelling) => {
			res.status(200).send(peopletravelling);
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
let newDate = (req, res) => {
	const dbInstance = req.app.get('db')
	dbInstance
	.new_date()
}
module.exports = {
	getpeople,
	newperson,
	editdetails,
	deleteperson,
	getPerson,
	getPersonTrips,
	newTrip,
	deletetrip,
	getTrip,
	newDate
};
