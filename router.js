const app = require('express').Router;

const db = require('./db');

const { client, SyncSeed, createYourOwn } = db;

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
                    <a href="/"> Home </a>
                </nav>
                <div id="main">
                <h1>Food Experiences</h1>
                <ul>
                ${
                    foodExp.map(food=> 
                        `
                        <li> 
                            <a href="/${food.url}">
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
                        <a href="/"> Home </a>
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
                        <a href="/"> Home </a>
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
                    <a href="/"> Home </a>
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
                        <a href="/"> Home </a>
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
                        <a href="/"> Home </a>
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
                        <a href="/"> Home </a>
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


module.exports = app;