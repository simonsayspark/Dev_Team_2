require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const employeesRoutes = require('./routes/employees');
const companiesRoutes = require('./routes/companies');
const ceoRoutes = require('./routes/ceo');
const claimsRoutes = require('./routes/claims');

const createModelsMiddleware = require('./middleware/model-middleware');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors()) // This has to be before any routes
app.use(createModelsMiddleware);

// Enable JSON parsing
app.use(express.json())

// Connect to mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.MYSQL_CLOUD_HOST,
  user: process.env.MYSQL_CLOUD_USER,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
})

connection.connect()

// API routes
app.use('/employees', employeesRoutes);
app.use('/companies', companiesRoutes);
app.use('/ceo', ceoRoutes);
app.use('/claims', claimsRoutes);

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})