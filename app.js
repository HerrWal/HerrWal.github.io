const express = require("express");
const app = express();
const data = require("./data.json");
const { projects } = data;
// the path module which can be used when setting the absolute path in the express.static function.
const path = require("path");

app.set("view engine", "pug");

/* Routes */

//static route to serve static files
app.use("/static", express.static(path.join(__dirname, "public")));

// index route
app.get("/", (req, res) => {
  res.render("index", { projects });
});

// about route
app.get("/about", (req, res) => {
  res.render("about");
});

// projects route
app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);  
  res.render("project", { project });
});

// error route
app.get("/error", (req, res, next) => {
  console.log('Error route called');
  const err = new Error();
  err.message = `500 error thrown`
  err.status = 500;
  res.next(err);
});

/* Error handlers */

// 404 errorhandler
app.use((req, res, next) => {
  console.log('404 handler called');
  const err = new Error("The page you are trying to reach is not found");
  err.status = 404;
  console.log(err);
  next(err);
});

// Global error handler
// app.use((err, req, res, next) => {
//   console.log('global Handler called');
//   res.status(err.status || 500);
//   res.send(err.message);
//   console.log("Whoops, an error has ocurred!");
//   console.error(err);
// });

app.use((err, req, res, next) => {
  console.log('global Handler called');
  res.status(err.status || 500);
  res.send(err.message);
  console.log("Whoops, an error has ocurred!");
  console.error(err);
});

// Server setup
app.listen(3000, () => {
  console.log("The app is running on localhost:3000");
});
