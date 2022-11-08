const mongoCollections = require("../config/mongoCollections");
const indi = mongoCollections.indi;
const { ObjectId } = require("mongodb");

async function a() {
    const indiCollection = await indi();
    const indiList = await indiCollection.find({}).toArray();
    return indiList;
}

async function createIndi(name, birthday, deathdate, famS, famC) {
    const indiCollection = await indi();
    toAdd = {
        name: name,
        birthday: birthday,
        deathdate: deathdate,
        famS: famS,
        famC: famC
    }
    //todo return id
    const indiList = await indiCollection.insertOne(toAdd);

    return indiList.insertedId;
}

async function getIndi(id) {
    const indiCollection = await indi();
    const indiList = await indiCollection.findOne({ _id: ObjectId(id) });
    return indiList;
}

async function addFamS(id, famS) {
    const indiCollection = await indi();
    const indiList = await indiCollection.updateOne({ _id: ObjectId(id) }, { $push: { famS: famS } });
    return indiList;
}

async function addFamC(id, famC) {
    const indiCollection = await indi();
    const indiList = await indiCollection.updateOne({ _id: ObjectId(id) }, { $push: { famC: famC } });
    return indiList;
}

module.exports = {
    a,
    getIndi,
    createIndi,
    addFamS,
    addFamC,
};
