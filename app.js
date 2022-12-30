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

app.get("/projects/:id", (req, res) => {
  const { projectId } = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);

  if (project) {
    res.render("project", { project });
  } else {
    res.sendStatus(404);
  }
});

/* Error handlers */

// 404 errorhandler
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "The page you are trying to reach is not found";
  console.log(err);
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  // After the 404 handler in app.js add a global error handler that will deal with any server errors the app encounters. This handler should ensure that there is an err.status property and an err.message property if they don't already exist, and then log out the err object's message and status.
  res.status(err.status || 500);
  res.send(err.message);
  console.log("Whoops, an error has ocurred!");
  console.error(err);
  // Test your error handling by pointing the browser at a few undefined routes, like /noroute and /project/noroute, as well as temporarily throwing an intentional 500 error in one of your routes and then navigating to the page for that route.
});

app.listen(3000, () => {
  console.log("The app is running on localhost:3000");
});
