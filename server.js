const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
  client: 'pg',
  connection: {
    host : 'postgresql-adjacent-58556',
    user : 'postgres',
    password : 'aditya888',
    database : 'smartBrain'
  }
});

const app=express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
	res.send('it is Working');
});

app.post('/signin',(req,res)=>{
	signin.handleSignIn(req,res,db,bcrypt)
});

app.post('/register',(req,res)=>{
	register.handleRegister(req,res,db,bcrypt)
});

app.get('/profile/:id',(req,res)=>{
	profile.handleProfile(req,res,db)
});

app.put('/image',(req,res)=>{
	image.handleEntries(req,res,db)
});

app.post('/imageurl',(req,res)=>{
	image.handleAPI(req,res)
});


app.listen(process.env.PORT||3000,()=>{
	console.log(`Working on port ${process.env.PORT}`);
});

// app.listen(3000,()=>{
// 	console.log(`Working on port 3000`);
// });
