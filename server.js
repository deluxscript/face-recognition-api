const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
	  host : 'localhost',
	  user : 'delux',
	  password : '',
	  database : 'face-recognition'
	}
  });

const app = express();

//Using middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {signin.signinHandler(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.registerHandler(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.profileHandler(req, res, db)})

app.put('/image', (req, res) => {image.imageHandler(req, res, db)})

app.listen(3001, () => {
	console.log('App is running on port 3001');
})
