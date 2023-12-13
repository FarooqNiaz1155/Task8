const express = require('express');
const app = express();
const router = express.Router();

const passwordStrength = require('./passwordStrengthRoutes');
const ecommerceRoutes = require('./ecommerceRoutes');

app.use('/PassStrength', passwordStrength);
app.use('/ecom', ecommerceRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
