DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL
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

UPDATE products SET stock_quantity = 5 WHERE item_id = 2;
SELECT * FROM products;