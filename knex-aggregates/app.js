const express = require('express');
const knex = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/temperatures', async (req, res) => {
    try {
        const temperatures = await knex('daily_temperatures').select('*');
        res.json({
            data: temperatures
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/weekly-temperature-average', async(req, res)=>{
    try{
        let {date} = req.query;
        const startDate = date ? new Date(date) : new Date();
        if(!date){
            startDate.setDate(startDate.getDate - 7);
        }
        const formattedDate = startDate.toISOString().split('T')[0];

        const results = await knex('daily_temperatures')
            .where('date', '>=', formattedDate)
            .avg('temperature as averageTemperature')
        if(results.length > 0 && results[0].averageTemperature !== null){
            res.json({
                startDate: formattedDate,
                averageTemperature: results[0].averageTemperature
            })
        }else {
            res.status(404).json({message: 'No temp data avail'});
        }
    }catch (error){
        res.status(500).json({error: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
