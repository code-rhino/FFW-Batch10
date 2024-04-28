# Knex Join

[Video](https://vimeo.com/940516842/9545cee73a?share=copy)

## Before you start run

```
npx knex migrate:latest
npx knex seed:run
```

### Overview

This code snippet is part of an Express server route that handles HTTP GET requests. It fetches data from a PostgreSQL database using Knex, a SQL query builder for JavaScript. The endpoint aggregates data from three tables: `shows`, `shows_actors`, and `actors`. It returns a list of shows along with the names of actors in those shows, sorted by the show titles.

### Detailed Code Explanation

1. **Route Definition:**
   ```javascript
   app.get('/shows-with-actors', async (req, res) => {
   ```
   - `app.get(...)`: Defines a route handler for HTTP GET requests.
   - `/shows-with-actors`: The URL path that triggers this route.
   - `async (req, res) => {...}`: An asynchronous function that handles the request (`req`) and response (`res`). The use of `async` allows for `await` inside the function.

2. **Database Query with Knex:**
   ```javascript
   const showsWithActors = await knex('shows as s')
       .join('shows_actors as sa', 's.id', 'sa.show_id')
       .join('actors as a', 'sa.actor_id', 'a.id')
       .select('s.title', 'a.name as actor')
       .orderBy('s.title', 'asc');
   ```
   - `knex('shows as s')`: Initializes a query on the `shows` table, aliasing it as `s`.
   - `.join('shows_actors as sa', 's.id', 'sa.show_id')`: Performs an inner join with the `shows_actors` table (aliased as `sa`). The join condition is that the `id` from `shows` matches the `show_id` from `shows_actors`.
   - `.join('actors as a', 'sa.actor_id', 'a.id')`: Another inner join, this time with the `actors` table (aliased as `a`). The condition here is that the `actor_id` from `shows_actors` matches the `id` from `actors`.
   - `.select('s.title', 'a.name as actor')`: Specifies the columns to retrieve — the show title from `shows` and the actor name from `actors`, renaming the actor name column to `actor`.
   - `.orderBy('s.title', 'asc')`: Orders the results by the show title in ascending order.

3. **Sending the Response:**
   ```javascript
   res.json({ data: showsWithActors });
   ```
   - `res.json(...)`: Sends a JSON response containing the retrieved data. This method automatically sets the Content-Type header to `application/json`.

4. **Error Handling:**
   ```javascript
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
   ```
   - The `try...catch` structure handles any errors that occur during the database query execution.
   - `res.status(500).json(...)`: If an error occurs, the server responds with a status code of 500 (Internal Server Error) and sends the error message in the response body.

### Conclusion

This route provides a way to fetch joined data from a relational database using Knex's fluent interface to build SQL queries. The result is a list of shows and their actors, simplifying data retrieval for frontend applications where such combined data might be necessary for display.