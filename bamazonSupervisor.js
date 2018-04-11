var mysql = require("mysql");
var inquirer = require("inquirer");
var {table} = require("table");

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
                // console.log("Department Id | Department Name | Product Sales | Total Profit");
                var data = [];
                data.push(["Department ID", "Department Name", "Product Sales", "Total Profit"])
                for (var i = 0; i < results[0].length; i++) {
                    var row = Object.values(results[0][i]);
                    var sales = 0;
                    var department = results[0][i].department_name;
                    var id = results[0][i].department_id;
                    var overhead = results[0][i].overhead_costs;
                    for (var j = 0; j < results[1].length; j++) {
                        if (results[1][j].department_name === department) sales += results[1][j].product_sales;
                    }
                    row.splice(2, 0, sales);
                    row[3] = sales -  row[3];
                    data.push(row);
                }
                var output = table(data);
                console.log(output);
                connection.end();
            });
        }
        if (inquirerResponse.choice === "Create New Department") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter new department name: ",
                    name: "department"
                },
                {
                    type: "input",
                    message: "Enter new department's overhead costs: ",
                    name: "overhead"
                }
            ]).then(function (inquirerResponse) {
                connection.query(`INSERT INTO departments(department_name, overhead_costs) VALUES('${inquirerResponse.department}', ${inquirerResponse.overhead})`, function (error, results, fields) {
                    if (error) throw error;
                });
                connection.end();
            });
        }
    });
});