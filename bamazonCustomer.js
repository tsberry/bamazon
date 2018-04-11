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
            if(results[0].stock_quantity < inquirerResponse.quantity) {
                console.log(`Sorry, we only have ${results[0].stock_quantity} in stock.`);
            }
            else {
                connection.query(`UPDATE products SET stock_quantity = ${results[0].stock_quantity - inquirerResponse.quantity} WHERE item_id = ${inquirerResponse.id}; SELECT * FROM products WHERE item_id = '${inquirerResponse.id}'`, function(error, results, fields) {
                    if(error) throw error;
                    console.log(`New stock is ${results[1][0].stock_quantity} units of ${results[1][0].product_name}.`);
                    console.log(`Your total cost is ${inquirerResponse.quantity * results[1][0].price}.`);
                });
            }
            connection.end();
        })
    });
});