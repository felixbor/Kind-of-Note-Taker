
const router = require('express').Router();
// adding uuid module to create unique id  for each note
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const db = require('../db/db.json');
const fs = require('fs');

router.get('/notes', (req, res) => {
    console.log('here')
  fs.readFile("db/db.json", (err, data) => {
    res.json(JSON.parse(data))    
  })
})
/*
router.get('/notes', (req, res) => {
        readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
      });
*/
router.post('/notes', (req, res) => {
        console.log(req.body);
    
        db.push(req.body);
        //adding unique identifier
        req.body.id = uuidv4();
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(db , null, 2)
        );
    
        res.json(req.body);
    });

    router.delete('/notes/:id', (req, res) => {
        // reading notes form db.json
        let notes = JSON.parse(fs.readFileSync('db/db.json'))
        // removing note with id
        let deleteNotes = notes.filter(item => item.id !== req.params.id);
        // Rewriting note to db.json
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);

        })

    
module.exports = router;