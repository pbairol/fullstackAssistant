# Creating a Assistant Bot

# Imessage API was too restricted but I tried it out:

Step 1 Imessage API install dependencies:

- Imessage API : https://github.com/danikhan632/iMessage-API/blob/main/Readme.md
    - Utilized a Flask Server: Which is a python web framework and can handle HTTPS requests. The Flask server can serve web pages, handle API requests, interact with databases, and perform other tasks required by the web application
- Dependencies Installed for iMessage API Reader
    - Python3: already have python 3.10 installed
    - Flask :
        
        ```bash
        pip install Flask
        ```
        
    - imessage-reader
        
        ```bash
        pip install imessage-reader
        ```
        

# Now using Discord API

## Building the Routes and front API through Node.Js and Express.Js

### What is Node.Js:

This is a Js runtime that allows you to execute java script outside of the web browser. ( RUN SERVER SIDE) - Big deal because JS is usually used as a frontend dev language but Node.js opens up JS to full stack ability. 

### What is Express.Js

This is a web application framework for Node.js think of it as a layer built on top of Node.js that simpies the processo f building web applications and API’s ( Application Programming Interfaces). Express.js provides a robust set of features for building web servers and handling HTTP requests 

1. **Java vs. JavaScript**: In Java, you write code in the Java language. In Node.js, you write code in JavaScript.
2. **Spring vs. Express.js**: Spring provides a framework for building Java applications, including web applications. Express.js provides a framework for building web applications using Node.js.
3. **Features**: Just like Spring provides features for building RESTful APIs, handling HTTP requests, and managing middleware, Express.js offers similar functionalities for Node.js applications.

### What is Postman?

Its a platform for API development. It's primarily known for its API client, which provides developers with a user-friendly interface for making HTTP requests to test, develop, and document APIs

### REST API Architecture

![Screenshot 2024-05-06 at 12.44.03 PM.png](Creating%20a%20Assistant%20Bot%201f5a09e069264b6db668be146db1497e/Screenshot_2024-05-06_at_12.44.03_PM.png)

### What is MongoDB?

MongoDB is a popular open-source, NoSQL database that stores data in a flexible, JSON-like format called BSON (Binary JSON). It's designed for scalability, performance, and ease of development, particularly for applications with large volumes of data or those requiring flexible schemas.

Relational vs Non-relational DB’s:

- **Relational Databases**: Data is structured into tables with rows and columns. Tables are linked through relationships defined by foreign keys.
- **Non-relational Databases**: Data is stored in various formats such as key-value pairs, documents, wide-column stores, or graphs. There's typically no fixed schema, allowing for more flexibility in data modeling.

### MongoDB Atlas ( The one we are going to be using)

- Online Server for Non relational database needs.
- For our project purposes: Created a Reminder-Manager DB with objects called tasks
- Used the following structure for tasks:

```sql
_id
completed
name
howto
```

### Integrating AI via Claude:

- To implement AI in node.js first grab your API key via Claude website.
- Put this api key in the .env file of your project
- install Claude onto your node project

```bash
npm install @anthropic/sdk
```

- Once the package is installed you can call the Claude AI and construct an instance of it via your api key

```jsx

const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({
   apiKey: process.env.API_KEY
});

async function generateHowTo(taskName) {
	const message = await anthropic.messages.create({
		max_tokens: 1024,
    messages: [{ role: 'user', content: "How do you complete this task in this reminder: " + taskName + ", keep the response within 3 bullets" }],
    model: 'claude-1.3'
   });
   return message;
}
```
