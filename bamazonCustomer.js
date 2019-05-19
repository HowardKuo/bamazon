var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "productList",
                    type: "list",
                    message: "Welcome to Bamazon! We are not the ghetto Amazon... You may press 'ctrl + c' at any point to leave the store. Please select the ID of what you would like to buy? ",
                    choices: function () {
                        var productsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            productsArray.push(results[i].product_name);
                        }
                        return productsArray;
                    },
                }
            ])
            .then(function (answer) {
                var chosenProduct;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.productList) {
                        chosenProduct = results[i];
                    }
                }
                inquirer
                    .prompt([
                        {
                            name: "purchaseQuantity",
                            type: "input",
                            message: "There are " + chosenProduct.stock_quantity + " " + chosenProduct.product_name + "(s) in stock. Each " + chosenProduct.product_name + " costs $" + chosenProduct.price + ". How many would you like to buy?"
                        }
                    ])
                    .then(function (quantity) {
                        var purchasingQuantity = parseInt(quantity.purchaseQuantity)
                        if (chosenProduct.stock_quantity >= purchasingQuantity) {
                            inquirer
                                .prompt([
                                    {
                                        name: "confirmPurchase",
                                        type: "list",
                                        message: "Your total is $" + parseFloat(chosenProduct.price * purchasingQuantity) + ". Do you confirm your purchase? Select 'Exit' to cancel your purchase and be brought back to the product list.",
                                        choices: ["Confirm", "Exit"]
                                    }
                                ])
                                .then(function (confirmation){
                                    if (confirmation.confirmPurchase === "Confirm") {
                                        var newQuantity = chosenProduct.stock_quantity - purchasingQuantity;
                                        connection.query(
                                            "UPDATE products SET ? WHERE ?",
                                            [
                                                {
                                                    stock_quantity: newQuantity
                                                },
                                                {
                                                    item_id: chosenProduct.item_id
                                                }
                                            ],                                             
                                            function(error) {
                                                if (error) throw err;
                                                console.log("Item(s) purchased! Returning to product list. \n-----------------------------------------------\n");
                                                start();
                                            }
                                        );
                                    }
                                    else {
                                        console.log("\n-----------------------------------------------\n")
                                        start();
                                    }
                                });
                        }
                        else if ((chosenProduct.stock_quantity < purchasingQuantity)) {
                            console.log("There are not enough " + chosenProduct.product_name + "'s to fulfill your order. Sorry! Returning to product list. \n-----------------------------------------------\n")
                            start();
                        }
                        else{
                            console.log("There was an error with your order. Returning to product list. \n-----------------------------------------------\n");
                            start();
                        }
                    });
            });

    });
}