const express = require('express');
const knex = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await knex.select('*').from('contacts');
        res.json(contacts);
    } catch (err) {
        res.status(500).send('Failed to fetch contacts');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
