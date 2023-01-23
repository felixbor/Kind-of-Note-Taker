
const router = require('express').Router();
// adding uuid module to create unique id  for each note
const { v4: uuidv4 } = require('uuid');
const path = require('path');
//const db = require('../db/db.json');
const fs = require('fs');

router.get('/notes', (req, res) => {
    console.log('here')
  fs.readFile("db/db.json", (err, data) => {
    console.log(JSON.parse(data))
    res.json(JSON.parse(data))    
  })
})
 
router.post('/notes', (req, res) => {
        console.log(req.body);
      let db =JSON.parse(fs.readFileSync('db/db.json',{encoding:"utf8"}))
        db.push(req.body);
        console.log(db)
        //adding unique identifier
        req.body.id = uuidv4();
        fs.writeFileSync( 'db/db.json',
            JSON.stringify(db , null, 2)
        );
    
        res.json(req.body);
    });

    router.delete('/notes/:id', (req, res) => {
        // reading notes form db.json
        let notes =JSON.parse(fs.readFileSync('db/db.json',{encoding:"utf8"}))
        //console.log(typeof notes)
       // console.log(notes)
        // removing note with id
        let updatedNotes = notes.filter(item => item.id !== req.params.id);
       // console.log(updatedNotes)
        // Rewriting/saving filtered  notes to db.json
        fs.writeFileSync('db/db.json', JSON.stringify(updatedNotes));
        res.json(updatedNotes);

        })

    
module.exports = router;