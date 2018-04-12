var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require("table");

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
    afterConnection();
});

function afterConnection() {
    connection.query(`SELECT * FROM products`, function (error, results, fields) {
        var data = [];
        data.push(["Item ID", "Product Name", "Product Department", "Price ($)", "Quantity in Stock"]);
        for (var i = 0; i < results.length; i++) {
            var row = Object.values(results[i]);
            row.pop();
            data.push(row);
        }
        var output = table(data);
        console.log(output);
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
            connection.query(`SELECT * FROM products WHERE ?`, {item_id: `${inquirerResponse.id}`}, function (error, results, fields) {
                if (error) throw error;
                console.log(`You ordered ${inquirerResponse.quantity} units of ${results[0].product_name}.`);
                if (results[0].stock_quantity < inquirerResponse.quantity) {
                    console.log(`Sorry, we only have ${results[0].stock_quantity} in stock.`);
                }
                else {
                    var cost = inquirerResponse.quantity * results[0].price;
                    connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${inquirerResponse.quantity}, product_sales = product_sales + ${cost} WHERE ?`, {item_id: `${inquirerResponse.id}`}, function (error, results, fields) {
                        if (error) throw error;
                        console.log(`Your total cost is ${cost} dollars.`);
                    });
                }
                connection.end();
            })
        });
    });
}