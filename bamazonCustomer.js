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
  purchase();
});


function purchase() {

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to purchase?"
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
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }


        if (chosenItem.stock_quantity > parseInt(answer.item)) {

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (stock_quantity - answer.item)
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Congratulations on your purchase!");
              purchase();
            }
          );
        }
        else {

          console.log("Insufficient quantity!");
          purchase();
        }
      });
  });
}
