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
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option: ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "choice"
        }
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.choice === "View Products for Sale") {
            connection.query(`SELECT * FROM products`, function (error, results, fields) {
                console.log(`Item ID | Product Department | Price ($) | Quantity in Stock`);
                for (var i = 0; i < results.length; i++) {
                    console.log(`${results[i].item_id} | ${results[i].product_name} | ${results[i].department_name} | ${results[i].price} | ${results[i].stock_quantity}`);
                }
                connection.end();
            });
        }
        if (inquirerResponse.choice === "View Low Inventory") {
            connection.query(`SELECT * FROM products WHERE stock_quantity <= 5`, function (error, results, fields) {
                console.log(`Item ID | Product Department | Price ($) | Quantity in Stock`);
                for (var i = 0; i < results.length; i++) {
                    console.log(`${results[i].item_id} | ${results[i].product_name} | ${results[i].department_name} | ${results[i].price} | ${results[i].stock_quantity}`);
                }
                connection.end();
            });
        }
        if (inquirerResponse.choice === "Add to Inventory") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the ID of the product you would like to add stock to: ",
                    name: "id"
                },
                {
                    type: "input",
                    message: "How many would you like to add?",
                    name: "quantity"
                }
            ]).then(function(inquirerResponse) {
                connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${inquirerResponse.quantity} WHERE item_id = ${inquirerResponse.id}; SELECT * FROM products WHERE item_id = ${inquirerResponse.id}`, function(error, results, fields) {
                    console.log(`You added ${inquirerResponse.quantity} units of ${results[1][0].product_name}. New quantity: ${results[1][0].stock_quantity} units.`)
                    connection.end();
                });
            });
        }
        if (inquirerResponse.choice === "Add New Product") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter your product's name: ",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Enter your product's department: ",
                    name: "department"
                },
                {
                    type: "input",
                    message: "Enter your product's price: ",
                    name: "price"
                },
                {
                    type: "input",
                    message: "Enter how many you want to stock: ",
                    name: "quantity"
                }
            ]).then(function (inquirerResponse) {
                connection.query(`INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('${inquirerResponse.name}', '${inquirerResponse.department}', ${inquirerResponse.price}, ${inquirerResponse.quantity})`, function (error, results, fields) {
                    if (error) throw error;
                });
                connection.end();
            });
        }
    });
});