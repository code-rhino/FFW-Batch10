# Express Async Await 

[Video](https://vimeo.com/940499835/8c7ffa46ee?share=copy)

### Step 1: Set Up the Server and Dependencies

First, ensure Node.js is installed. Then set up your project and install necessary modules:

1. **Initialize a New Node.js Project**:
    ```bash
    mkdir myProject
    cd myProject
    npm init -y
    ```

2. **Install Express and Axios**:
    ```bash
    npm install express axios
    ```

3. **Create a JavaScript File** (e.g., `app.js`):
    ```javascript
    const express = require('express');
    const axios = require('axios');

    const app = express();
    const PORT = process.env.PORT || 3000;
    ```

### Step 2: Define a Route

Add a route to your Express application that handles GET requests and extracts a `userId` from the query parameters:

```javascript
app.get('/posts', async (req, res) => {
    const userId = req.query.userId;
    // More code will follow in the next steps.
});
```

### Step 3: Make an API Request

Inside the route handler, use Axios to make an asynchronous GET request to an external API:

```javascript
const url = 'https://jsonplaceholder.typicode.com/posts';
try {
    const response = await axios.get(url);
    // Code for filtering and response will follow.
} catch (error) {
    res.status(500).json({ error: 'failed to get data' });
}
```

### Step 4: Process the Response

After receiving the data, filter it to find posts that match the `userId` provided:

```javascript
const filterData = response.data.filter(post => post.userId.toString() === userId);
```

### Step 5: Send the Response

Return the filtered data or an empty object if no posts match:

```javascript
if (filterData.length > 0) {
    res.json(filterData);
} else {
    res.json({});
}
```

### Step 6: Error Handling

Handle any potential errors during the API request:

```javascript
catch (error) {
    res.status(500).json({ error: 'failed to get data' });
}
```

### Step 7: Start the Server

Complete the server setup by adding a listener on the specified port and logging the server status:

```javascript
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

### Running the Application

With all the steps integrated, here’s the complete `app.js` file:

```javascript
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/posts', async (req, res) => {
    const userId = req.query.userId;

    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await axios.get(url);
        const filterData = response.data.filter(post => post.userId.toString() === userId);

        if (filterData.length > 0) {
            res.json(filterData);
        } else {
            res.json({});
        }
    } catch (error) {
        res.status(500).json({ error: 'failed to get data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

To start your server, run:

```bash
node app.js
```

Visit `http://localhost:3000/posts?userId=2` in your browser or a tool like Postman to see the results. This step-by-step guide with code samples should help you set up and understand each part of the application thoroughly.