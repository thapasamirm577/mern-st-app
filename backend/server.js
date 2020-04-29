let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const db = require('./database/connection');
const studentRoute = require('../backend/routes/student.route')

// Connecting mongoDB Database
db.connection(); 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// Express Route
app.use('/students', studentRoute);


// PORT
const port = process.env.PORT || 8010;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
