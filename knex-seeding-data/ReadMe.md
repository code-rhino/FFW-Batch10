# Knex Seeding data

[Video](https://vimeo.com/940483206/390fd2b56b?share=copy)

## Before getting started

Do not forget to run the migration to set the tables up.

```
npx knex migrate:latest   
```

To pre-populate data into your database for a phone book application using Knex, follow this step-by-step guide. This process involves creating a seed file and using it to insert predefined contact information into your contacts table.

### Step 1: Set Up Your Environment

Ensure your Node.js environment is ready, and Knex is set up to connect to your PostgreSQL database. Make sure your `contacts` table is already created in your database as part of your migration process.

### Step 2: Create a Seed File

Use Knex's command-line interface to generate a seed file. This file will contain the data you want to pre-populate in your database.

1. **Open your terminal.**
2. **Navigate to your project directory.**
3. **Generate a seed file** for your contacts:
   ```bash
   npx knex seed:make 01-contacts
   ```
   This command creates a seed file named `01-contacts.js` (or similar, depending on how Knex formats the filename with a timestamp) in the `seeds` directory specified in your `knexfile.js`.

### Step 3: Modify the Seed File

Open the newly created seed file in your code editor and modify it to include the contact data you want to seed into your database.

1. **Edit the seed file (`01-contacts.js`):**
   Replace the placeholder content with the actual data for the contacts. Here’s an example of what the file might look like:

   ```javascript
   /**
    * @param { import("knex").Knex } knex
    * @returns { Promise<void> }
    */
   exports.seed = async function(knex) {
     // Deletes ALL existing entries
     await knex('contacts').del();
     // Inserts new entries
     await knex('contacts').insert([
       {name: 'John Doe', phone_number: '555-1234', address: '123 Elm St'},
       {name: 'Jane Smith', phone_number: '555-5678', address: '456 Oak St'},
       {name: 'Jim Bean', phone_number: '555-8765', address: '789 Pine St'}
     ]);
   };
   ```

   This script first deletes all existing entries in the `contacts` table to prevent duplicates and then inserts new entries.

### Step 4: Run the Seed Script

Execute the seed script to populate your database with the new data.

1. **Run the seed command:**
   ```bash
   npx knex seed:run
   ```
   This command executes all seed files in the order they are named, populating your database with initial data.

### Step 5: Verify the Data

After running the seed script, start your application or use a database tool to check that the data has been correctly inserted into your `contacts` table.

1. **Start your Node.js application:**
   ```bash
   node app.js
   ```
2. **Navigate to the contacts URL** in your web browser or API testing tool to confirm that the seeded data is being correctly retrieved and displayed.

### Step 6: Troubleshooting

If you encounter issues:
- Ensure that your database connection details in `knexfile.js` are correct.
- Verify that the table name in the seed file matches the actual table name in your database.
- Check for any syntax errors in the JavaScript code of your seed file.

By following these steps, you've successfully pre-populated your phone book application's database with initial data using Knex, making it ready for use right from the start. This approach is particularly useful during development and testing phases to work with realistic data.