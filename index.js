var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//--------------------------------------------------------------------------------------------------
// Section 1: 
//--------------------------------------------------------------------------------------------------
//To show orders by name or address identifiers
//------------------------------------------------------------------------------------------------------
app.get('/showOrders', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        var cName = {"Customer name": req.query.name };
        var cAddress = {"Customer address": req.query.name}
        db.collection("myCollection").find({$or: [cName, cAddress]}).toArray(function (err, output) {
            if (err) throw err;
            res.send(output);
            client.close();
        });
    });
});
//To create a new order and simultaneously add & update customer info
//------------------------------------------------------------------------------------------------------
app.get('/createOrders', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        db.collection('myCollection').insertOne({"order ID": req.query.orderid, "Customer name": req.query.name, "Customer address": req.query.address, "Item name": req.query.item, "Price": req.query.price, "Currency":req.query.currency});
        //--------------------------------------
        // Part of Section 2: To create a new Customer Info or update an existing One
        //--------------------------------------
        var myQuery = {"Name": req.query.name};
        var newQuery = {$set:{"Name":req.query.name, "Address": req.query.address}, $addToSet:{"Items": req.query.item }, $push: {"Price":req.query.price}};
        db.collection('customer').update(myQuery, newQuery, {upsert: true});
        client.close();
    });
    res.redirect('/');
});
//To update an order
//------------------------------------------------------------------------------------------------------
app.get('/updateOrders', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        var myquery = {"order ID": req.query.orderid};
        var newvalues = {$set: {"order ID": req.query.orderid, "Customer name": req.query.name, "Customer address": req.query.address, "Item name": req.query.item, "Price": req.query.price, "Currency":req.query.currency}};
        db.collection("myCollection").updateOne(myquery, newvalues);
        //--------------------------------------
        // Part of Section 2: To create a new Customer Info or update an existing One
        //--------------------------------------
        var myQuery1 = {"Name": req.query.name};
        var newQuery = {$set:{"Name":req.query.name, "Address": req.query.address}, $push:{"Items": req.query.item, "Price":req.query.price}};
        db.collection('customer').update(myQuery1, newQuery, {upsert: true});
        client.close();
    });
    res.redirect('/');
});
//To delete an order
//------------------------------------------------------------------------------------------------------
app.get('/deleteOrders', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        var myquery = {"order ID": req.query.orderid};
        db.collection("myCollection").deleteMany(myquery);
        client.close();
    });
    res.redirect('/');
});
//To list items in descending order based on number of times they are ordered
//------------------------------------------------------------------------------------------------------
app.get('/listItems', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        db.collection("myCollection").aggregate([{$group: {_id:"$Item name", count: {$sum: 1}}},{$sort: {"count": -1, "_id": 1}}]).toArray(function (err, output) {
            res.send(output);
            client.close();
        });
    });
});
//To show the complete current database
//------------------------------------------------------------------------------------------------------
app.get('/showDb',function(req,res){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        db.collection("myCollection").find({}).toArray(function (err, output) {
            if (err) throw err;
            res.send(output);
            client.close();
        });
    });
})

//--------------------------------------------------------------------------------------------------
// Section 2: 
//--------------------------------------------------------------------------------------------------
//Get Customer Info
//------------------------------------------------------------------------------------------------------
app.get('/getCustomer',function(req,res){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        db.collection("customer").find({"Name": req.query.name}).toArray(function(err, output) {
            if (err) throw err;
            res.send(output);
            client.close();
        })
    });
})
//Update Customer Info
//------------------------------------------------------------------------------------------------------
app.get('/updateInfo',function(req,res){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        var myQuery = {"Name": req.query.name};
        var newQuery = {$set:{"Name":req.query.name, "Address": req.query.address}, $push:{"Items": req.query.item, "Price":req.query.price}};
        db.collection('customer').update(myQuery, newQuery, {upsert: true});
        client.close();
    });
    res.redirect('/');
})
//Delete Customer Info
//------------------------------------------------------------------------------------------------------
app.get('/delInfo',function(req,res){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        var myquery = {"Name": req.query.name};
        db.collection("customer").deleteOne(myquery);
        client.close();
    });
    res.redirect('/');
})
//Show all Customer Info
//------------------------------------------------------------------------------------------------------
app.get('/showInfo',function(req,res){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        db.collection("customer").find({}).toArray(function (err, output) {
            if (err) throw err;
            res.send(output);
            client.close();
        });
    });
})
//Add up the expenditure of a customer
//------------------------------------------------------------------------------------------------------
app.get('/getPrice',function(req,res){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        db.collection("customer").find({"Name": req.query.name}).toArray(function (err, output) {
            if (err) throw err;
            var out = output[0].Price;
            var sum = 0;
            for(var i=0; i<out.length; i++){
                sum = sum + parseInt(out[i]);
            }
            res.send({total: sum});
            client.close();
        });
    });
})
//Get the list of customers who bought a particular item
//------------------------------------------------------------------------------------------------------
app.get('/getListCustomer',function(req,res){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        db.collection("myCollection").find({"Item name": req.query.item}).project({"Customer name": 1, _id: 0}).toArray(function(err,output){
            res.send(output);
            client.close(); 
        });
    });
})
//------------------------------------------------------------------------------------------------------
app.use(express.static(__dirname + '/public')); //Join public folder to the server
app.listen(process.env.port || 8080); //Listening to port 8080
console.log('Server runs port 8080');

module.exports = app; //Export express server for testing purposes

  
    