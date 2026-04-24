/* Part 1: ERD Diagram (1 Grade) 

    Assignment5\Musicana records.JPG

*/

/*  Part2: Design a schema (Mapping) 

    Assignment5\Mapping ERD.JPG
*/


/* Part 3:

CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierName VARCHAR(100),
    ContactNumber VARCHAR(20)
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100),
    Price DECIMAL(10,2),
    StockQuantity INT,
    SupplierID INT,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

CREATE TABLE Sales (
    SaleID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    QuantitySold INT,
    SaleDate DATE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

*/


/**
    2) Add “Category” Column
    ALTER TABLE Products
    ADD Category VARCHAR(50);

    3) Remove “Category” Column
    ALTER TABLE Products
    DROP COLUMN Category;

    4) Change ContactNumber to VARCHAR(15)
    ALTER TABLE Suppliers
    MODIFY ContactNumber VARCHAR(15);

    5) Add NOT NULL to ProductName
    ALTER TABLE Products
    MODIFY ProductName VARCHAR(100) NOT NULL;

    6) Perform Basic Inserts
a) Add Supplier
INSERT INTO Suppliers (SupplierName, ContactNumber)
VALUES ('FreshFoods', '01001234567');



b) Insert Products (linked to FreshFoods)
INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
VALUES 
('Milk', 15.00, 50, (SELECT SupplierID FROM Suppliers WHERE SupplierName = 'FreshFoods')),
('Bread', 10.00, 30, (SELECT SupplierID FROM Suppliers WHERE SupplierName = 'FreshFoods')),
('Eggs', 20.00, 40, (SELECT SupplierID FROM Suppliers WHERE SupplierName = 'FreshFoods'));


c) Add Sale for Milk
INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
VALUES (
    (SELECT ProductID FROM Products WHERE ProductName = 'Milk'),
    2,
    '2025-05-20'
);


7) Update Price of Bread
UPDATE Products
SET Price = 25.00
WHERE ProductName = 'Bread';


8) Delete Product 'Eggs'
DELETE FROM Products
WHERE ProductName = 'Eggs';

9) Total Quantity Sold for each Product.

SELECT p.ProductName, SUM(s.QuantitySold) AS TotalSold
FROM Products p
LEFT JOIN Sales s ON p.ProductID = s.ProductID
GROUP BY p.ProductName;



10) Get the product with the highest stock

SELECT ProductName, StockQuantity
FROM Products
ORDER BY StockQuantity DESC
LIMIT 1;


11) Find suppliers with names starting with 'F'

SELECT *
FROM Suppliers
WHERE SupplierName LIKE 'F%';


12) Show all products that have never been sold

SELECT p.ProductName
FROM Products p
LEFT JOIN Sales s ON p.ProductID = s.ProductID
WHERE s.ProductID IS NULL;

13-Get all sales along with product name and sale date.
SELECT p.ProductName, s.SaleDate, s.QuantitySold
FROM Sales s
JOIN Products p ON s.ProductID = p.ProductID;

14-Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables.
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '1234';

GRANT SELECT, INSERT, UPDATE ON retail_store_db.* TO 'store_manager'@'localhost';


15-Revoke UPDATE permission from “store_manager”.

REVOKE UPDATE ON *.* FROM 'store_manager'@'localhost';

16-Grant DELETE permission to “store_manager” only on the Sales table.

GRANT DELETE ON retail_store_db.Sales TO 'store_manager'@'localhost';

 * 
 */

import express from "express";
import mysql2 from 'mysql2/promise'

const app = express();


const connection = await mysql2.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "myfirstdb",
});


const tesConnection = async () => {
    try {
        await connection.connect()
        console.log("DB connected Successfully");
    } catch(error) {
        console.log("DB connection failed");
    }
}

tesConnection();

app.use(express.json());

app.get("/", (req, res) => {
  res.write("Hello World");
  res.end();
});


app.listen(3000, () => {
    console.log("server running on port 3000");
})