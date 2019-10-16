var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Hello! Welcome to Bamazon Manager View!");
    console.log("=============================");
    selectPrompt();
})

function selectPrompt(){
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }]).then(function(ans){
        switch(ans.action) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            
        }
    });
};
function viewProducts(){
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name
            + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity + "\n");
        }
        selectPrompt();
    });
}
function viewLowInventory(){
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err,res) {
        if (err) throw err;
        for (i=0; i<res.length; i++){
            console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name 
            + " || Quantity: " + res[i].stock_quantity + "\n");
        }
        selectPrompt();
    })
}
function addToInventory() {
    inquirer.prompt([
        {
            name: "product_ID",
            type: "input",
            message: "Enter the ID for the product you would like to add to."
        },
        {
            name: "stock",
            type: "input",
            message: "How many of this item would you like to add to the stock quantity?"
        }
    ]).then(function(answer){
		connection.query("SELECT * FROM products", function(err, res) {
			
			var chosenProduct;
			for (var i = 0; i < res.length; i++) {
				if (res[i].item_id === parseInt(answer.product_ID)) {
					chosenProduct = res[i];
				}
			}
			var newStock = parseInt(chosenProduct.stock_quantity) + parseInt(answer.stock);
            console.log("Updated stock: " + newStock);

            connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: newStock
			}, {
				item_id: answer.product_ID
			}], function (err, res) {
				if (err) {
					throw err;
				} else {
					selectPrompt();
				}
			});	
		});
	});
}
function addNewProduct() {
    inquirer.prompt([{

        type: "input",
        name: "productName",
        message: "Please enter the item name of the new product.",
    },
    {
        type: "input",
        name: "productDepartment",
        message: "Please enter the department the new product belongs to.",
    },
    {
        type: "input",
        name: "productPrice",
        message: "Please enter the price of the new product (0.00).",
    },
    {
        type: "input",
        name: "productStock",
        message: "Please enter the stock quantity of the new product.",
    }
]).then(function(ans) {
    connection.query("INSERT INTO products SET ?", {
        product_name: ans.productName,
        department_name: ans.productDepartment,
        price: ans.productPrice,
        stock_quantity: ans.productStock
      }, function(err, res) {
          if (err) throw err;
      });
      console.log("=====================");      
      console.log("New Product Successfully Added");
      console.log("=====================");
      selectPrompt();
    });
}



