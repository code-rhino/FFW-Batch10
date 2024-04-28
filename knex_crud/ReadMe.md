# Knex -Crud

[Video](https://vimeo.com/940491601/fdaa248cf7?share=copy)

## Before you start run

```
npx knex migrate:latest
npx knex seed:run
```

### Understanding Dynamic Queries in CRUD Operations

**Why Dynamic Queries are Important**

In CRUD (Create, Read, Update, Delete) operations, dynamic queries are essential for building flexible and efficient applications. They allow the application to adjust SQL queries based on runtime conditions such as user inputs or application states. This flexibility is crucial for handling diverse user requests without hardcoding every possible query scenario. Dynamic queries help in providing personalized user experiences and improving the application's capability to handle complex, variable data retrieval requests efficiently.

**Step-by-Step Guide to Implementing Dynamic Queries with Knex in an Express App**

In this example, we'll demonstrate how to implement dynamic queries in a Node.js Express application using Knex to interact with a PostgreSQL database. We'll focus on a products endpoint where users can filter products by maximum price and sort them.

### Setup

1. **Initialize Your Node.js Application:**
   - Create a new directory for your project and initialize it with Node.js:

```bash
mkdir my-dynamic-query-app
cd my-dynamic-query-app
npm init -y
```

2. **Install Required Packages:**
   - Install Express and Knex along with a PostgreSQL client:

```bash
npm install express knex pg
```

3. **Setup Knex:**
   - Set up Knex with the correct database configuration. Create a new file `knexfile.js` and adjust it to your database settings.
   - Initialize your database connection in a file named `connection.js` inside a folder called `db`:

```javascript
// db/connection.js
const knex = require('knex');
const configuration = require('../knexfile').development;
const database = knex(configuration);

module.exports = database;
```

4. **Create an Express Server:**
   - Set up your basic server in `app.js`:

```javascript
const express = require('express');
const knex = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

### Implementing Dynamic Query

5. **Create the Dynamic Query Function:**
   - Add a function that dynamically builds the query based on input parameters:

```javascript
function fetchProducts(filter, sortBy, sortOrder = 'asc') {
    let query = knex('products').select('*');

    if (filter && filter.maxPrice) {
        query = query.where('price', '<=', filter.maxPrice);
    }
    if (sortBy) {
        query = query.orderBy(sortBy, sortOrder);
    }
    return query;
}
```

6. **Create an Endpoint to Use the Dynamic Query:**
   - Add a route in `app.js` that uses the `fetchProducts` function:

```javascript
app.get('/products', (req, res) => {
const { maxPrice, sortBy, sortOrder } = req.query;
fetchProducts({ maxPrice }, sortBy, sortOrder)
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: err.message }));
});
```

### Testing the Application

7. **Run Your Server:**
   - Ensure your database is properly set up and run your server:

```bash
node app.js
```

8. **Test the Endpoint:**
   - Use a tool like Postman or your browser to test the `/products` endpoint. Try adding query parameters like `?maxPrice=500&sortBy=created_at&sortOrder=desc` to see how the dynamic queries function.

### Conclusion

By integrating dynamic queries into your CRUD operations, you allow your application to handle a variety of data retrieval requests effectively. This method is scalable and makes the application adaptable to changing requirements without needing constant modifications to the query logic.