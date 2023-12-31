const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.set("view engine", "ejs");

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getNextLink(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    // Find the first link in the main body text
    const content = $("#mw-content-text");
    const paragraph = content.find("p");
    const link = paragraph.find("a").first();

    return link.attr("href");
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getPathToPhilosophy(startUrl) {
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
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views" + "/index.html");
});

app.post("/calculate", async (req, res) => {
  const startUrl = req.body.url;

  const path = await getPathToPhilosophy(startUrl);
  console.log("path =>" + path);

  if (!path) {
    res.render("result", {
      error: "Unable to find a valid path to Philosophy.",
    });
  } else {
    res.render("result", { path });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
