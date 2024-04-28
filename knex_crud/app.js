const express = require('express');
const knex = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function fetchProducts(filter, sortBy, sortOrder = 'asc'){
    let query = knex('products').select('*');
    if(filter){
        if(filter.maxPrice){
            query = query.where('price', '<=', filter.maxPrice);
        }
        if(sortBy){
            query = query.orderBy(sortBy, sortOrder);
        }
    }
    return query;
}

app.get('/products', (req, res)=>{
    const { maxPrice, soryBy, sortOrder} = req.query;
    fetchProducts({maxPrice}, soryBy, sortOrder)
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});