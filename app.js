// Import the express library to create an HTTP server
const express = require("express");

// Import the route handler for the pageCount functionality
const pageRoutes = require("./routes/pageCount");

// Create an instance of the Express application
const app = express();

// Set the view engine to EJS for rendering dynamic content
app.set("view engine", "ejs");

// Define the port on which the server will listen
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Use the pageCount routes for handling requests
app.use("/", pageRoutes);

// Define a route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views" + "/index.html");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
