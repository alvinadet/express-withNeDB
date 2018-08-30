const BodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(BodyParser.json());

const dataStore = require('nedb');
const db = new dataStore({ filename: '.data/data.json', autoload: true });

app.get('/', (req, res) => {
  res.send('Database ada!');
});

app.get('/api/list', (req, res) => {
  db.find({}, (err, done) => {
    if (err) throw err;
    res.send(done);
  });
});

app.get('/api/list/:id', (req, res) => {
  db.find({ _id: req.params.id }, {}, (err, done) => {
    if (err) throw err;
    res.send(done);
  });
});

app.post('/api/list', (req, res) => {
  const inputData = {
    nama: req.body.nama,
    umur: req.body.umur
  };
  db.insert(inputData, (err, done) => {
    if (err) throw err;
    res.send(done);
  });
});

app.delete('/api/list/', (req, res) => {
  db.remove({}, { multi: true }, (err, done) => {
    if (err) throw err;
    res.send('done');
  });
});

app.delete('/api/list/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, done) => {
    if (err) throw err;
    res.send('done');
  });
});

app.put('/api/list/:id', (req, res) => {
  const Data = {
    nama: req.body.nama,
    umur: req.body.umur
  };
  db.update({ _id: req.params.id }, Data, {}, (err, done) => {
    if (err) throw err;
    res.send('update berhasil');
  });
});

const listener = app.listen(8000, function() {
  console.log('server kamu di port ' + listener.address().port);
});
