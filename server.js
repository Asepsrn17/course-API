/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./app/models');
const authRoutes = require('./app/routes/authRoutes');
// const { errorHandler } = require('./app/middleware/errorHandler');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);

// app.use(errorHandler);

const PORT = process.env.PORT || 4000;

db.sequelize.authenticate().then(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});
