const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/Blog';

// Connect to MongoDB
mongoose.connect(URL)
.then(() => {
    console.log("Database is connected");
})
.catch((err) => {
    console.log("Error connecting to the database", err);
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for connection
db.on('connected', () => {
    console.log("Database is connected");
});

db.on('disconnected', () => {
    console.log("Database is disconnected");
});

db.on('error', (err) => {
    console.log("Internal error", err);
});

module.exports = db;
