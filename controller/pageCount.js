const pageServices = require("../services/pageCount");

module.exports.pageCount = async function (req, res) {
  const startUrl = req.body.url;

  const path = await pageServices.getPathToPhilosophy(startUrl);
  console.log("path =>" + path);

  if (!path) {
    res.render("result", {
      error: "Unable to find a valid path to Philosophy.",
    });
  } else {
    res.render("result", { path });
  }
};
