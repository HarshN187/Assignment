// Import the express library to create a router
const express = require("express");

// Create an instance of the Express router
const router = express.Router();

// Import the controller for the pageCount functionality
const pageCountController = require("../controller/pageCount");

// Import the middleware for testing the URL (assuming it checks for a valid URL)
const testURL = require("../middleware/testURL");

// Define a route for handling POST requests to get the Philosophy page
// Use the testURL middleware to check the validity of the URL
// Use the pageCountController.pageCount function as the route handler
router.post("/getPhilosophyPage", testURL, pageCountController.pageCount);

// Export the router to be used in other parts of the application
module.exports = router;
