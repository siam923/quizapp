## Starting Node App

mkdir flashcards

run command:

```
npm init -y

npm install express@4.15.2 --save
npm install -g nodemon // it helps with changing code without restarting server
code app.js
```

#### Create server next

to create express app call express().

create routes -
express needs to specify resources to send for a route

root route - app.get('location e.g for home- /', (function for request & response))

#### Start app:

node app.js

## Template Rendering

render template - views (allows to keep variables in html & make things easier)
js template languages:
handlebars, EJS, Pug(jade)

We will use Pug

Pug compiles to html

h1 I love Treehouse! -> <h1>I love treehouse</h1>

Example pug

```
html(lang="en")
head
body
    div.wrapper
        p#maincontent Hi!

```

gets converted into

```
<html lang="eng">
    <head>
    </head>
    <body>
        <div class="wrapper">
            <div id="maincontent">Hi!</div>
        </div>
    </body>
</html>

```

## Adding pug

npm install pug --save

app.set('view engine', 'pug') -> allows express to set which template to use

send template -  
using res.render() instead of res.send()

variables in pug
use = sign after a tag or with #{varname}
e.g h1= variable name
in js: res.render(viewname, [variable name], [,callback])

logic in pug

if varname
rest of code....

### Body Parser

When data is submited in form, express uses a middleware to process the incoming form submission data called bodyparser. with out it express will receive undefined data as input in post request

HTML forms normally encodes data they send the same way urls do.
So we use bodyparser.urlencode({extended: false})

npm install body-parser --save

### Cookie

Http are stateless but if we want our site to remember certain information e.g. cart in ecommerce we can use cookie information and send it with the request in the server.

Cookies are stored in the browser and domain

express response object has cookie method for this.

to access cookies from request we need a middleware called cookie parser.
npm install cookie-parser --save

clear cookie - res.clearCookie()

### Redirects

response.redirect('/route')

### Middleware

Ask a question - request
think - middleware
ans - response

Structure:
function middleware(){
return function(req, res, next) {
//logic
}
}

i.e. middleware() // returns a function

The use method for executing middleware -
app.use/get('route', (req, res, next) => {
...
next()
}})

next is the next step after the middleware

More middleware:
app.use({middleware1, middleware2, ...})

Multiple ways of calling middleware

```
app.use((req, res, next) => {
console.log("One");
next();
},
//2nd middleware
(req,res, next) => {
console.log("One and half");
next();
});

//3rd middle ware

app.use((req,res,next)=>{
console.log('Two');
next();
})

app.use('hello', (req,res,next)=>{
console.log('Two');
next();
})
```

Passing info from one middleware to another

```javascript
app.use((req, res, next) => {
  req.mymssg = "Siam is best";
  next();
});

app.use("hello", (req, res, next) => {
  console.log(req.mymssg);
  next();
});
```

next Function: allows to know express when to move forward to next function or step
