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
            choices: ["View Product Sales by Department", "Create New Department"],
            name: "choice"
        }
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.choice === "View Product Sales by Department") {
            console.log("Hello 1");
        }
        if (inquirerResponse.choice === "Create New Department") {
            console.log("Hello 2");
        }
        connection.end();
    });
});