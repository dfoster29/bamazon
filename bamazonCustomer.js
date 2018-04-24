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
  // run the purchase function after the connection is made to prompt the user
  purchase();
});

function purchase() {
  connection.query(
    "SELECT item_id, product_name, price, stock_quantity FROM products",
    function(err, results) {
      if (err) throw err;

      console.log(
        "----------------------------------------" +
          "\n--------- Welcome to Bamazon! ----------" +
          "\n----------------------------------------" +
          "\n----------------------------------------" +
          "\n---------- Available Items: ------------" +
          "\n----------------------------------------"
      );

      for (var i = 0; i < results.length; i++) {
        console.log(
          results[i].item_id +
            " " +
            " " +
            results[i].product_name +
            " " +
            " $" +
            results[i].price +
            ".00"
        );
      }

      console.log("----------------------------------------");

      inquirer
        .prompt([
          {
            name: "choice",
            type: "input",
            message: "What is the id of the item you would like to purchase?"
          },
          {
            name: "item",
            type: "input",
            message: "How many would you like to purchase?"
          }
        ])
        .then(function(answer) {
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            chosenItem = results[i];
          }

          var newQuantity = chosenItem.stock_quantity - answer.item;

          if (chosenItem.stock_quantity >= parseInt(answer.item)) {
            connection.query(
              "UPDATE auctions SET ? WHERE ?",
              [
                {
                  stock_quantity: newQuantity
                },
                {
                  id: chosenItem.id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Congratulations on your purchase!");
                purchase();
              }
            );
          } else {
            console.log("Insufficient quantity!");
            connection.end();
          }
        });
    }
  );
}
