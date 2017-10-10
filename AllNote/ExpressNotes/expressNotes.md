# Understanding express framework
install -g express
express --version

npm init
* enter informations *
npm install express
update package.json
npm install



## v1 basic express server

*goto app.js* 
``` javascript 
var express = require(express);
var app = express();
app.get('/', function(req,res)) {
	res.send('<h1>Hello<\h1> express');
}
var server = app.listen(3000, function() {
console.log('listening to port 3000');
});
```
*execute*
node app.js




## v2 passing data from url

*goto app.js*
``` javascript 
var express = require('express');
var app = express();

app.get('/', function(req, res) {
res.send('<H1>Hello</H1> Express');
});

// *** START : add this section 
app.get('/me', function(req, res) {
res.send('@planetoftheweb');
});

app.get('/who/:name?', function(req, res) {
var name = req.params.name;
res.send(name + ' was here');
});

app.get('/who/:name?/:title?', function(req, res) {
var name = req.params.name;
var title = req.params.title;
res.send('<p>name: ' + name + '<br>title: ' + title + '</p>');
});

app.get('*', function(req, res) {
res.send('Bad Route');
});
// *** END : add this section 
var server = app.listen(3000, function() {
console.log('Listening on port 3000');
});
```
*execute*
node app.js




## v3 adding ejs
npm install ejs
*add default.ejs in views*
``` html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>My App</title>
</head>
<body>
<h1><%= title %></h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quod, praesentium dolor velit culpa cupiditate odio nihil voluptates aliquid eum dolore eligendi quas nobis nam nesciunt odit pariatur minus cum.</p>

<ul>
<% for(var i=0; i<users.length; i++) {%>
<li><%= users[i] %></li>
<% } %>
</ul>
</body>
```

*update app.js to:*
``` javascript 
var express = require('express');
var app = express();

// *** START : add this section 
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
res.render('default', {
title: 'Home',
users: ['Ray', 'Morten', 'James']
});
});
// *** END : add this section 
app.get('/me', function(req, res) {
res.send('@planetoftheweb');
});

app.get('/who/:name?', function(req, res) {
var name = req.params.name;
res.send(name + ' was here');
});
// *** START : add this section 
app.get('/who/:name?/:title?', function(req, res) {
var name = req.params.name;
var title = req.params.title;
res.send('<p>name: ' + name + '<br>title: ' + title + '</p>');
});
// *** END : add this section 
app.get('*', function(req, res) {
res.send('Bad Route');
});

var server = app.listen(3000, function() {
console.log('Listening on port 3000');
});
```
## V4 adding header footer etc

*Change views/default.ejs to:*
``` html
<!DOCTYPE html>
<html lang="en">
<head><% include partials/page/head.ejs %></head>
<body class="<%= classname %>" >
<% include partials/page/header.ejs %>

<div class="container">
<h1><%= title %></h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quod, praesentium dolor velit culpa cupiditate odio nihil voluptates aliquid eum dolore eligendi quas nobis nam nesciunt odit pariatur minus cum.</p>
</div><!-- container -->

<% include partials/page/footer.ejs %>
<% include partials/page/jsdefaults.ejs %>
</body>
</html>

Add views/partials/page/head.js
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><%= title %></title>
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">


Add views/partials/page/footer.js
<footer>
</footer>

Add views/partials/page/header.js
<header>
</header>

Add views/partials/page/jsdefaults.js
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
```

*Change app.js to:*
``` javascript
var express = require('express');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
res.render('default', {
title: 'Home', 
classname: ‘home’,
users: ['Ray', 'Morten', 'James']
});
});

app.get('/me', function(req, res) {
res.send('@planetoftheweb');
});

app.get('/who/:name?', function(req, res) {
var name = req.params.name;
res.send(name + ' was here');
});

app.get('/who/:name?/:title?', function(req, res) {
var name = req.params.name;
var title = req.params.title;
res.send('<p>name: ' + name + '<br>title: ' + title + '</p>');
});

app.get('*', function(req, res) {
res.send('Bad Route');
});

var server = app.listen(3000, function() {
console.log('Listening on port 3000');
});
```
## V5 adding conditionals to ejs
*Change app.js to:*
``` javascript
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.locals.pagetitle = "Awesome Website";

app.get('/', function(req, res) {
res.render('default', {
title: 'Home',
classname: 'home',
users: ['Ray', 'Morten', 'James']
});
});

app.get('/about', function(req, res) {
res.render('default', {
title: 'About Us',
classname: 'about'
});

});

app.get('*', function(req, res) {
res.send('Bad Route');
});

var server = app.listen(3000, function() {
console.log('Listening on port 3000');
}); 
```

*Change default.js to: *
```html
<!DOCTYPE html>
<html lang="en">
<head><% include partials/page/head.ejs %></head>
<body class="<%= classname %>" >
<% include partials/page/header.ejs %>

<div class="container">
<h1><%= pagetitle %><%= title %></h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quod, praesentium dolor velit culpa cupiditate odio nihil voluptates aliquid eum dolore eligendi quas nobis nam nesciunt odit pariatur minus cum.</p>

<% if (typeof(users) !== 'undefined') { %>
<ul>
<% for(var i=0; i<users.length; i++) { %>
    <li><%= users[i] %></li>
<% } %>
</ul>
<% } %>

</div><!-- container -->

<% include partials/page/footer.ejs %>
<% include partials/page/jsdefaults.ejs %>
</body>
</html>
```
## v6 Adding routes to modularize code:
``` javascript
Change app.js to: 
var express = require('express');
var app = express();
var routes = require('./routes');

app.set('view engine', 'ejs');

app.locals.pagetitle = "Awesome Website";

app.get('/', routes.index);
app.get('/about', routes.about);

app.get('*', function(req, res) {
res.send('Bad Route');
});

var server = app.listen(3000, function() {
console.log('Listening on port 3000');
}); 


Add to routes/index.js
exports.index = function(req, res) {
res.render('default', {
title: 'Home',
classname: 'home',
users: ['Ray', 'Morten', 'James']
});
}

exports.about = function(req, res) {
res.render('default', {
title: 'About Us',
classname: 'about'
});
}
```

#New express project
## V1 Express Generator
npm install -g express-generator
express -e ProjectName
→ this creates a express project  folder
npm install
node ProjectName
## folder structure and assets 
* app.js
* bin folder
* data.json   // data to populated in json format
* node_module
* package.json
* public
	* images
		* images to be used  // just copy
	* javascripts
		* scripts.js
	*stylesheets
		* style.css    // just copy 
* routes
* views
	* partials
		* content
			* artwork.ejs
			* getbusy.ejs
			* nextmeeting.ejs 
			* socialmedia.ejs
			* speakerlist.ejs
			* whoarewe.ejs
			* whoshouldcome.ejs
		* template
			* footer.ejs
			* header.ejs
			* head.ejs
			* jsdefaults.ejs
	* error.ejs
	* index.ejs
## understanding data.json 
Json editor online to auto beautify json
```javascript
{
“speaker”: [{ “title” : “..”, “name”: “..”...etc}, { … }} 
//array of object -- speaker data
“Social” :  [{...}, {...}] 
// array of object condtaining social media info
“meeting” : {...} 
//meeting info fields
}
```
## site structure 
Two basic pages should be created, main and speaker page
 ![alt] (file:///home/yoda/Documents/notes/site.png)

1.  copy header and footer content 
2. Tell index.ejs to load *partials/template/head.ejs* , *header.ejs* and *footer.ejs* in header section
3. Modify *jsdefaults.ejs* to include *public/javascripts/scripts.ejs*
4. Tell *index.ejs* to load *partials/template/jsdefaults.ejs* in header section
5. Develop header section.. Just copy and understand
6. create ejs files for content section. Add *artwork.ejs* , *getbusy.ejs*, *nextmeeting.ejs*,  *socialmedia.ejs*, *speakerlist.ejs*, *whoarewe.ejs*, *whoshouldcome.ejs* 
	* add these sections to index.ejs
	
###### index.ejs will finally look like

``` html
<!DOCTYPE html>
<html>
  <!-- step 2 -->
  <head><% include partials/template/head.ejs %></head>
  <body>
    <!-- step 2 -->
    <% include partials/template/header.ejs %>
    <!-- step 6 -->
    <% include partials/content/speakerslist.ejs %>
    <section class="layout">
      <div class="primary">
        <% include partials/content/whoarewe.ejs %>
        <% include partials/content/getbusy.ejs %>
        <% include partials/content/whoshouldcome.ejs %>
      </div><!-- primary -->
      <aside class="secondary">
        <% include partials/content/nextmeeting.ejs %>
        <% include partials/content/artworklist.ejs %>
      </aside><!-- secondary -->
    </section><!-- layout -->
    <!-- step 2 -->
    <% include partials/template/footer.ejs %>
    <% include partials/template/jsdefaults.ejs %>
  </body>
</html>
```

###### jsdefault.ejs will finally look like

``` html
<script src="/javascripts/script.js"></script>
```

## working with dynamic content
static content is developed now. Dynamic content need to be encorprated
**Modification in app.js**
1. create data variable and access data.json in it
``` javascript
app.locals.appdata = require('./data.json');
app.use('/', routes);
```
**Modification in nextmeeting.ejs to read data**
1. Read meeting data,venue and time and populate
``` html
<article class="nextmeeting">
  <h1>Next Meeting</h1>
  <p>
  <img src="<%= appdata.meeting.where.img %>" alt="Meeting Location"> Our next meeting will be on 
  <%= appdata.meeting.date %>, <%= appdata.meeting.time %> at
  <%= appdata.meeting.where.name %> <%= appdata.meeting.where.address %>
  </p>
</article>
```
**using javascript in ejs -- modify social media.ejs**
Addition of javascript to populate social media section by reading data.json info
``` html
<article class="socialmediaicons">
  <span class="title">Join the movement: </span>
  <ul class="group">
    <% appdata.social.forEach(function(item) { %>
      <li><a href="<%= item.url %>"><img class="icon" src="<%= item.img %>" alt="icon for <%= item.shortname %>"></a></li>
    <% }); %>
  </ul>
</article>
```
