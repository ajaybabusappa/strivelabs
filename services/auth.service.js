const jwt = require('jsonwebtoken');
const { Models } = require('../models/modelValidations');

const User = Models.TenantModel;
const jwtSecret  =  "1246YTYYY"; //Change this to token secret

// User Registration
exports.register = async (req, res) => {
    const { username, password, storage_limit } = req.body;

    try {
        // Create new user directly with plain text password
        const newUser = await User.create({ username, password, storage_limit });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Username already exists.' });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password directly (not recommended for production)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.authorize = function () {
    return async (req, res, next) => {
        let response = {};
        let request = {
        };
        let token = req.header('Authorization');
        if (!token) {
            const errors = {
                error: "ACCESS_TOKEN_REQUIRED",
                dev_error: "Access token is required"
            }
            return res.status(401).send({
                response: response,
                request: request,
                errors: errors
            });
        }
        try {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length).trimLeft();
            }
            const verified = jwt.verify(token, jwtSecret);
            req.username = verified.username;
            req.id = verified.id;
            next();
        }
        catch (error) {
            const errors = {
                error: "INVALID_TOKEN",
                dev_error: "Invalid token"
            }
            
            return res.status(401).send({
                response: response,
                request: request,
                errors: errors
            });
        }
    };
};