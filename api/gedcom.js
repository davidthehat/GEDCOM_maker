//generate gedcom file from database

const mongoCollections = require("../config/mongoCollections");
const fam = mongoCollections.fam;
const indi = mongoCollections.indi;
const { ObjectId } = require("mongodb");

function addIndi(file, i) {
    file.push("0 @I" + i._id + "@ INDI");
    file.push("1 NAME " + i.name);
    file.push("1 BIRT");
    file.push("2 DATE " + i.birthday);
    file.push("1 FAMC @F" + i.famC + "@");
    file.push("1 FAMS @F" + i.famS + "@");
}

function addFam(file, f) {
    file.push("0 @F" + f._id + "@ FAM");
    file.push("1 HUSB @I" + f.husb + "@");
    file.push("1 WIFE @I" + f.wife + "@");
    file.push("1 CHIL @I" + f.chil + "@");
    file.push("1 MARR");
    file.push("2 DATE " + f.marr);
    if (f.div != null) {
        file.push("1 DIV");
        file.push("2 DATE " + f.div);
    }
}

async function generateFile() {
    const indiCollection = await indi();
    const famCollection = await fam();
    const indiList = await indiCollection.find({}).toArray();
    const famList = await famCollection.find({}).toArray();
    let file = [];
    file.push("0 HEAD", "1 SOUR GEDCOM_maker");

    //todo fill in info from database
    for (let i of indiList) {
        addIndi(file, i);
    }

    for (let f of famList) {
        addFam(file, f);
    }
    
    file.push("0 TRLR");
    return file.join("\n");
}

module.exports = {
    generateFile
};
