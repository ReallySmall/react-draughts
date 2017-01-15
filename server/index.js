var express = require('express');
var compression = require('compression');
var fs = require('fs');
var mongoose = require('mongoose');
var webpack = require('webpack');
var dotenv = require('dotenv').config();

// keystone integration
var keystone = require('keystone');
var serve = require('serve-static');
var favicon = require('serve-favicon');
var body = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var session = require('express-session');
var flash = require('connect-flash');

var app = express();

if (process.env.NODE_ENV !== 'development') {
  //app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(compression());
keystone.static(app);

app.use(cookieParser(process.env.KEYSTONE_COOKIE_SECRET));
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(multer());
app.use(session());
app.use(flash());
app.use('/keystone', keystone.adminApp.staticRouter);

keystone.app = app;
keystone.mongoose = mongoose;

keystone.init({
   'name': 'React Drafts',
   'brand': 'React Drafts',
   'session': true,
   'updates': true,
   'auth': true,
   'user model': 'User',
   'auto update': false,
   'cookie secret': process.env.KEYSTONE_COOKIE_SECRET,
   'mongo': process.env.MONGODB_URI
});

keystone.set('cloudinary config', {
  cloud_name: process.env.KEYSTONE_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.KEYSTONE_CLOUDINARY_API_KEY, 
  api_secret: process.env.KEYSTONE_CLOUDINARY_API_SECRET
});

keystone.set('cloudinary secure', true);

keystone.set('static', ['public']);

// Let keystone know where your models are defined. Here we have it at the `/models`
keystone.import('models');

// Set keystone routes for the admin panel, located at '/keystone'
keystone.routes(app);

// Initialize keystone's connection to the database
keystone.mongoose.connect(keystone.get('mongo'));
keystone.mongoose.connection.on('error', console.log);

// Serve your static assets
app.use(serve('./public'));

// If in dev enable HMR
if (process.env.NODE_ENV === 'development') {
  var config = require('../webpack/webpack.config.dev-client.js');
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

// Bootstrap routes
require('./routes')(app);

keystone.start();
