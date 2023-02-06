require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
var {
	getpeople,
	newperson,
	editdetails,
	deleteperson,
	getPerson,
	getPersonTrips,
	newTrip,
  deletetrip,
  getTrip,
  
} = require('./controller');
const app = express();
app.use(express.json());
const { PORT = 3001 } = process.env;
const cors = require('cors');
app.use(cors());
app.use(bodyParser());
const dotenv = require('dotenv');
require('dotenv').config();
const CONNECTION_STRING = 'postgres://postgres:postgres@localhost/lets_travel?sslmode=disable';

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false }
})
	.then((dbInstance) => {
		app.set('db', dbInstance);
	})
	.catch((err) => console.log(err));

app.get('/people', getpeople);
app.get('/person/:email', getPerson);
app.get('/personTrips/:id', getPersonTrips);
app.get('/trip/:id', getTrip)
app.post('/newperson', newperson);
app.post('/newtrip', newTrip);
app.put('/editperson/:id', editdetails);
app.delete('/deleteperson/:id', deleteperson);
app.delete('/deletetrip/:id', deletetrip);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
