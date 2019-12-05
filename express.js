'use strict' 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 
const bonkaiDB = require ('./models/bonkaiDB'); 

app.set('port', process.env.port || 3000); 
app.use(express.static(__dirname + '/views')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");
app.use('/api', require('cors')());
app.use(express.static(__dirname + '/public')); 

app.post('/api/v1/bonkaiDB/add/', (req, res)=>{ 
  let newName = {'first':req.body.whole_name}; 
  console.log(newName); 
console.log(req.body);
  bonkaiDB.updateOne({'first':req.body.whole_name}, req.body, { upsert:true}, (err, result)=>{ 
    if (err) return next(err);
    res.json({name:req.body.whole_name });
  })
 
})



app.post('/add', (req,res) => { 
  console.log(req.body.whole_name);
//let newItem = {'first': req.body.addItem}; 

bonkaiDB.update({'first':req.body.whole_name, 'last':req.body.last}, req.body, {upsert:true}, (err, result)=>{ 
  if(err) return next (err);
  //console.log (result);
  res.type('text/html')
 
})

});





 // send plain text response
 app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About page');
 });

   // define 404 handler
   app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
   });



    app.listen(app.get('port'), () => { 
        console.log('express has started');
    });
