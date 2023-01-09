// Setting the express server
const express = require("express");
const app = express();
const data = require("./data.json");
const { projects } = data;
// the path module which can be used when setting the absolute path in the express.static function.
const path = require("path");

// Setting the view engine to pug
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
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "This project number does not exist";
    throw(err);
  } 
});

// error route
app.get("/error", (req, res, next) => {
  console.log('Error route called');
  const err = new Error();
  err.message = "Whoops, an error has ocurred!"
  err.status = 500;
  throw(err);
});

/* Error handlers */

// 404 errorhandler
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "The page you are trying to reach is not found";
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status);
    res.render('page-not-found', { err });
    console.error(err);
  } else {
    res.status(500);
    res.render('error', { err });
    console.error(err);
  }    
});

// Server setup
app.listen(3000, () => {
  console.log("The app is running on localhost:3000");
});
