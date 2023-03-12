CREATE DATABASE IF NOT EXISTS db;

USE db;

create table companies (
    company_id int AUTOINCREMENT primary key,
    company_name VARCHAR (50) UNIQUE NOT NULL,
    ceo_id int,
    foreign key(ceo_id) references ceo
);

create table employees (
    employee_id int AUTOINCREMENT primary key,
    ename VARCHAR (50),
    epassword VARCHAR (50),
    role VARCHAR (50),
    company_id int,
    foreign key(company_id) references companies
);

create table ceo (
    ceo_id int AUTOINCREMENT primary key,
    cname VARCHAR (50)
);

--create table claims (

--);

--possibly will add financial table in future