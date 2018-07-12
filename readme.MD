
## Prerequisites:

1. Download and Install latest mongoDb from https://www.mongodb.com/download-center?jmp=nav#community.

2. Download and Install latest node.js from https://nodejs.org/en/download/.

3. Download and install git.


# Set Up:

## MongoDB

1. Install MongoDb

2. Open command propmpt or terminal and 
    - cd MongoDb_installation_folder_path/server/4.0/bin/
    - mongo (to run mongo shell)
    - mongod (to start the mongo database in the local server mongodb://localhost:27017/)

Now mongoDb can be accessed at the URL mongodb://localhost:27017/

3. Mongo shell can be used to switch between databases and create collections dynamically
    - db (to show current db)
    - use mydb (to switch to mydb)

"mydb" must have two collections "myCollection" and "customer" for this app.


## Node.js:

1. Install NodeJS

2. Open command prompt or terminal and
    - md node_project
    - cd node_project
    - git clone repo
    - npm install (to install all the relevant packages and dependancies)
    - npm test
    - Go to the browser and navigate to https://localhost:8080


## Mocha:

In order to set up Mocha for our tests, first let us make a folder named 'test' in our root directory and create a file test.js in it.

code to install Mocha through command line:

  - npm install mocha --save-dev
  - npm install mocha --global(to give global access to mocha command)

We shall send the index.js 'app' express server to test.js as a module by adding the following line to our index.js file :-

  - module.exports = app;

This will run the app as a module before testing the code.

The unit testing for our app includes:

1. Testing of the response statuscode, which must be 200 for success.
2. Testing whether the request to one of the functionalities http://localhost:8080/showOrders, produces an empty array withoutany input

## App Structure

Root
    -node_modules
    -public
    --script
    ---data.js
    --style
    ---main.css
    --index.html
    -test
    --test.js
    -index.js
    -package.json
    -readme.MD
    -.gitignore


## App usage

### Section-1

1. Create a new order according to the given structure under "Create new order" section

2. Update an existing oder in "Update Order" section

3. Delete an existing order in "Delete Order" section by giving a particular Order-ID

4. Show the orders based on given name or address under "Show data by name or address" section by entering    either name or address. 

5. Check the complete current database by clicking the "See Order Database" button at the top of the page

6. See the list of items being ordered according to the decreasing order of their frequency by clicking       the "See Items" button  

### Section-2

1. Get customer information under "Get Customer Info" section by giving the Customer name.

2. Update existing customer information under "Update Customer Info" section by filling the form fields.

3. Delete an existing custome under "Delete Customer Info" section by giving a particular Customer name

4. Show the total money spent by a customer under "Total money spent by a Customer" section.

5. Show the list of customers who bought a particular item under "Customers who bought the Item" section      by giving the item name.

## What more can be done - 

1. On deletion of any order in Section:1 does not update the "customer" collection

2. The results are displayed as JSON objects rather than in a table on the page. Template makers like jade    can be used for dynamic display of data.

3. More unit testing can be done and each of the functionalities can be tested.

