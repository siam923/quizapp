const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine', 'pug'); //express looks at the views folder

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);


app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
})

// If express doesnot get any route we handled then 
//we will throw an error of not found with middleware
app.use((err, req, res, next) => {
    //alternative way to render variable for pug in locals
    res.locals.error = err;
    res.status(err.status); //if error make the server stop
    res.render('error')
})



app.listen(3000, () => {
    console.log("The app is running on localhost:3000");
});