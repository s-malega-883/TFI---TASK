const{ validationResult } = require('express-validator');

const Volunteer = require('../models/volunteer');

exports.fetchAll = async(req,res,next) => {
    try
    {
        const [allVolunteer] = await Volunteer.fetchAll();
        res.status(200).json(allVolunteer);

    } catch (err)
    {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postVolunteer = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return;

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const city = req.body.city;
    const languages = req.body.languages;
    const availability = req.body.availability;

try{
    const volunteer = {
        name: name,
        email: email,
        phone: phone,
        city: city,
        languages: languages,
        availability: availability
    };

    const result = await Volunteer.save(volunteer);

    res.status(201).json({ message: 'Posted the volunteer list!'});

} catch(err){
    if(!err.statusCode){
        err.statusCode = 500;
    }
    next(err);
}
};