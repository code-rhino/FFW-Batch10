
# Knex Migrations

[Video](https://vimeo.com/940468996/3f171483e1?share=copy)

## Getting started 

There is some setup of this project to get it started, there is a table that needs to be created and the seed file. (Note - this is the complete version, if you want to set this up as a starter project rm `20240428181004_addPhoneNumberToSuppliers.js` from the migrations folder)

### Step 1: Create a `.env` File

- In the root directory of your project, create a `.env` file that will store your environment variables:
  - Open a text editor and add the necessary environment variables. Typically, this will include your database connection string and may look something like this:
    ```
    DATABASE_URL=postgres://username:password@localhost:5432/my_database
    ```
  - Replace `username`, `password`, and `my_database` with your actual PostgreSQL credentials and database name.

### Step 2: Run the Migration


- Run the first migration to set up your database schema. If this is the first time setting up the database, this will typically create tables or make other schema adjustments defined in the initial migration file:
  ```bash
  npx knex migrate:latest
  ```

## Tutorial

To follow along with the tutorial where you'll be adding a phone number column to an existing `suppliers` table using Knex migrations, here are the step-by-step instructions, including running the migrations, making adjustments, and rolling back when necessary.

### Step 1: Prepare Your Development Environment

1. **Clone the Repository**: If you haven't already, clone the repository containing the existing Node.js project with Knex configured.
2. **Install Dependencies**: Navigate to the project directory in your terminal and run:
   ```bash
   npm install
   ```
3. **Create a `.env` File**: In the root of your project directory, create a `.env` file (if not already present) and configure your database connection string. For example:

```
DATABASE_URL=postgres://username:password@localhost:5432/my_database
```

### Step 2: Create the Migration File

1. **Generate Migration File**:

```bash
npx knex migrate:make addPhoneNumberToSuppliers
```
   This command creates a new migration file in the `migrations` directory. The filename will include a timestamp and the description "addPhoneNumberToSuppliers".

### Step 3: Modify the Migration File

1. **Open the Migration File**: Find the newly created migration file in the `migrations` directory.
2. **Edit the Migration File** to add a new column to the `suppliers` table:

```javascript
// Up Migration
exports.up = function(knex) {
 return knex.schema.table('suppliers', function(table){
   table
   	.string('phone_number')
   	.nullable();
 });
};

// Down Migration
exports.down = function(knex) {
 return knex.schema.table('suppliers', function(table) {
   table.dropColumn('phone_number');
 });
};
```

### Step 4: Run the Migration

1. **Apply the Migration**:

```bash
npx knex migrate:latest
```
   This command runs the migration which adds the `phone_number` column to your `suppliers` table.

2. **Start Your Application**:

```bash
node app.js
```
   Check your application or database to confirm that the `phone_number` column has been added.

### Step 5: Roll Back the Migration

If you need to revert the changes:
1. **Roll Back the Migration**:
   ```bash
   npx knex migrate:rollback
   ```
   This command will undo the most recent batch of migrations, removing the `phone_number` column.

2. **Restart Your Application**:
   ```bash
   node app.js
   ```
   Verify that the `phone_number` column has been removed from the `suppliers` table.

### Step 6: Make Adjustments and Migrate Again 

If you need to adjust the migration, such as adding a default value or changing the column definition:

```
// Up Migration
exports.up = function(knex) {
 return knex.schema.table('suppliers', function(table){
  table
  .string('phone_number')
  .defaultTo('000-000-0000') // add this
  .nullable();
 });
};

```

1. **Roll Back the Migration** (if your app is running and the migration was applied):

```bash
npx knex migrate:rollback
```

2. **Adjust the Migration File** as necessary and save the changes.
3. **Re-run the Migration**:

```bash
npx knex migrate:latest
```

4. **Restart Your Application**:

```bash
node app.js
```
Check to ensure the adjustments are correct.

This sequence of steps will guide you through creating, applying, rolling back, and adjusting migrations using Knex in a Node.js project. This process ensures that your database schema changes are manageable, reversible, and trackable.