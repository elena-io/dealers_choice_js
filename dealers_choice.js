const { Console } = require('console');
const { urlencoded } = require('express');
const express = require('express');
//stitches things together, creating a path /.../.../...
const path = require('path');
const db = require('./db');

const { client, SyncSeed, createYourOwn } = db;
const app = express();

//function, middleware - parsing 
app.use(urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use((req, res, next)=> {
    next();
} )
app.use(require('./router.js'));

//every file in the router will start with /food route
//app.use('/food', require('./router_food.js'))

//if the request was made on / the routes will be found in /router.js file
//const router = require('express').Router();



const setUp = async()=> {
    try{
       await client.connect();
       await SyncSeed();
       console.log('connected to database')
       
    }
    catch(ex){
        console.log(ex);
    }
};
setUp();

const port = process.env.PORT || 3000;

app.listen(port, ()=> {console.log(`litening to port ${port}`);})

