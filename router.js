// creating a router 
const router = require('express').Router();
const db = require('./db');

module.exports = router;

//exporting our methods
const { client, SyncSeed, createYourOwn } = db;
//const client = db.client;

router.get('/', async (req, res, next)=> {
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

router.get('/add-your-own', async (req, res, next)=> {
    const response = await client.query('SELECT * FROM foodExperiences');
    const foodExp = response.rows;
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
                    <div class="form">
                        <form method = "POST" action = "/add-your-own">
                            <input name="name"/>
                            <button> Add Your Own Experience </button>
                        </form>
                    </div>
                </div> 
            </body>
        </html>
    `)
    }
    catch(ex) {
        next(ex);
    }
})

router.post('/add-your-own', async (req, res, next) => {
    try {
        res.redirect('/add-your-own');
        //await createYourOwn();
        console.log(req.body);
    }
    catch(ex) {
        next(ex);
    }
})

router.get('/italian-food', async (req, res, next)=> {
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
router.get('/italian-food/:id', async (req, res, next)=> {
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
router.get('/mexican-food', async (req, res, next)=> {
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
router.get('/mexican-food/:id', async (req, res, next)=> {
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
router.get('/spanish-food', async (req, res, next)=> {
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
router.get('/spanish-food/:id', async (req, res, next)=> {
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
