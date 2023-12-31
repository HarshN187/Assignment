const express = require("express");

const pageRoutes = require("./routes/pageCount");

const app = express();
app.set("view engine", "ejs");

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", pageRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views" + "/index.html");
});

// app.post("/calculate", async (req, res) => {
//   const startUrl = req.body.url;

//   const path = await getPathToPhilosophy(startUrl);
//   console.log("path =>" + path);

//   if (!path) {
//     res.render("result", {
//       error: "Unable to find a valid path to Philosophy.",
//     });
//   } else {
//     res.render("result", { path });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
