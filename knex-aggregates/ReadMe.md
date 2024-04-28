# Aggregates with Knex and JavaScript
[Video](https://vimeo.com/940507895/43ebd8268d?share=copy)

## Before you start run

```
npx knex migrate:latest
npx knex seed:run
```

### Step-by-Step Guide: Implementing Weekly Temperature Averages

**Objective:** Create an endpoint in an Express.js application using Knex.js to calculate the average temperature over a specified week or the past week if no specific date is provided. This tutorial demonstrates how to handle dynamic queries based on user input for date and perform aggregate operations in a database.

**Why Aggregate Data?**
Aggregating data is essential when you need to derive meaningful insights by summarizing or performing calculations over sets of data. For instance, calculating the weekly average temperature helps in understanding climate trends over a specific period.

### Step 1: Setup Your Environment

Make sure you have Node.js, Express, and Knex set up in your project along with a connection to a PostgreSQL database. Your `knex` configuration should connect to a database that includes a `daily_temperatures` table with `date` and `temperature` columns.

### Step 2: Create an Express Server

Initialize your Express application if you haven't already:

```javascript
const express = require('express');
const knex = require('./db/connection'); // adjust path as needed

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
```

### Step 3: Implement the Endpoint

You'll create an endpoint `/weekly-temperature-average` that can optionally take a `date` query parameter. If the date is provided, it calculates the average from that date to one week prior. If no date is provided, it uses the current date.

**3.1 Define the Route**

Add this code to your server file:

```javascript
app.get('/weekly-temperature-average', async (req, res) => {
    try {
        let { date } = req.query; // Capture the date from query parameters
        let startDate = date ? new Date(date) : new Date();

        if (!date) {
            startDate.setDate(startDate.getDate() - 7); // Set to 7 days ago if no date provided
        }

        const formattedDate = startDate.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD

        const results = await knex('daily_temperatures')
            .where('date', '>=', formattedDate)
            .avg('temperature as averageTemperature'); // Calculate the average temperature

        if (results.length > 0 && results[0].averageTemperature !== null) {
            res.json({
                startDate: formattedDate,
                averageTemperature: results[0].averageTemperature
            });
        } else {
            res.status(404).json({ message: 'No temperature data available for the specified week.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

**3.2 Explain the Code**

- **Date Handling:** The endpoint checks if a `date` is provided. If it is, it parses the date; if not, it defaults to today's date and calculates the date from a week ago.
- **Query Building:** Using Knex, it constructs a query to fetch the average temperature from the `daily_temperatures` table starting from the `formattedDate`.
- **Response:** It responds with the average temperature or an error message if no data is found or if an error occurs.

### Step 4: Run the Server

Add this to the bottom of your server file to start the server:

```javascript
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

### Step 5: Testing the Endpoint

Start your server and navigate to `http://localhost:3000/weekly-temperature-average?date=2024-05-04` to see the average temperature from that date to one week prior. Adjust the date as needed or omit it to use the current date.

### Summary

This guide provides a clear step-by-step process to handle dynamic queries and aggregate functions in a PostgreSQL database using Knex and Express. This functionality is vital for applications that require data analysis over specific periods, such as environmental monitoring systems.