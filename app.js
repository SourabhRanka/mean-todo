// configuration part

var express = require('express'); // express framework for using inbuilt methods
var app = express();  // intialize express app

app.use(express.static('public'));  // to server static content from server

var bodyParser = require('body-parser'); // to parse the response from post call
app.use(bodyParser.json());        // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var MongoClient = require('mongodb').MongoClient; // to perform operation on database
var url = "mongodb://localhost:27017/tododb"; // location of database on server

app.listen(8080);
console.log('Server listening');


// database creation
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('tododb database created');
  db.createCollection("todolist", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

// getting the collection items
app.get('/api/todos', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.collection("todolist").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});


// adding the collection item   
app.post('/api/todos', function (req, res) {
  MongoClient.connect(url, function (errconnect, db) {
    if (errconnect) throw errconnect;
    db.collection("todolist").insertOne(req.body, function (errinsert, resinsert) {
      if (errinsert) throw errinsert;
      console.log("1 document inserted");
      db.collection("todolist").find({}).toArray(function (errget, result) {
        if (errget) throw errget;
        res.send(result);
      });
      db.close();
    });
  });
});

// deleting the collection item
app.delete('/api/todos/:todo_id', function (req, res) {
  MongoClient.connect(url, function (errconnect, db) {
    if (errconnect) throw errconnect;
    db.collection("todolist").remove({ text: req.params.todo_id }, function (errinsert, resinsert) {
      if (errinsert) throw errinsert;
      console.log("1 document deleted");
      db.collection("todolist").find({}).toArray(function (errget, result) {
        if (errget) throw errget;
        res.send(result);
      });
      db.close();
    });
  });
});

// deleting all the items in collection
app.delete('/api/todos', function (req, res) {
  MongoClient.connect(url, function (errconnect, db) {
    if (errconnect) throw errconnect;
    db.collection("todolist").remove({}, function (errinsert, resinsert) {
      if (errinsert) throw errinsert;
      console.log("All the documents are deleted");
      db.collection("todolist").find({}).toArray(function (errget, result) {
        if (errget) throw errget;
        console.log(result);
        res.send(result);
      });
      db.close();
    });
  });
});



















// 'use strict';
// var http = require('http');
// var fs = require('fs');

// const util = require('util');

// console.log('program started');
// http.createServer(function (req, res) {
//   console.log('server requested');
//   console.log(util.inspect(req.url, { depth: 1 }));
//   if (req.url === '/') {
//     console.log('inside /');
//     fs.readFile('js-todo/index.html', function (err, data) {
//       res.writeHead(200, { 'content-type': 'text/html' });
//       res.write(data);
//       res.end();
//     });
//   } else {
//     console.log('else part');
//     fs.readFile('js-todo/' + req.url, function (err, data) {
//       if(err){
//         return err;
//       }
//       res.writeHead(200);
//       res.write(data);
//       res.end();
//     });
//     //res.write('hello world');
//     //res.end();
//   }



// }).listen(8080);