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