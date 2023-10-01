const User = require('../models/user.model');

module.exports.registerUser = (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    });

    newUser.save()
        .then(user => {
            console.log("User registered successfully");
            res.status(201).json(user);
        })
        .catch(err => {
            console.error("Error registering user:", err);
            if (err.code === 11000 && err.keyPattern.email) {
                res.status(400).json({ error: "Email is already registered." });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        });
};

module.exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ error: "User not found." });
            }

            if (password === user.password) {
                console.log("Login successful");
                res.status(200).json({ message: "Login successful" });
            } else {
                console.log("Authentication failed. Incorrect password.");
                res.status(401).json({ error: "Authentication failed. Incorrect password." });
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};
