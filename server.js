// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Table / Waitlist (DATA)
// =============================================================
const tablesAvailable = [

];
const tablesReserved = [{
    customerEmail: "mmsplawn@gmail.com",
    customerId: 1,
    customerName: "Morgan",
    phoneNumber: 33362693264
}];
const waitlist = [
    {
        customerEmail: "mmsplawn@gmail.com",
        customerId: 1,
        customerName: "Morgan",
        phoneNumber: 33362693264
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all characters
app.get("/api/tables", function(req, res) {
    return res.json(tablesAvailable);
  });

  app.get("/api/reserved", function(req, res) {
    return res.json(tablesReserved);
  });

  app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

  // Create New Characters - takes in JSON input


      app.post("/api/reserved", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newTable = req.body;
        console.log(newTable);
        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newTable.routeName = newTable.customerName.replace(/\s+/g, "").toLowerCase();
        newTable.customerId = parseInt(newTable.customerId);
        newTable.phoneNumber = parseInt(newTable.phoneNumber);
        console.log(newTable);
        if (tablesReserved.length <= 5) { 
            tablesReserved.push(newTable);
            return res.send("You've officially booked!");
        } else {
            waitlist.push(newTable);
            return res.send("No soup for you!");
        }
      });


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
