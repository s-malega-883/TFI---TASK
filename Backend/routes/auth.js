const express = require('express');

const{ body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');
// const t = require('../models/user');

const authController = require('../controllers/auth');

router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),

        body('email').isEmail().withMessage('Please enter a valid email')
        .custom(async (email) => {
            const user = await User.find('email');
            console.log("Hii");
            // const user = await t.find(email);
            if(user[0].length > 0)
                {return Promise.reject('Email address already exists');
                }
        })
        .normalizeEmail(),

        body('password').trim().isLength({min: 7}),
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;