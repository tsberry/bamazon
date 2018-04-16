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
            choices: ["View Product Sales by Department", "Create New Department", "Quit"],
            name: "choice"
        }
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.choice === "View Product Sales by Department") viewSales();
        if (inquirerResponse.choice === "Create New Department") addDepartment();
        if (inquirerResponse.choice === "Quit") quit();
    });
}

function viewSales() {
    connection.query(`SELECT
    departments.department_id as "Department ID",
    departments.department_name AS "Department Name",
    departments.overhead_costs AS "Overhead Costs", 
    CASE 
        WHEN (sales.product_sales) IS NOT NULL 
        THEN (sales.product_sales) 
        ELSE 0 
    END AS "Product Sales", 
    CASE
        WHEN (sales.product_sales) IS NOT NULL
        THEN (sales.product_sales - departments.overhead_costs)
        ELSE (-departments.overhead_costs)
    END AS "Total Profit"
    FROM departments
    LEFT JOIN 
    (SELECT products.department_name, SUM(products.product_sales) as product_sales FROM products GROUP BY department_name) AS sales
    ON departments.department_name=sales.department_name`, function (error, results, fields) {
        if (error) throw error;
        printTable(results, fields);
        start();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter new department name:",
            name: "department"
        },
        {
            type: "input",
            message: "Enter new department's overhead costs:",
            name: "overhead"
        }
    ]).then(function (inquirerResponse) {
        connection.query("INSERT INTO departments SET ?", {department_name: inquirerResponse.department, overhead_costs: inquirerResponse.overhead}, function (error, results, fields) {
            if (error) throw error;
            console.log(`You added the ${inquirerResponse.department} department to the store with an overhead of ${inquirerResponse.overhead}.`);
            start();
        });
        
    });
}

function quit() {
    console.log("Thank you for using the Bamazon supervisor interface. Please come again.");
    connection.end();
}

function getHeader(fields) {
    var header = [];
    for(var i = 0; i < fields.length; i++) {
        header.push(fields[i]);
    }
    return header;
}