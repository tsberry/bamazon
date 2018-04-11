var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

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
        connection.query(`SELECT * FROM products WHERE item_id = '${inquirerResponse.id}'`, function (error, results, fields) {
            if(error) throw error;
            console.log(`You ordered ${inquirerResponse.quantity} units of ${results[0].product_name}.`);
            // console.log(`We have ${results[0].stock_quantity} units in stock.`);
            if(results[0].stock_quantity < inquirerResponse.quantity) {
                console.log(`Sorry, we only have ${results[0].stock_quantity} in stock.`);
            }
            else {
                console.log("Hello");
            }
            connection.end();
        })
    });
});
