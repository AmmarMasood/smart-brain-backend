const Clarifai = require('clarifai');
//You must add your own API key here from Clarifai.
const app = new Clarifai.App({apiKey: 'e386c1c0a99a4ad494b214cb9b735a7a'});

const handleApiCalls = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data => {
    res.json(data)
  }).catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id).increment('entries', 1).returning('entries').then(entries => {
    res.json(entries[0]);
  }).catch(err => {
    res.status(400).json('cant find user');
  })
}
module.exports = {
  handleImage: handleImage,
  handleApiCalls: handleApiCalls
}
