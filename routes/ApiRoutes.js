
const router = require('express').Router();
// adding uuid module to create unique id  for each note
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const db = require('../db/db.json');
const fs = require('fs');



router.get('/api/notes', (req, res) => {
        readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
      });

      
router.post('/api/notes', (req, res) => {
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


module.exports = router;