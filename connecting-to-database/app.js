const express = require('express');
const knex = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const result = await knex.raw('SELECT 1+1 AS result');
        res.send(`Database connection successful: ${result.rows[0].result}`);
      } catch (err) {
        res.status(500).send(`Database connection failed: ${err.message}`);
      }

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
