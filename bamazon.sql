DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(10) NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(1, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(2, "Sliced Bread", "Groceries", 3, 50);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(3, "Detergent", "Cleaning", 6, 30);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(4, "Hand Soap", "Cleaning", 3, 25);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(5, "Paper Towels", "Household", 10, 100);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(6, "Garbage Bags", "Household", 8, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(7, "Playstation 4", "Video Games", 300, 10);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(8, "Call of Duty", "Video Games", 60, 15);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(9, "Inception", "Movies", 15, 30);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(10, "Star Wars", "Movies", 15, 30);

SELECT * FROM products;