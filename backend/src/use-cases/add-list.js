const { ChecklistDAO } = require("../db-access");

//!##################
// const { makeTodo } = require("../domain/Todo");

//!##################
function addList(list) {
    // const list = makeTodo({ fields });
    return ChecklistDAO.addList(list);
}

module.exports = {
    addList,
};
