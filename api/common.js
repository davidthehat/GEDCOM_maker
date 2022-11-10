const mongoCollections = require("../config/mongoCollections");
const fam = mongoCollections.fam;
const indi = mongoCollections.indi;
const famApi = require("./fam");
const indiApi = require("./indi");
const { ObjectId } = require("mongodb");

function generateBirthday(p1birthday, p2birthday, marraigeDate, count) {
    let cdate;
    if (marraigeDate != null) {
        cdate = marraigeDate;
        // return new Date(marriageDate.getFullYear() + 25);
    }
    
    if (p1birthday == null && p2birthday == null) {
        cdate = new Date();
    } else if (p2birthday != null) {
        cdate = new Date(p2birthday.getFullYear() + 25);
    } else {
        cdate = new Date(p1birthday.getFullYear() + 25);
    }
    cdate.setFullYear(cdate.getFullYear() + count);
    return cdate;
    
}

async function generateChild(famId, name, birthday, deathdate) {
    if (famId == null) throw "Family ID is null";
    if (name == null) name = "John";
    
    const famCollection = await fam();
    const famList = await famCollection.findOne({ _id: ObjectId(famId.toString()) });
    if (famList == null) throw "Family ID is not found";
    console.log(famList);

    if (birthday == null) birthday = generateBirthday(famList.husb.birthday, famList.wife.birthday, famList.marr, famList.chil.length);
    //ok for deathdate null, just pass on

    
    let indiId = await indiApi.createIndi(name, birthday, deathdate, [], famId);
    console.log(indiId);
    famApi.addChil(famId, indiId);
}

async function generateNuplets(famId, n){
    for (let i = 0; i < n; i++) {
        await generateChild(famId, null, null, null); //todo generate unique names etc
    }
}
    
async function marry(p1Id, p2Id, marr) {
    let famId = await famApi.createFam(p1Id, p2Id, [], marr, null);
    indiApi.addFamS(p1Id, famId);
    indiApi.addFamS(p2Id, famId);
    console.log("famId: " + famId);
    console.log("p1Id: " + p1Id);
    console.log("p2Id: " + p2Id);
    return famId;
}

async function divorce(famId, div) {
    famApi.addDiv(famId, div);
}

module.exports = {
    generateChild,
    generateNuplets,
    marry,
    divorce
};
