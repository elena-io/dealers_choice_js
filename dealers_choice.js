const { Console } = require('console');
const express = require('express');
//stitches things together, creating a path /.../.../...
const path = require('path');
const db = require('./db');

const { client, SyncSeed, createYourOwn } = db;
const app = express();


//if the request was made on / the routes will be found in /router.js file


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

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use((req, res, next)=> {
    next();
} )


app.get('/', async (req, res, next)=> {
    try {
        const response = await client.query('SELECT * FROM foodExperiences');
        const foodExp = response.rows;
        res.send(
            `
        <html>
            <head>
                <link rel="stylesheet" href='/assets/styles.css' />
            </head>
            <body>
                <nav>
                    <a href="/" class="home"> Home </a>
                    <a href="/add-your-own"> Add your own</a>
                </nav>
                <div id="main">
                <h1>Food Experiences</h1>
                <ul>
                ${
                    foodExp.map(food=> 
                        `
                        <li> 
                            <a href="/${ food.name.toLowerCase().trim().split(/\s+/).join('-') }">
                                ${ food.name }
                            </a>
                        </li>
                        `
                    ).join('')
                } 
                <ul>
                </div>
            </body>
        </html>
    
    `)
    }
    catch(ex) {
        next(ex);

    }
   
})

app.get('/add-your-own', async (req, res, next)=> {
    try {
        res.send(
            `
        <html>
            <head>
                <link rel="stylesheet" href='/assets/styles.css' />
            </head>
            <body>
                <nav>
                    <a href="/" class="home"> Home </a>
                    <a href="/add-your-own"> Add your own</a>
                </nav>
                <div id="main">
                <h1>Add your own yammy experience</h1>
            
                </div>
            </body>
        </html>
    
    `)
    }
    catch(ex) {
        next(ex);

    }
   
})

app.get('/italian-food', async (req, res, next)=> {
    try{
        const response = await client.query('SELECT * FROM italianExperiences');
        const foodExp = response.rows;
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" href='/assets/styles.css' />
                </head>
                <body>
                    <nav>
                        <a href="/" class="home"> Home </a>
                        <a href="/add-your-own"> Add your own</a>
                    </nav>
                    <div id="main">
                    <h1>Italian Food</h1>
                    <ul>
                        ${
                            foodExp.map(food => {
                                return `<li>
                                <a href="/italian-food/${food.id}">
                                    ${food.name}
                                    </a>
                                </li>`
                            }).join('')
                        }
                    <ul>
                    
                    </div>
                </body>
            </html>
        `)
    }
    catch(ex) {
        console.log(ex);
    }
})
app.get('/italian-food/:id', async (req, res, next)=> {
    try {
        const response = await client.query('SELECT * FROM italianExperiences');
        const foodExp = response.rows;
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" href='/assets/styles.css' />
                </head>
                <body>
                    <nav>
                        <a href="/" class="home"> Home </a>
                        <a href="/add-your-own"> Add your own</a>
                    </nav>
                    <div id="main">
                    <h1>Italian Food</h1>
                    <ul>
                        ${
                            foodExp.filter(food => food.id === req.params.id*1).map(food => {
                                return `<li>
                                <a href="/italian-food">
                                    ${food.name}
                                    </a>
                                </li>`
                            }).join('')
                        }
                    <ul>
                    </div>
                </body>
            </html>
                    
        `)
    }
    catch(ex) {
        console.log(ex);
    }
    
})
app.get('/mexican-food', async (req, res, next)=> {
    try {
        const response = await client.query('SELECT * FROM mexicanExperiences');
        const foodExp = response.rows;
        res.send(`
        <html>
            <head>
                <link rel="stylesheet" href='/assets/styles.css' />
            </head>
            <body>
                <nav>
                    <a href="/" class="home"> Home </a>
                    <a href="/add-your-own"> Add your own</a>
                </nav>
                <div id="main">
                <h1>Mexican Food</h1>
                <ul> 
                    ${
                        foodExp.map(food => {
                            return `<li>
                            <a href="/mexican-food/${food.id}">
                                ${food.name}
                                </a>
                            </li>`
                        }).join('')
                    }
                </ul>
                
                </div>
            </body>
        </html>
    
    `)
    }
    catch(ex) {
        console.log(ex);
    }
    
})
app.get('/mexican-food/:id', async (req, res, next)=> {
    try {
        const response = await client.query('SELECT * FROM mexicanExperiences');
        const foodExp = response.rows;
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" href='/assets/styles.css' />
                </head>
                <body>
                    <nav>
                        <a href="/" class="home"> Home </a>
                        <a href="/add-your-own"> Add your own</a>
                    </nav>
                    <div id="main">
                    <h1>Mexican Food</h1>
                    <ul> 
                        ${
                            foodExp.filter(food => food.id === req.params.id*1).map(food => {
                                return `<li>
                                <a href="/mexican-food">
                                    ${food.name}
                                    </a>
                                </li>`
                            }).join('')
                        }
                    </ul>
                    
                    </div>
                </body>
            </html>         
        `)
    }
    catch(ex) {
        console.log(ex);
    }
    
})
app.get('/spanish-food', async (req, res, next)=> {
    try {
        const response = await client.query('SELECT * FROM spanishExperiences');
        const foodExp = response.rows;
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" href='/assets/styles.css' />
                </head>
                <body>
                    <nav>
                        <a href="/" class="home"> Home </a>
                        <a href="/add-your-own"> Add your own</a>
                    </nav>
                    <div id="main">
                    <h1>Spanish Food</h1>
                    <ul>
                        ${
                            foodExp.map(food => {
                                return `
                                <li>    
                                    <a href="/spanish-food/${food.id}">
                                    ${food.name}
                                    </a>
                                </li>
                                `
                            }).join("")
                        }
                    <ul>
                    
                    </div>
                </body>
            </html>          
        `)
    }
    catch(ex) {
        console.log(ex);
    }
    
    
})
app.get('/spanish-food/:id', async (req, res, next)=> {
    try {
        const response = await client.query('SELECT * FROM spanishExperiences');
        const foodExp = response.rows;
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" href='/assets/styles.css' />
                </head>
                <body>
                    <nav>
                        <a href="/" class="home"> Home </a>
                        <a href="/add-your-own"> Add your own</a>
                    </nav>
                    <div id="main">
                    <h1>Spanish Food</h1>
                    <ul>
                        ${
                            foodExp.filter(food => food.id === req.params.id*1).map(food => {
                                return `
                                <li>    
                                    <a href="/spanish-food/">
                                    ${food.name}
                                    </a>
                                </li>
                                `
                            }).join("")
                        }
                    <ul>
                    
                    </div>
                </body>
            </html>        
        `)
    }
    catch(ex) {
        console.log(ex);
    }
    
})


const port = process.env.PORT || 3000;

app.listen(port, ()=> {console.log(`litening to port ${port}`);})

