const api = require("./api");

const connection = require('./config/mongoConnection');
const mongoCollections = require('./config/mongoCollections');
const { ObjectId } = require('mongodb');

async function main() {
    console.log("g")
    const db = await connection.connectToDb();
    console.log("t")
    await db.dropDatabase();

    let i1 = await api.indiApi.createIndi("Mary", "1/1/1990", "1/1/1990", [], null);
    let i2 = await api.indiApi.createIndi("Tom", "1/1/1990", "1/1/1990", [], null);

    let f1 = await api.commonApi.marry(i1, i2, "1/1/1990");
    await api.commonApi.generateNuplets(f1, 3);
    
    connection.closeConnection();
    return;
}

main();