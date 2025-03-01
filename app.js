const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: '47.129.191.238',
    user: 'ved',
    password: 'Stark@2000',  // Replace with your MySQL password
    database: 'vehicle_db',
    port: 3306, // MySQL port
    ssl: false,  // If you're not using SSL, set this to false
    allowPublicKeyRetrieval: true // Allow public key retrieval
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Add Entry
app.post('/add-entry', (req, res) => {
    const { vehicle_no, driver_name, total_bags, good_bags, good_bags_weight, bad_bags, bad_bags_weight, in_time } = req.body;

    const sql = `INSERT INTO entries (vehicle_no, driver_name, total_bags, good_bags, good_bags_weight, bad_bags, bad_bags_weight, in_time)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [vehicle_no, driver_name, total_bags, good_bags, good_bags_weight, bad_bags, bad_bags_weight, in_time], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Fetch Entries (for Admin Panel)
app.get('/entries', (req, res) => {
    db.query('SELECT * FROM entries', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Delete Entry
app.post('/delete-entry', (req, res) => {
    const { id } = req.body;
    db.query('DELETE FROM entries WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/admin');
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// Update Entry
app.post('/update-entry', (req, res) => {
    const { id, vehicle_no, driver_name, total_bags, good_bags, good_bags_weight, bad_bags, bad_bags_weight, in_time } = req.body;

    const sql = `UPDATE entries SET 
                 vehicle_no = ?, 
                 driver_name = ?, 
                 total_bags = ?, 
                 good_bags = ?, 
                 good_bags_weight = ?, 
                 bad_bags = ?, 
                 bad_bags_weight = ?, 
                 in_time = ? 
                 WHERE id = ?`;

    db.query(sql, [vehicle_no, driver_name, total_bags, good_bags, good_bags_weight, bad_bags, bad_bags_weight, in_time, id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});
