const express = require("express");

const path = require("path");

const app = express();
const formRouter = require("./routes/index");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use("/", routes);
app.use(formRouter);

let port = process.env.PORT || process.env.IP || 3000;
app.listen(port, function() {
	console.log("Server Has Started!");
});
module.exports = app;
