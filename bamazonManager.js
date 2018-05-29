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

var displayTable = new Table({head: ['item_id', 'product_name', 'price', 'stock_quantity'], style: {head:[], border:[], 'padding-left':1, 'padding-right': 1 }})

connection.connect(function(err) {
    if (err) throw err;

    inquirer.prompt([
        {
            message: 'Welcome to Bamazon Manager! What would you like to do?',
            choices: ['View All Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            name: 'startChoice',
            type: 'list'
        }
    ]).then(function(response) {
        switch(response.startChoice) {
            case 'View All Products':
                connection.query('Select * from products', function(err, res) {
                    if (err) throw err;
                    res.forEach(function(ele) {
                        displayTable.push([ele.item_id, ele.product_name, ele.price, ele.stock_quantity]);
                    })
                    console.log(displayTable.toString())
                })
                connection.end();
                break;
            case 'View Low Inventory':
                connection.query(`Select * from products where stock_quantity < 5`, function(err, res) {
                    if (err) throw err;
                    res.forEach(function(ele) {
                        displayTable.push([ele.item_id, ele.product_name, ele.price, ele.stock_quantity]);
                    })
                    console.log(displayTable.toString())
                });
                connection.end();
                break;
            case 'Add to Inventory':
                    function validateInputQuantity(input) {
                        if (isNaN(input)) {
                            return 'Please input a number'
                        } else {
                            return true
                        };
                    };
                inquirer.prompt([
                    {
                        message: 'Which item ID would you like to add stock quantity to?',
                        name: 'idChoice',
                        validate: validateInputQuantity,
                        type: 'input'
                    }, 
                    {
                        message: 'How much stock would you like to add?',
                        name: 'quantChoice',
                        validate: validateInputQuantity,
                        type: 'input'
                    }
                ]).then (function (response) {
                    connection.query(`select * from products where item_id = '${response.idChoice}'`, function(err, res) {
                        if (err) throw err;
                        connection.query(`update products set stock_quantity = '${res[0].stock_quantity + parseInt(response.quantChoice)}' where item_id = '${response.idChoice}'`)
                        connection.end();
                    })
                });
                break;
            case 'Add New Product':
                inquirer.prompt([
                    {
                        message: 'What new product would you like to add?',
                        name: 'name',
                        type: 'input'
                    },
                    {
                        message: 'What is the initial stock quantity?',
                        name: 'quantity',
                        type: 'input',
                    },
                    {
                        message: 'What is the price?',
                        name: 'price',
                        type: 'input'
                    },
                    {
                        message: 'What department?',
                        name: 'department',
                        type: 'list',
                        choices: ['fiction', 'nonfiction', 'poetry', 'play']
                    }
                ]).then (function(response) {
                    connection.query(`insert into products set ?`,
                    {
                        product_name: response.name,
                        department_name: response.department,
                        price: parseFloat(response.price),
                        stock_quantity: parseInt(response.quantity)
                    },
                    function(err,res) {
                        if (err) throw err;
                        console.log(`Addition completed!`);
                        connection.end();
                    })
                })
                break;
        }
    })
})