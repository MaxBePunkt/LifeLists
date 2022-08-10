const { ChecklistDAO } = require("../db-access");

async function showOneListsById(id) {
    const list = await ChecklistDAO.getOneListById(id);
    return list;
    // return lists.map((list) => ({
    //     id: list._id,
    //     task: list.task,
    //     done: list.done,
    //     // createdAt lasse ich aus..., weil es eine sensetive information ist
    // }));
}

module.exports = {
    showOneListsById,
};
