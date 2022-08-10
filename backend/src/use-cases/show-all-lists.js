const { ChecklistDAO } = require("../db-access");

async function showAllLists() {
    const lists = await ChecklistDAO.getAllLists();
    return lists;
    // return lists.map((list) => ({
    //     id: list._id,
    //     task: list.task,
    //     done: list.done,
    //     // createdAt lasse ich aus..., weil es eine sensetive information ist
    // }));
}

module.exports = {
    showAllLists,
};
