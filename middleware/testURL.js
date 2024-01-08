
module.exports = function (req, res, next) {
  try {
    // Define a regular expression to match Wikipedia URLs
    const wikipediaRegex = /^https:\/\/en\.wikipedia\.org\/.*/;

    // Check if the provided URL matches the Wikipedia regex
    if (!wikipediaRegex.test(req.body.url)) {
      // If not, render an error message and stop further processing
      res.render("result", {
        error: "Please Write Appropriate Wikipedia URL",
      });
    } else {
      // If the URL is valid, continue to the next middleware or route handler
      next();
    }
  } catch (err) {
    // Log any unexpected errors and send a 500 Internal Server Error response
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
