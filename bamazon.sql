DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
product_sales INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE departments (
department_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL,
overhead_costs INTEGER NOT NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Sandwich", "Groceries", 5, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Sliced Bread", "Groceries", 3, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Detergent", "Cleaning", 6, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Hand Soap", "Cleaning", 3, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Paper Towels", "Household", 10, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Garbage Bags", "Household", 8, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Playstation 4", "Video Games", 300, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Call of Duty", "Video Games", 60, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Inception", "Movies", 15, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Star Wars", "Movies", 15, 30);

INSERT INTO departments(department_name, overhead_costs)
VALUES("Groceries", 200);

INSERT INTO departments(department_name, overhead_costs)
VALUES("Cleaning", 50);

INSERT INTO departments(department_name, overhead_costs)
VALUES("Household", 100);

INSERT INTO departments(department_name, overhead_costs)
VALUES("Video Games", 150);

INSERT INTO departments(department_name, overhead_costs)
VALUES("Movies", 80);