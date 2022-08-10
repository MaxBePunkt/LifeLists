const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

const usersCollectionName = "users-token";

async function findAll() {
    const db = await getDB();
    const result = await db.collection(usersCollectionName).find().toArray();
    return result;
}

async function findById(id) {
    const db = await getDB();
    const result = await db
        .collection(usersCollectionName)
        .findOne({ _id: ObjectId(id) });
    return result;
}

async function findByEmail(email) {
    const db = await getDB();
    const result = await db
        .collection(usersCollectionName)
        .findOne({ email: email });
    return result;
}

async function insertOne(userInfo) {
    const db = await getDB();
    const result = await db.collection(usersCollectionName).insertOne(userInfo);
    return result;
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    insertOne,
};
