var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection Succesful!")
    startPrompt();
  });

function startPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true
    }]).then(function(answer) {
        if (answer.confirm === true) {
            makeTable();
        } else {
            console.log("Thank You! Have a good day!");
            connection.end();
        }
    })
}
function makeTable() {
    connection.query("SELECT * FROM products", function(err,res) {
        for (var i=0; i<res.length; i++) {
            console.log(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name
            + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
        }
        customerPrompt();
    })
}
function customerPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "purchase",
        message: "Would you like to purchase an item?",
        default: true

    }]).then(function(answer) {
        if (answer.purchase === true) {
            selectionPrompt();
        } else {
            console.log("Thank you! Have a nice day!");
            connection.end();
        }
    });
}
function selectionPrompt() {
    inquirer.prompt([
        {
            message: "Please type in the product id you would like to order.",
            type: "input",
            name: "prodId"
        },
        {
            message: "how many of this item would you like to purchase",
            type: "input",
            name: "prodQty"
        }
    ]).then(function (ans) {
       connection.query("SELECT * FROM products WHERE item_id=?", ans.prodId, function(err,res) {
           if (err) throw err;
           for (var i=0; i<res.length; i++) {
               if (ans.prodQty > res[i].stock_quantity) {
                   console.log("We apologize, insufficient quantity! Please try again at a later time.")
                   startPrompt();
               } else {
                   console.log("Stock quantity sufficient, order can be made");
                   console.log("=======================")
                   console.log("You have selected: ")
                   console.log("Item: " + res[i].product_name + " || " + "Price: " + res[i].price + " || " + "Quantity: " + ans.prodQty);
                   console.log("Total: " + res[i].price * ans.prodQty);
                   var newStock = (res[i].stock_quantity - ans.prodQty);
                   var purchaseId = (ans.prodId);
                   confirm(newStock, purchaseId);
               }
           }
       })
    });
}
function confirm(newStock,purchaseId) {
    inquirer.prompt([{
        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true
}]).then(function(ans){
    if (ans.confirmPurchase === true) {
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newStock
        }, {
            item_id: purchaseId
        }], function(err, res) {});

        console.log("=================================");
        console.log("Transaction completed. Thank you.");
        console.log("=================================");
        startPrompt();
    } else {
        console.log("=================================");
        console.log("No worries. Maybe next time!");
        console.log("=================================");
        startPrompt();
    }
});
}

