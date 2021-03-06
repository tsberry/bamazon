var mysql = require("mysql");
var inquirer = require("inquirer");
var printTable = require("./printTable.js");

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
    start();
});

function start() {
    connection.query(`SELECT item_id AS "Item ID", product_name AS "Product Name", department_name AS "Product Department", price AS "Price ($)", stock_quantity AS "Quantity in Stock" FROM products`, function (error, results, fields) {
        printTable(results, fields);
        inquirer.prompt([
            {
                type: "list",
                message: "Choose an option:",
                choices: ["Buy a product", "Quit"],
                name: "choice"
            }
        ]).then(function (inquirerResponse) {
            if (inquirerResponse.choice === "Buy a product") buy();
            if (inquirerResponse.choice === "Quit") quit();
        });

    });
}

function buy() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you would like to purchase:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the quantity you would like to purchase:",
            name: "quantity"
        }
    ]).then(function (inquirerResponse) {
        connection.query(`SELECT * FROM products WHERE ?`, { item_id: `${inquirerResponse.id}` }, function (error, results, fields) {
            if (error) throw error;
            console.log(`You ordered ${inquirerResponse.quantity} units of ${results[0].product_name}.`);
            if (results[0].stock_quantity < inquirerResponse.quantity) {
                console.log(`Sorry, we only have ${results[0].stock_quantity} in stock.`);
            }
            else {
                var cost = inquirerResponse.quantity * results[0].price;
                connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${inquirerResponse.quantity}, product_sales = product_sales + ${cost} WHERE ?`, { item_id: `${inquirerResponse.id}` }, function (error, results, fields) {
                    if (error) throw error;
                    console.log(`Your total cost is ${cost} dollars.`);
                });
            }
            start();
        });
    });
}

function quit() {
    console.log("Thank you for shopping at Bamazon. Please come again.");
    connection.end();
}