DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  ID INT NOT NULL AUTO_INCREMENT UNIQUE,
  Name VARCHAR(45) NOT NULL,
  Department Name VARCHAR(45) NOT NULL,
  Price INT(10) NOT NULL,
  Stock Quantity INT(10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (flavor, price, quantity)
VALUES ("vanilla", 2.50, 100);

INSERT INTO products (flavor, price, quantity)
VALUES ("chocolate", 3.10, 120);

INSERT INTO products (flavor, price, quantity)
VALUES ("strawberry", 3.25, 75);