const express = require('express')
const app = express()
const port = 8000

// Enable Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors()) // This has to be before any routes

// Enable JSON parsing
app.use(express.json())

// Connect to mysql
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'NotSoCoolPassword',
  database: 'DBUI'
})

connection.connect()

// API routes
app.post('/employees', async (req, res) => {
    const { name, password, role, company_id } = req.body;
    const query = `INSERT INTO employees (ename, epassword, role, company_id) VALUES ('${name}', '${password}', '${role}', ${company_id})`;
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send('Successfully added user!')
    })
})

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})