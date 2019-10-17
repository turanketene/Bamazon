# Bamazon

## Description

Bamazon is an Amazon-like storefront, e-commerce app that is used on the command line. Using MySQL, Node.js, and npm packages, the app allows the user to either act as a customer or a manager. As a customer, user can choose a product available from the database and buy it, which would then decrease the stock quantity. As a manager, user can look up the available products, add stock to a product, or add a new product.
## Built With
- Javascript
- Node.js
- MySQL
- NPM packages : 
  - MySQL: https://www.npmjs.com/package/mysql
  - Inquirer: https://www.npmjs.com/package/inquirer
  
## Video demo of working app
https://drive.google.com/file/d/1VQeSStZfKSCWyiQP_ztYMG4svWasemWg/view


## How To Use
Customer View:
1. Start by running the customer module by entering in: 
node bamazonCustomer.js to the command line.
2. An inquirer prompt will ask the user if they would like to view the inventory.
3. If a 'yes' is selected, user will be displayed the full product list. Then they will be asked if they would like to purchase an item.
4. User then types in the product ID for their choice and the quantity. The total cost will be displayed and the user will be asked to confirm their purchase.
5. Transaction is completed, and the products will be updated on the database so the information stays current and accurate.

Manager View:
1. Start by running the manager module by entering in:
node bamazonManager.js to the command line.
2. User will be asked to select one of 4 choices; "View products for sale", "View low inventory", "Add to inventory", "Add new product".
3. Selecting the "View products for Sale" will output the current full products list. Selecting the "View low inventory" will only print out the products that have quantities less than 5.
4. "Add to inventory" will prompt the user to enter in the product id to add quantity to. The next prompt will ask how many to add, after which the database will be updated with the new quantities.
5. "Add new product" will ask the user to enter in product name, department, price, and quantity. Once this is done, the database will be updated to include this new product.

## Contributers
Turan Ketene (Github: github.com/turanketene)

