const express = require('express');
const sequelize = require('./config/config');
const verifyToken = require('./middleware/verifyToken');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON requests

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

app.use('/api/protected-route', verifyToken, (req, res) => {
  res.send("You are authenticated");
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




