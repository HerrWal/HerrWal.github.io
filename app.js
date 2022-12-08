const express = require('express');
const app = express();
const data = require('./data.json');
const { projects} = data; 
// the path module which can be used when setting the absolute path in the express.static function.
const path = require('path');

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')));

/* Routes */

// index route
app.get('/', (req, res) => {
    res.render('index', { projects });
});

// about route
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    const { projectId } = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId);

    if (project)  {
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }    
});

/* Error handlers */

// 404 errorhandler
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'The page you are trying to reach is not found';
    console.log(err);
    next(err);
});

// Global error handler
app.use((req, res, next) => {
    
});

app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});
