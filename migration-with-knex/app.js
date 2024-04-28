const express = require('express');
const app = express();
const knex = require('./db/connection'); // Adjust the path as per your setup

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET route to fetch all suppliers
app.get('/', async (req, res) => {
  try {
    const suppliers = await knex.select('*').from('suppliers');
    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
