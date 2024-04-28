# Knex connect to database

[Video](https://vimeo.com/940424113/38efaf2347?share=copy)

To connect a Node.js application to a PostgreSQL database using the Knex library, you will need to follow several steps to set up the necessary configurations and dependencies. Here is a step-by-step guide based on the provided transcript:

### Step 1: Install Necessary Libraries
1. **Stop your Node.js application** if it's currently running.
2. **Open your terminal** and navigate to your project directory.
3. **Install Knex and PostgreSQL Node.js Client**:
   ```bash
   npm install knex pg
   ```
4. **Install dotenv** for managing environment variables:
   ```bash
   npm install dotenv
   ```

### Step 2: Configure Environment Variables
1. **Create a `.env` file** at the root of your project directory.
2. **Add the PostgreSQL connection string** to the `.env` file:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/my_database
   ```
   Replace `username`, `password`, and `my_database` with your actual PostgreSQL credentials and database name.

### Step 3: Set Up Knex Configuration
1. **Create a Knex configuration file** (commonly `knexfile.js`) in the root directory:
   ```javascript
   // knexfile.js
   require('dotenv').config();

   module.exports = {
       development: {
           client: 'postgresql',
           connection: process.env.DATABASE_URL,
       }
   };
   ```
2. **Create a connection file** under a directory, typically named `db`. Inside this directory, create `connection.js`:
   ```javascript
   // db/connection.js
   const environment = process.env.NODE_ENV || 'development';
   const config = require('../knexfile')[environment];
   const knex = require('knex')(config);

   module.exports = knex;
   ```

### Step 4: Update Your Application
1. **Modify your main application file** (e.g., `app.js`) to use the Knex connection:
   ```javascript
   // app.js
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
   ```

### Step 5: Test the Database Connection
1. **Restart your Node.js application**:
   ```bash
   node app.js
   ```
2. **Access your application via a web browser** or a tool like Postman at `http://localhost:3000`. You should see a message indicating whether the database connection was successful.

### Additional Notes:
- Make sure your PostgreSQL database is up and running and accessible with the credentials you provided in the `.env` file.
- If you encounter any connection issues, verify your database URL and ensure that PostgreSQL allows connections from your application.

By following these steps, your Node.js application should successfully connect to a PostgreSQL database using Knex, and you should be able to manage database interactions securely and efficiently.