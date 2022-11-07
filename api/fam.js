const mongoCollections = require("../config/mongoCollections");
const fam = mongoCollections.fam;
const { ObjectId } = require("mongodb");

async function createFam(husb, wife, chil, marr, div) {
    const famCollection = await fam();
    toAdd = {
        husb: husb,
        wife: wife,
        chil: chil,
        marr: marr,
        div: div
    }

    const famList = await famCollection.insertOne(toAdd);
    return famList;
}

async function getFam(id) {
    const famCollection = await fam();
    const famList = await famCollection.findOne({ _id: ObjectId(id) });
    return famList;
}

async function addDiv(id, div) {
    const famCollection = await fam();
    const famList = await famCollection.updateOne({ _id: ObjectId(id) }, { $set: { div: div } });
    return famList;
}

async function addChil(id, chil) {
    const famCollection = await fam();
    const famList = await famCollection.updateOne({ _id: ObjectId(id) }, { $push: { chil: chil } });
    return famList;
}