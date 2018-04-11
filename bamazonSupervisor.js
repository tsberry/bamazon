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
            connection.query(`SELECT * FROM departments; SELECT * FROM products`, function (error, results, fields) {
                if (error) throw error;
                console.log("Department Id | Department Name | Product Sales | Total Profit");
                for (var i = 0; i < results[0].length; i++) {
                    var sales = 0;
                    var department = results[0][i].department_name;
                    var id = results[0][i].department_id;
                    var overhead = results[0][i].overhead_costs;
                    for (var j = 0; j < results[1].length; j++) {
                        if (results[1][j].department_name === department) sales += results[1][j].product_sales;
                    }
                    console.log(`${id} | ${department} | ${sales} | ${sales - overhead}`);
                }
            });
        }
        if (inquirerResponse.choice === "Create New Department") {
            console.log("Hello 2");
        }
        connection.end();
    });
});