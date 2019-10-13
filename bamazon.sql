DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(100) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "Electronics", 699.99, 20),
("Android Charger", "Electronics", 19.99, 56),
("Water Bottle", "Outdoors", 12.99, 100),
("Bose Headphones", "Electronics", 399.99, 40),
("Ray Ban Shades", "Fashion", 199.95, 12),
("Mens Socks 4-pack", "Clothing", 15.99, 36),
("Citizen Mens Watch", "Fashion", 495.95, 40),
("USB Charger 64 GB", "Electronics", 50.00, 24),
("Connect 4 Board Game", "Toys", 12.99, 265),
("Playstation Wireless Controller", "Video Games", 43.95, 121);



