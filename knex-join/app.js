const express = require('express');
const knex = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/shows-with-actors', async (req, res)=>{
    try{
        const showsWithActors = await knex('shows as s')
        .join('shows_actors as sa', 's.id', 'sa.show_id')
        .join('actors as a', 'sa.actor_id', 'a.id')
        .select('s.title', 'a.name as actor')
        .orderBy('s.title', 'asc');

        res.json({
            data:showsWithActors
        })
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
