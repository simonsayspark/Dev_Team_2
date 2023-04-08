CREATE DATABASE IF NOT EXISTS DBUI;

USE DBUI;

create table ceo (
    ceo_id int auto_increment primary key,
    cname VARCHAR (50),
    cemail VARCHAR (50),
    cpassword VARCHAR (60)
);

create table companies (
    company_id int auto_increment primary key,
    company_name VARCHAR (50) UNIQUE NOT NULL,
    ceo_id int,
    foreign key(ceo_id) references ceo(ceo_id)
);

create table employees (
    employee_id int auto_increment primary key,
    ename VARCHAR (50),
    eemail VARCHAR (50) UNIQUE,
    epassword VARCHAR (60),
    role VARCHAR (50),
    company_id int,
    foreign key(company_id) references companies(company_id)
);

create table claims ( --look for this --
    claim_number int auto_increment primary key,
    employee_id int,
    company_id int,
    order_date date,
    amount_requested int,
    amount_reimbursed int DEFAULT NULL, 
    claim_status VARCHAR(50) DEFAULT 'Pending',
    foreign key(employee_id) references employees(employee_id),
    foreign key(company_id) references companies(company_id)

);

--possibly will add financial table in future