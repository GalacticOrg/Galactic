// application

const express = require('express'),
    app = express(),
    env = process.env.NODE_ENV || 'development',
    sessionSecret = process.env.COOKIE_SECRET || '123456',
    setupHandlebars  = require('./config/setupHandlebars.js'),
    setupPassport = require('./app/setupPassport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    appRouter = require('./app/routers/appRouter.js')(express),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    pgSession = require('connect-pg-simple')(session),
    pg = require('pg'),
    port = process.env.PORT || 8080,
    pgdb = process.env.pgdb || 'postgres://postgres:postgres@localhost:5432/wikiweb'
    jsonParser = bodyParser.json();



app.use(cookieParser());

app.use(session({
  store: new pgSession({
    pg : pg,
    conString : pgdb, // Connect using something else than default DATABASE_URL env variable
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 360 * 24 * 60 * 60 * 1000 } // 360 days
}));

app.use('/static', express.static(__dirname + '/static'));

app.use(flash());
app.use(function (req, res, next) {
    res.locals.errorMessage = req.flash('error');
    next();
});

// Logs
const predefined = env === 'development' ? 'dev' : 'combined';
if (env !== 'test') app.use(morgan(predefined));

app.use(jsonParser);
app.use(bodyParser.urlencoded({
  extended: true
}));

setupPassport(app);
setupHandlebars(app);

app.use('/', appRouter);

// start app
app.listen(port);
console.log('Server started on port ' + port);

module.exports.getApp = app;
