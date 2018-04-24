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
        "\--------------------" +
          "\n--------------------" +
          "\nWelcome to Bamazon!" +
          "\n--------------------" +
          "\n--------------------" +
          "\nHere is a list of available items:" +
          "\n--------------------"
      );


      for (var i = 0; i < results.length; i++) {
        console.log(results[i].item_id + " " + " " + results[i].product_name + " " + " $" + results[i].price + ".00");
      }

      console.log("--------------------")

      inquirer
        .prompt([
          {
            name: "choice",
            type: "input",
            message:
              "What is the id of the item you would like to purchase?"
          },
          {
            name: "item",
            type: "input",
            message:
              "How many would you like to purchase?"
          }
        ])
        .then(function(answer) {
          for (var i = 0; i < results.length; i++) {
            var chosenItem = answer.choice.item_id;
          }

          if (choices.stock_quantity >= parseInt(answer.item)) {
            connection.query(
              "UPDATE products SET stock_quantity = " +
                newQuantity +
                "WHERE item_id = " +
                chosenItem,

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
