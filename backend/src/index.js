const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { listsRouter } = require("./routes/lists-router");
const { userRouter } = require("./routes/user-router");

const PORT = process.env.PORT || 1818;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ==== ROUTES ====
app.get("/", (_, res) => res.send("it works :)"));

// LISTS
app.use("/list", listsRouter);
// USER
app.use("/user", userRouter);

// 404 not found
app.use((_, res) => {
    res.status(404).json({ error: "Not found." });
});

app.listen(PORT, () => console.log("Server listening on port", PORT));

/*
Create <-> POST
Read <-> GET
Update <-> PUT
Delete <-> DELETE
*/
