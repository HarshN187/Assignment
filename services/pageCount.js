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
