const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// function to contain API requests
module.exports = function(app) {

    // GET api
    app.get('/api/notes', (req,res) => {
        // read the db.json file and send it to GET response
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
        res.json(data);
    });

    // POST api
    app.post('/api/notes', (req, res) => {
        // pull newNotes from the body of the request
        const newNotes = req.body;
        
        // uses uuid to create a random unique id
        newNotes.id = uuidv4();
        
        // read db.json file and push newNotes 
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
        data.push(newNotes);

        // write notes data to db.json and send response
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data));
        res.json(data);
    });

    // DELETE api
    app.delete('/api/notes/id', (req, res) => {
        // finding the id to be deleted
        let noteId = req.params.id.toString();

        // read db.json data and filter through the notes to get all of them except the note to be deleted
        let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
        const newData = data.filter(note => note.id.toString() !== noteId);

        // write newData to db.json, and send response
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(newData));
        res.json(newData);
    });
};