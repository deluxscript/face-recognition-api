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
	  connectionString : process.env.DATABASE.URL,
	  ssl: true,
	}
  });

const app = express();

//Using middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('it is working');
})

app.post('/signin', (req, res) => {signin.signinHandler(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.registerHandler(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.profileHandler(req, res, db)})

app.put('/image', (req, res) => {image.imageHandler(req, res, db)})

app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})
