const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

async function nextLink(url) {
  try {
    // const res=
  } catch (err) {
    console.log(err);
    return null;
  }
}

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
