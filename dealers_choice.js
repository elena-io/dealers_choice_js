const express = require('express');
//stitches things together, creating a path /.../.../...
const path = require('path');
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use((req, res, next)=> {
    next();
} )

//storing an object 

const italianExperiences = [
    {id: 1, name: 'pasta'},
    {id: 2, name: 'pizza'},
    {id: 3, name: 'more pasta'},
    {id: 4, name: 'more pizza'}
];
const mexicanExperiences = [
    {id: 1, name: 'Taco'},
    {id: 2, name: 'Burito'},
    {id: 3, name: 'Enchiladas'},
    {id: 4, name: 'Tostadas'}
];
const spanishExperiences = [
    {id: 1, name: 'Tapas'},
    {id: 2, name: '...more tapas...'},
    {id: 3, name: '...even more tapas'},
    {id: 4, name: '...all the tapas'}
];



app.get('/', (req, res, next)=> {
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
                <h1>Food Experiences</h1>
                <ul>
                    <li><a href="/italian-food">Italian Food</a></li>
                    <li><a href="/mexican-food">Mexican Food</a></li>
                    <li><a href='/spanish-food'>Spanish Food</a></li>
                <ul>
                </div>
            </body>
        </html>
    
    `)
})

app.get('/italian-food', (req, res, next)=> {
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
                        italianExperiences.map(food => {
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
app.get('/italian-food/:id', (req, res, next)=> {
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
                        italianExperiences.filter(food => food.id === req.params.id*1).map(food => {
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
app.get('/mexican-food', (req, res, next)=> {
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
                        mexicanExperiences.map(food => {
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
app.get('/mexican-food/:id', (req, res, next)=> {
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
                        mexicanExperiences.filter(food => food.id === req.params.id*1).map(food => {
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
app.get('/spanish-food', (req, res, next)=> {
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
                        spanishExperiences.map(food => {
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
app.get('/spanish-food/:id', (req, res, next)=> {
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
                        spanishExperiences.filter(food => food.id === req.params.id*1).map(food => {
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

