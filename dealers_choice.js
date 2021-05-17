const { Console } = require('console');
const express = require('express');
//stitches things together, creating a path /.../.../...
const path = require('path');
const app = express();
const pg = require('pg');
//generating postgres client, it needs to find my pg server and db on a postgres server
const client = new pg.Client('postgres://localhost/db_dealers_choice')

const SyncSeed = async() => {
    const SQL = `
    
    DROP TABLE IF EXISTS italianExperiences;
    DROP TABLE IF EXISTS mexicanExperiences;
    DROP TABLE IF EXISTS spanishExperiences;
    DROP TABLE IF EXISTS foodExperiences;
    CREATE TABLE foodExperiences(
        id INTEGER PRIMARY KEY,
        name VARCHAR(100),
        url VARCHAR(20)
        );
    CREATE TABLE italianExperiences(
        id INTEGER PRIMARY KEY,
        name VARCHAR(100),
        food_id INTEGER REFERENCES foodExperiences(id)
        );
    CREATE TABLE mexicanExperiences(
        id INTEGER PRIMARY KEY,
        name VARCHAR(100),
        food_id INTEGER REFERENCES foodExperiences(id)
        );  
    CREATE TABLE spanishExperiences(
        id INTEGER PRIMARY KEY,
        name VARCHAR(100),
        food_id INTEGER REFERENCES foodExperiences(id)
        );       
    INSERT INTO foodExperiences(id, name, url) VALUES (1, 'Italian Food', 'italian-food');    
    INSERT INTO foodExperiences(id, name, url) VALUES (2, 'Mexacin Food', 'mexican-food');    
    INSERT INTO foodExperiences(id, name, url) VALUES (3, 'Spanish Food', 'spanish-food');    
    INSERT INTO italianExperiences(id, name, food_id) VALUES (1, 'Pasta', 1);
    INSERT INTO italianExperiences(id, name, food_id) VALUES (2, 'Pizza', 1);
    INSERT INTO italianExperiences(id, name, food_id) VALUES (3, 'More Pasta', 1);
    INSERT INTO italianExperiences(id, name, food_id) VALUES (4, 'More Pizza', 1);  
    INSERT INTO mexicanExperiences(id, name, food_id) VALUES (1, 'Taco', 2);  
    INSERT INTO mexicanExperiences(id, name, food_id) VALUES (2, 'Burito', 2);  
    INSERT INTO mexicanExperiences(id, name, food_id) VALUES (3, 'Enchiladas', 2);  
    INSERT INTO mexicanExperiences(id, name, food_id) VALUES (4, 'Tostadas', 2);  
    INSERT INTO spanishExperiences(id, name, food_id) VALUES (1, 'Tapas', 3);  
    INSERT INTO spanishExperiences(id, name, food_id) VALUES (2, '...more tapas...', 3);  
    INSERT INTO spanishExperiences(id, name, food_id) VALUES (3, '...even more tapas...', 3);  
    INSERT INTO spanishExperiences(id, name, food_id) VALUES (4, '...all the tapas', 3);  
    `;
    await client.query(SQL);
}

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
//connecting to the client


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
})
app.get('/italian-food/:id', async (req, res, next)=> {
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
})
app.get('/mexican-food', async (req, res, next)=> {
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
})
app.get('/mexican-food/:id', async (req, res, next)=> {
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
})
app.get('/spanish-food', async (req, res, next)=> {
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
})
app.get('/spanish-food/:id', async (req, res, next)=> {
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
})


const port = process.env.PORT || 3000;

app.listen(port, ()=> {console.log(`litening to port ${port}`);})

