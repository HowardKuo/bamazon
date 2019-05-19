DROP DATABASE IF EXISTS bamazaon_DB;
CREATE DATABASE bamazaon_DB;
USE bamazaon_DB;

CREATE TABLE products(
    item_id INTEGER(255) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price FLOAT(255,2),
    stock_quantity INT(255),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name, price, stock_quantity) values('Broom','Cleaning',4.50,50);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Flat Screen TV','Electronics',2599.99,12);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Fishing Pole','Outdoors',23.99,20);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Vaccum','Cleaning',79.99,3);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Digital Professional Camera','Electronics',1899.99,4);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Rotisserie chicken','Food',4.99,25);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Dollhouse','Kids',19.99,7);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Fluffy Blanket of Awesomeness','Home Goods',18.50,1);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Biker Jacket','Clothing',34.50,10);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Ugly Christmas Sweater','Clothing',24.99,29);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('A Real Life Pikachu','???',999999.99,1);
INSERT INTO products (product_name,department_name, price, stock_quantity) values('Lie Detector','Electronics',699.99,13);