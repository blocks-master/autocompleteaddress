const express = require("express");
const routes = require("./routes/index");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", routes);
let port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Server Has Started!");
});
module.exports = app;
