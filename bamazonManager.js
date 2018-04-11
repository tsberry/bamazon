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
            });
        }
        connection.end();
    });
})