// Import the pageServices module that contains the getPathToPhilosophy function
const pageServices = require("../services/pageCount");

// Controller function to handle the pageCount endpoint
module.exports.pageCount = async function (req, res) {
  // Extract the URL from the request body
  const startUrl = req.body.url;

  try {
    // Call the getPathToPhilosophy function to find the path to the Philosophy page
    const path = await pageServices.getPathToPhilosophy(startUrl);

    // Log the path to the console for debugging purposes
    console.log("path =>" + path);

    // Check if a valid path to Philosophy was found
    if (!path) {
      // Render an error message if no valid path is found
      res.render("result", {
        error: "Unable to find a valid path to Philosophy.",
      });
    } else {
      // Render the result page with the found path
      res.render("result", { path });
    }
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error in pageCount:", err.message);

    // Determine the type of error and provide an appropriate response
    if (err.message.includes("loop detected")) {
      return res.render("result", {
        error:
          "Loop detected in the path to Philosophy. Please check the input.",
      });
    } else {
      // Render a generic error message for other unexpected errors
      return res.render("result", {
        error: "An unexpected error occurred while processing the request.",
      });
    }
  }
};
