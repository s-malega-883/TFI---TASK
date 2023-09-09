const db = require('../util/database');

module.exports = class Volunteer{
    constructor(name, email, phone, city, languages, availability){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.languages = languages;
        this.availability = availability;

    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM volunteers');
    }

    static save(volunteer){
        return db.execute(
            'INSERT INTO volunteers (name, email, phone, city, languages, availability) VALUES (?,?,?,?,?,?)',
            [volunteer.name, volunteer.email, volunteer.phone, volunteer.city, volunteer.languages, volunteer.availability]
        );
    } 

};

