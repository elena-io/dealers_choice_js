const pg = require('pg');
const express = require('express');

//generating postgres client, it needs to find my pg server and db on a postgres server
const client = new pg.Client('postgres://localhost/db_dealers_choice')

//create a new method to create your own new Food Experience
const createYourOwn = async({ name }) => {
   return (await client.query(`INSERT INTO foodExperiences(name) VALUES(${name})`))
}

const SyncSeed = async() => {
    const SQL = `
    
    DROP TABLE IF EXISTS italianExperiences;
    DROP TABLE IF EXISTS mexicanExperiences;
    DROP TABLE IF EXISTS spanishExperiences;
    DROP TABLE IF EXISTS foodExperiences;
    CREATE TABLE foodExperiences(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
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
    INSERT INTO foodExperiences(id, name) VALUES (1, 'Italian Food');    
    INSERT INTO foodExperiences(id, name) VALUES (2, 'Mexican Food');    
    INSERT INTO foodExperiences(id, name) VALUES (3, 'Spanish Food');    
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

module.exports = {
    client,
    SyncSeed,
    createYourOwn
}