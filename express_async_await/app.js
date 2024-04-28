const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/posts', async (req, res) => {
    const userId = req.query.userId;

    try{
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await axios.get(url);
        console.log(userId)
        const filterData = response.data.filter(post => post.userId.toString() === userId);

        if(filterData.length > 0){
            res.json(filterData);
        }else{
            res.json({})
        }
    }catch(error){
        res.status(500).json({error:'failed to get data'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});