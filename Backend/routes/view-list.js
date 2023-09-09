const express = require('express');

const{ body } = require('express-validator');

const volunteerController = require('../controllers/volunteer');

const router = express.Router();

const auth = require('../middleware/auth');

const authController = require('../controllers/auth');

router.get('/', auth, volunteerController.fetchAll);

router.get('/view-list', volunteerController.fetchAll);

router.post(
    '/view-list',
    [   
        //auth,
        body('name').trim().not().isEmpty(),
        body('email').trim().not().isEmpty(),
        body('phone').trim().not().isEmpty(),
        body('city').trim().not().isEmpty(),
        body('languages').trim().not().isEmpty(),
        body('availability').trim().not().isEmpty(),
    ],
    // postsController.postPost
    volunteerController.postVolunteer
);

module.exports = router;