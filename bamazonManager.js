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
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
            name: "choice"
        }
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.choice === "View Products for Sale") viewProducts();
        if (inquirerResponse.choice === "View Low Inventory") viewLow();
        if (inquirerResponse.choice === "Add to Inventory") addInventory();
        if (inquirerResponse.choice === "Add New Product") addProduct();
        if (inquirerResponse.choice === "Quit") quit();
    });
}

function viewProducts() {
    connection.query(`SELECT item_id AS "Item ID", product_name AS "Product Name", department_name AS "Product Department", price AS "Price ($)", stock_quantity AS "Quantity in Stock", product_sales AS "Product Sales ($)" FROM products`, function (error, results, fields) {
        printTable(results, fields);
        start();
    });
}

function viewLow() {
    connection.query(`SELECT item_id AS "Item ID", product_name AS "Product Name", department_name AS "Product Department", price AS "Price ($)", stock_quantity AS "Quantity in Stock", product_sales AS "Product Sales ($)" FROM products WHERE stock_quantity <= 5`, function (error, results, fields) {
        printTable(results, fields);
        start();
    });
}

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you would like to add stock to:",
            name: "id"
        },
        {
            type: "input",
            message: "How many would you like to add?",
            name: "quantity"
        }
    ]).then(function (inquirerResponse) {
        connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${inquirerResponse.quantity} WHERE ?; SELECT * FROM products WHERE ?`, [{ item_id: inquirerResponse.id }, { item_id: inquirerResponse.id }], function (error, results, fields) {
            console.log(`You added ${inquirerResponse.quantity} units of ${results[1][0].product_name}. New quantity: ${results[1][0].stock_quantity} units.`)
            start();
        });
    });
}

function addProduct() {
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
        connection.query("INSERT INTO products SET ?", {
            product_name: inquirerResponse.name,
            department_name: inquirerResponse.department,
            price: inquirerResponse.price,
            stock_quantity: inquirerResponse.quantity
        }, function (error, results, fields) {
            if (error) throw error;
            console.log(`You added product '${inquirerResponse.name}' to the ${inquirerResponse.department} department. You stocked ${inquirerResponse.quantity} at ${inquirerResponse.price} dollars each.`);
            start();
        });
    });
}

function quit() {
    console.log("Thank you for using the Bamazon manager interface. Please come again.");
    connection.end();
}