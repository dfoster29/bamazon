var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


function start() {
    inquirer
      .prompt({
        name: "buyOrNot",
        type: "rawlist",
        message: "Would you like to buy something?",
        choices: ["Yes. Show me the available items!", "No thanks dude."]
      })
      .then(function(answer) {
  
        if (answer.buyOrNot.toUpperCase() === "Yes. Show me the available items!") {
        
        }
        else {
          
        }
      });
  
}