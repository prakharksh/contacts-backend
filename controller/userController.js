const asyncHandler = require("express-async-handler");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const process = require("process");
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await users.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    const user = await users.create({ username, email, password });
    res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
 const { email, password,username } = req.body;
 const filter = email ? { email } : { username };
 if (!(email || username) || !password) {
     res.status(400);
    throw new Error("All fields are mandatory");
 }
 const user = await users.findOne(filter);
    if (!user) {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
    else if (user && (user.password === password && (user.email === email || user.username === username))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken: accessToken });
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

module.exports = { registerUser, loginUser };