const router = require('express').Router();
let User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const banUser = async (req, res, next) => {
    try {
        const user = await User.findOne({username:req.params.username} );

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (user.banned === 'banned' && user.banExpirationDate && user.banExpirationDate > new Date()) {
            return res.status(403).json({ message: 'Access forbidden' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const ban = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.banned === 'active') {
            // Set ban expiration date based on selected duration
            const duration = req.body.duration;
            const banExpirationDate = new Date();

            if (duration === '2 months') {
                banExpirationDate.setMonth(banExpirationDate.getMonth() + 2);
                user.banduration = '2 months';
            } else if (duration === '4 months') {
                banExpirationDate.setMonth(banExpirationDate.getMonth() + 4);
                user.banduration = '4 months';
            } else if (duration === '6 months') {
                banExpirationDate.setMonth(banExpirationDate.getMonth() + 6);
                user.banduration = '6 months';
            } else if (duration === '1 year') {
                banExpirationDate.setFullYear(banExpirationDate.getFullYear() + 1);
                user.banduration = '1 year';
            } else if (duration === 'permanent') {
                banExpirationDate.setFullYear(3000);
                user.banduration = 'permanent';
            }

            user.banned = 'banned';
            user.banExpirationDate = banExpirationDate;
            user.reason = req.body.reason;
            const updatedUser = await user.save(); // Save the updated document to the database
            res.status(200).json({ message: 'User banned' });

        } else {
            user.banned = 'active';
            user.banExpirationDate = undefined;
            user.banduration = '';
            user.reason = '';
            await user.save();
            res.status(200).json({ message: 'User active' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const checkBanned = async (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (user.banned === 'banned' && user.banExpirationDate && user.banExpirationDate > new Date()) {
                // Redirect to user banned page if the user is banned
                return res.redirect('/user-banned');
            }

            // Call next middleware if the user is not banned
            return next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    // Call next middleware if there's no token
    return next();
};


module.exports = {
    banUser,
    ban,
    checkBanned
};



