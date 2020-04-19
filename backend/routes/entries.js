// require express router and model
const router = require('express').Router();
const Entry = require('../models/entry.model');

// endpoint to handle http get requests on /entries/ url
router.route('/').get((req, res) => {
  // mongoose method gets list of all entries from mongoDB Atlas database
  Entry.find() 
  // return entries in json format
    .then(entries => res.json(entries)) 
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/happy').get((req, res) => {
  // mongoose method gets list of all happy entries from mongoDB Atlas database
  Entry.find(
    { happy: true }
  ) 
  // return entries in json format
    .then(entries => res.json(entries)) 
    .catch(err => res.status(400).json('Error: ' + err));
})

// endpoint to handle http post requests on entries/add url
router.route('/add').post((req, res) => {
  const content = req.body.content;
  const date = Date.parse(req.body.date);
  // create a new instance of entry
  const newEntry = new Entry ({
    date,
    content
  });
  // save new entry to database
  newEntry.save()
    .then(() => res.json('Entry added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

// /:id is a variable, object id created by mongodb
router.route('/:id').get((req, res) => {
  // gets info about entry with that specific id
  Entry.findById(req.params.id)
    // get entry and return is as json
    .then(entry => res.json(entry))
    .catch(err => res.status(400).json('Error: ' + err));
});

// same as previous but with delete
router.route('/:id').delete((req, res) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => res.json('entry deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  // get the entry by id
  Entry.findById(req.params.id)
    // assign the new info to the fields that already exist
    .then(entry => {
      entry.content = req.body.content;
      entry.date = Date.parse(req.body.date);
      // save in database
      entry.save()
        .then(() => res.json('Entry updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;