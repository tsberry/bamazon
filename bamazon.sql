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
VALUES(2, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(3, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(4, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(5, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(6, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(7, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(8, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(9, "Sandwich", "Groceries", 5, 20);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES(10, "Sandwich", "Groceries", 5, 20);