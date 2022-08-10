const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function getAllLists() {
    const db = await getDB();
    const all = await db
        .collection("list")
        .find()
        .sort({ createdAt: -1 })
        .toArray();

    return all;
}

async function getOneListById(id) {
    const db = await getDB();
    const foundList = await db
        .collection("list")
        .findOne({ _id: new ObjectId(id) });
    return foundList;
}

async function toggleCheckListDone({ listId, checkpointId, status }) {
    const db = await getDB();
    const result = await db.collection("list").findOneAndUpdate(
        { _id: ObjectId(listId), "checkpoints.id": checkpointId }, // query/filter (aka. was soll geupdated werden?)
        { $set: { "checkpoints.$.checked": !status } }, // updateInfo
        { returnDocument: "after" }
    );

    if (result.ok === 1) {
        return result.value;
    } else {
        return { msg: "Error updating list." };
    } // custom error message ? oder vlt nur result
}

async function resetChecklist(listId) {
    const db = await getDB();
    const result = await db.collection("list").findOneAndUpdate(
        { _id: ObjectId(listId) }, // query/filter (aka. was soll geupdated werden?)
        { $set: { "checkpoints.$[].checked": false } },
        // updateInfo
        { returnDocument: "after" }
    );
    console.log(result);
    if (result.ok === 1) {
        return result.value;
    } else {
        return { msg: "Error updating list." };
    } // custom error message ? oder vlt nur result
}
async function editChecklist(listId, editList) {
    const db = await getDB();
    const result = await db.collection("list").findOneAndUpdate(
        { _id: ObjectId(listId) }, // query/filter (aka. was soll geupdated werden?)
        { $set: editList },
        // updateInfo
        { returnDocument: "after" }
    );
    console.log(result);
    if (result.ok === 1) {
        return result.value;
    } else {
        return { msg: "Error updating list." };
    } // custom error message ? oder vlt nur result
}

async function addList(list) {
    const db = await getDB();
    const newList = await db.collection("list").insertOne(list);
    return list;
}

async function removeList(listId) {
    const db = await getDB();
    const deletedList = await db
        .collection("list")
        .findOneAndDelete({ _id: ObjectId(listId) });
    return deletedList;
}

module.exports = {
    getAllLists,
    getOneListById,
    toggleCheckListDone,
    resetChecklist,
    editChecklist,
    addList,
    removeList,
};
