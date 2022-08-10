require("dotenv").config();
const { MongoClient } = require("mongodb");
let _db;
async function getDB() {
    if (_db) {
        return _db;
    }
    const url = process.env.DB_URL;
    const client = new MongoClient(url);
    const connected_client = await client.connect();
    _db = connected_client.db(process.env.DB_NAME || "myFirstDatabase");
    return _db;
}

module.exports = {
    getDB,
};
