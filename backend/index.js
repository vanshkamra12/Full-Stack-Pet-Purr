require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const petRouter = require('./router/PetRoute');
const AdoptFormRoute = require('./router/AdoptFormRoute');
const AdminRoute = require('./router/AdminRoute');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/pets', petRouter);        // Added explicit base path '/pets'
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);

mongoose.connect(process.env.mongooseURL)
    .then(() => {
        console.log('Connected to DB');
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Listening on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed. Server not started.", err);
        process.exit(1);
    });

module.exports = app;
