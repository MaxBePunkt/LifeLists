const { ChecklistDAO } = require("../db-access");

function removeList({ listId }) {
    return ChecklistDAO.removeList(listId);
}

module.exports = {
    removeList,
};
