const axios = require("axios");
const cheerio = require("cheerio");

async function getNextLink(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    // Find the first link in the main body text
    const content = $("#mw-content-text");
    const paragraph = content.find("p");

    const link = paragraph.find("a[href^='/wiki/']:not(:has(span))").first();

    return link.attr("href");
  } catch (err) {
    console.log(err);

    return null;
  }
}

async function getPathToPhilosophy(startUrl) {
  try {
    const path = [startUrl];
    let currentUrl = startUrl;

    console.log("Current url =>" + currentUrl);
    while (currentUrl !== "https://en.wikipedia.org/wiki/Philosophy") {
      let nextLink = await getNextLink(currentUrl);
      nextLink = "https://en.wikipedia.org" + nextLink;
      console.log(nextLink);

      if (!nextLink) {
        return null;
      }

      if (path.includes(nextLink)) {
        console.log("loop detected");
        return null;
      }
      path.push(nextLink);
      currentUrl = nextLink;
    }
    return path;
  } catch {
    console.log(err);
    return null;
  }
}

module.exports = {
  getNextLink,
  getPathToPhilosophy,
};
// Function to retrieve the first link in the main body text of a Wikipedia page
async function getNextLink(url) {
  try {
    // Fetch the HTML content of the given URL using Axios
    const res = await axios.get(url);

    // Load the HTML content into Cheerio for easy DOM manipulation
    const $ = cheerio.load(res.data);

    // Find the first link in the main body text
    const content = $("#mw-content-text");
    const paragraph = content.find("p");
    const link = paragraph.find("a[href^='/wiki/']:not(:has(span))").first();

    // Return the href attribute of the first link
    return link.attr("href");
  } catch (err) {
    // Log any errors that occur during the process
    console.log(err);

    // Return null in case of an error
    return null;
  }
}

// Function to find the path to the Philosophy page on Wikipedia
async function getPathToPhilosophy(startUrl) {
  try {
    // Initialize an array to store the path to Philosophy
    const path = [startUrl];
    let currentUrl = startUrl;

    // Log the current URL before starting the loop
    console.log("Current url =>" + currentUrl);

    // Continue looping until reaching the Philosophy page
    while (currentUrl !== "https://en.wikipedia.org/wiki/Philosophy") {
      // Get the next link in the path
      let nextLink = await getNextLink(currentUrl);

      // Ensure the link is in the correct format
      nextLink = "https://en.wikipedia.org" + nextLink;

      // Log the next link in the path
      console.log(nextLink);

      // Check for cases where the next link is not available
      if (!nextLink) {
        return null;
      }

      // Check for loop detection by looking for duplicate links
      if (path.includes(nextLink)) {
        console.log("loop detected");
        return null;
      }

      // Add the next link to the path
      path.push(nextLink);
      currentUrl = nextLink;
    }

    // Return the path to Philosophy
    return path;
  } catch (err) {
    // Log any errors that occur during the process
    console.log(err);

    // Return null in case of an error
    return null;
  }
}

// Export the functions for use in other modules
module.exports = {
  getNextLink,
  getPathToPhilosophy,
};
