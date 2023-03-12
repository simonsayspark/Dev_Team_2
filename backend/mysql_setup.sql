CREATE DATABASE IF NOT EXISTS DBUI;

USE DBUI;

create table ceo (
    ceo_id int auto_increment primary key,
    cname VARCHAR (50)
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
    epassword VARCHAR (50),
    role VARCHAR (50),
    company_id int,
    foreign key(company_id) references companies(company_id)
);

--create table claims (

--);

--possibly will add financial table in future