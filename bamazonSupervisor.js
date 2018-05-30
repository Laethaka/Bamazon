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

var displayTable = new Table({head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'], style: {head:[], border:[], 'padding-left':1, 'padding-right': 1 }})

connection.connect(function(err) {
    if (err) throw err;

    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'startChoice',
            choices: ['View Sales by Department', 'Create New Department']
        }
    ]).then(function(response) {
        if (response.startChoice === 'View Sales by Department') {
            connection.query('Select * from departments', function(err,res){
                if (err) throw err;
                res.forEach(function(ele) {
                    //NEED TO SUM & STORE PRODUCT SALES
                    var sales;
                    connection.query(`SELECT SUM(product_sales) FROM products WHERE department_name = '${ele.department_name}'`, function(err, res) {
                        sales = res[0]['SUM(product_sales)'];
                        displayTable.push([ele.department_id, ele.department_name, ele.over_head_costs, sales]);
                    })
                    //NEED TO CALC & STORE TOTAL PROFIT
                })
                console.log(displayTable.toString());
                connection.end();
            })
        }
    })
});