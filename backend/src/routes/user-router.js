const express = require("express");
const { registerUser } = require("../use-cases/register-user");
const { showAllUser } = require("../use-cases/show-all-users");
const { loginUser } = require("../use-cases/login-user");
const { doAuthMiddleware } = require("../auth/doAuthMiddleware");

const userRouter = express.Router(); // Controller

userRouter.get("/all", doAuthMiddleware, (_, res) => {
    showAllUser()
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: err.toString() || "Internal Server Error.",
            });
        });
});

userRouter.post("/login", (req, res) => {
    loginUser({
        email: req.body.email,
        password: req.body.password,
    })
        .then((token) => res.json({ token }))
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: err.toString() || "Internal Server Error.",
            });
        });
});

userRouter.post("/register", (req, res) => {
    registerUser(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: err.toString() || "Internal Server Error.",
            });
        });
});

module.exports = {
    userRouter,
};

/*


# Frontend Protected Sites Logic

In der APP js:
1. const [token, setToken] = useState(null)
2. <Route path="/dashboard" element={ <Dashboard token={token} />} />

In der Dashboard Component:
const Dashboard = (props) => {
    ...

    if(!props.token || token.length === 0) return <Navigate to="/login" />
    else return (
        <div>
            ... Dashboard ...
        </div>
    )
}


*/
