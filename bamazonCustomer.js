var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'bamazon',
    multipleStatements: true
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    connection.query(`SELECT * FROM products`, function (error, results, fields) {
        console.log(`Item ID | Product Department | Price ($) | Quantity in Stock`);
        for(var i = 0; i < results.length; i++) {
            console.log(`${results[i].item_id} | ${results[i].product_name} | ${results[i].department_name} | ${results[i].price} | ${results[i].stock_quantity}`);
        }
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the ID of the product you would like to purchase: ",
                name: "id"
            },
            {
                type: "input",
                message: "Enter the quantity you would like to purchase: ",
                name: "quantity"
            }
        ]).then(function (inquirerResponse) {
            connection.query(`SELECT * FROM products WHERE item_id = ${inquirerResponse.id}`, function (error, results, fields) {
                if(error) throw error;
                console.log(`You ordered ${inquirerResponse.quantity} units of ${results[0].product_name}.`);
                if(results[0].stock_quantity < inquirerResponse.quantity) {
                    console.log(`Sorry, we only have ${results[0].stock_quantity} in stock.`);
                }
                else {
                    var cost = inquirerResponse.quantity * results[0].price;
                    connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${inquirerResponse.quantity}, product_sales = product_sales + ${cost} WHERE item_id = ${inquirerResponse.id}`, function(error, results, fields) {
                        if(error) throw error;
                        console.log(`Your total cost is ${cost} dollars.`);
                    });
                }
                connection.end();
            })
        });
    });
});