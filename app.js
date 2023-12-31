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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
