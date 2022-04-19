const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine', 'pug'); //express looks at the views folder


app.get('/', (req, res) => {
    const name = req.cookies.username ;
    if (name) {
        res.render('index', { name });
    }
    else {
        res.redirect('/hello')
    }
    
})

app.get('/cards', (req, res) => {
    res.render('card', { prompt:" Who is my dad?", hint:"Siam"});
})


const colors = ['red', 'gree','blue','black','orange']
app.get('/test', (req, res) => {
    res.render('test', { prompt:" Who is color?", hint:"Siam", colors});
})


app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name){
        res.redirect('/');
    } else {
        res.render('hello');
    }
    
})

app.post('/hello', (req, res) => {
    // console.dir(req.body)
    // res.json(req.body);
    res.cookie('username', req.body.username);
    res.redirect('/');
})

app.post('/goodbye', (req, res) => {
    res.clearCookie('username')
    res.redirect('/hello');
})


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