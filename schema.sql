DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO 
  products (product_name, department_name, price, stock_quantity)
VALUES 
  ("hockey stick", "sporting goods", 125, 25),
  ("gopro", "electronics", 300, 20),
  ("headphones", "electronics", 125, 20),
  ("ipad", "electronics", 400, 25),
  ("soccer ball", "sporting goods", 50, 15),
  ("pancake mix", "food", 5, 50),
  ("red lobster biscuit mix", "food", 10, 40),
  ("macbook pro", "electronics", 2000, 10),
  ("dewalt drill", "tools", 150, 20),
  ("dog biscuits", "pet supplies", 10, 20);
