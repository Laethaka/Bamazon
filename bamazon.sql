-- DROP DATABASE IF EXISTS bamazon;

-- create database bamazon;

use bamazon;

-- create table products (
--     item_id int(11) not null auto_increment,
--     product_name varchar(30) not null,
--     department_name varchar(30) not null,
--     price float(10, 2) not null,
--     stock_quantity int(11),
--     primary key (item_id)
-- );

-- insert into products (product_name, department_name, price, stock_quantity)
-- values 
--     ('Infinite Jest', 'fiction', 4.27, 10),
--     ('Fort Not', 'poetry', 4.30, 10),
--     ('Jane Eyre', 'fiction', 4.11, 95),
--     ('End Zone', 'fiction', 3.64, 90),
--     ('Arcadia', 'play', 4.19, 85),
--     ('Gorbachev: His Life and Times', 'nonfiction', 4.23, 90),
--     ('Myra Breckinridge', 'fiction', 3.54, 90),
--     ('King Lear', 'play', 3.90, 95),
--     ('Antigone', 'play', 3.81, 90),
--     ('Cyrano de Bergerac', 'play', 4.05, 95),
--     ('American Psycho', 'fiction', 3.82, 100),
--     ('Titus Groan', 'fiction', 3.91, 95);

-- create table departments (
--     department_id int(11) not null auto_increment,
--     department_name varchar(30) not null,
--     over_head_costs float(11, 2) not null,
--     primary key (department_id)
-- );

-- insert into departments (department_name, over_head_costs)
-- values
--     ('nonfiction', 1000),
--     ('fiction', 1500),
--     ('poetry', 500),
--     ('play', 450);

-- select * from departments;

select * from products;