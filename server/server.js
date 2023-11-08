const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Pa55w0rd@localhost:5432/ccmanagement')

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/login', (req, res) => {
    res.json("testToken");
});

app.get('/clients', (req, res) => {
  db.any(`SELECT * FROM ccmanagement."Client"`).then(data => {
    res.status(200).json(data);
  }).catch(error => {
    res.send(error);
  });
});

app.get('/projects', (req, res) => {
  db.any(`SELECT * FROM ccmanagement."Project"`).then(data => {
    res.status(200).json(data);
  }).catch(error => {
    res.send(error);
  });
});

app.post('/newClient', (req, res) => {
  var newClientName = req.body.clientName;
  var newClientDes = req.body.clientDes;
  db.any('INSERT INTO ccmanagement."Client" (client_name, created_date, created_by, description) VALUES (${newClientName}, ${today}, ${createdBy}, ${newClientDes})', {
    today: new Date(),
    createdBy: 'PhuocN',
    newClientName: newClientName,
    newClientDes: newClientDes
  }).then(data => {
    res.status(200).json(data);
  }).catch(error => {
    res.send(error);
  });
});

app.listen(8080, () => console.log('Server is running'));