const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON requests

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const sequelize = require('./config/config');

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));
