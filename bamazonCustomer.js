var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

var displayTable = new Table({head: ['item_id', 'product_name', 'price'], style: {head:[], border:[], 'padding-left':1, 'padding-right': 1 }})

connection.connect(function(err) {
    if (err) throw err;
    connection.query('Select * from products', function(err, res) {
        if (err) throw err;
        res.forEach(function(ele) {
            displayTable.push([ele.item_id, ele.product_name, ele.price]);
        })
        console.log(displayTable.toString());
        userPrompt();
    })
})

function userPrompt() {
    // function validateInputId(input) {
    //     if (isNaN(input) || input>12 || input<1) {
    //         return 'Please pick a valid ID'
    //     } else {
    //         return true
    //     };
    // };
    function validateInputQuantity(input) {
        if (isNaN(input)) {
            return 'Please input a number'
        } else {
            return true
        };
    };

    inquirer.prompt([
        {
            type: 'input',
            message: 'Welcome to Bamazon! What item ID would you like to buy?',
            validate: validateInputQuantity,
            name: 'inputId'
        },
        {
            type: 'input',
            message: 'How much would you like to buy?',
            validate: validateInputQuantity,
            name: 'inputQuantity'
        }
    ]).then(function(response) {
        // console.log(`ok, buying item ${response.inputId}`)
        updateProduct(response.inputId, response.inputQuantity);
    });
};

function updateProduct(id, quantity) {
    connection.query(`select * from products where item_id = '${id}'`, function(err, res) {
        if (err) throw err;
        if (res[0].stock_quantity >= quantity) {
            console.log(`Valid order confirmed! Your total is $${(quantity * res[0].price).toFixed(2)} for ${quantity} copies of ${res[0].product_name}`)
            connection.query(`update products set stock_quantity = '${res[0].stock_quantity - quantity}' where item_id = '${id}'`)
        } else {
            console.log('Invalid order! Please pick a smaller quantity.')
        }
        connection.end();
    })
}