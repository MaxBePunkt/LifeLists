const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { toggleCheckListDone } = require("../db-access/checklist-dao");
const { resetChecklist, editChecklist } = require("../db-access/checklist-dao");
const { addList } = require("../use-cases/add-list");
const { removeList } = require("../use-cases/remove-list");
const { showAllLists } = require("../use-cases/show-all-lists");
const { showOneListsById } = require("../use-cases/show-one-list-by-id");

const listsRouter = express.Router(); // Controller

listsRouter.get("/all", async (_, res) => {
    try {
        const lists = await showAllLists();
        res.json(lists);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.toString() || "Internal Server Error.",
        });
    }
});
listsRouter.get("/one/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const lists = await showOneListsById(id);
        res.json(lists);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.toString() || "Internal Server Error.",
        });
    }
});
listsRouter.put("/toggle", async (req, res) => {
    const listId = req.body.listId;
    const checkpointId = req.body.checkpointId;
    const status = req.body.status;
    try {
        const updatedList = await toggleCheckListDone({
            listId,
            checkpointId,
            status,
        });
        res.json(updatedList);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.toString() || "Internal Server Error.",
        });
    }
});
listsRouter.put("/reset", async (req, res) => {
    const listId = req.body.listId;
    try {
        const updatedList = await resetChecklist(listId);
        // console.log(updatedList);
        res.json(updatedList);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.toString() || "Internal Server Error.",
        });
    }
});
listsRouter.put("/edit", async (req, res) => {
    const listId = req.body.listId;
    const editList = {
        title: req.body.name,
        description: req.body.description,
        thumbnailImage: req.body.imageURL,
        createdAt: Date.now(),
        checkpoints: req.body.checkpoints.map((point) => {
            return { id: uuidv4(), title: point, checked: false };
        }),
    };
    try {
        const updatedList = await editChecklist(listId, editList);
        // console.log(updatedList);
        res.json(updatedList);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.toString() || "Internal Server Error.",
        });
    }
});

listsRouter.post("/add", (req, res) => {
    if (!req.body) {
        res.status(400).json({ error: "Please include a List" }); // 400 ==> Bad request
        return;
    }
    const newList = {
        title: req.body.name,
        description: req.body.description,
        thumbnailImage: req.body.imageURL,
        createdAt: Date.now(),
        checkpoints: req.body.checkpoints.map((point) => {
            return { id: uuidv4(), title: point, checked: false };
        }),
    };

    addList(newList)
        .then((addedList) => res.status(201).json(addedList)) // 201 => Created
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to add list to database." });
        });
});

listsRouter.delete("/delete/:id", (req, res) => {
    const listId = req.params.id;
    removeList({ listId })
        .then((removedList) => res.json({ removedList }))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to remove list." });
        });
});

module.exports = {
    listsRouter,
};
