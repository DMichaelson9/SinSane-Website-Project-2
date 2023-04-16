DROP DATABASE IF EXISTS auth_db;

CREATE DATABASE auth_db;

GRANT ALL PRIVILEGES ON auth_db.* TO 'root'@'localhost';


USE auth_db;



CREATE TABLE IF NOT EXISTS loginuser(
    user_id int not null primary key auto_increment,
    user_name varchar(255),
    user_pass varchar(255)
);

insert into loginuser(user_name,user_pass) values("david@gmail.com", "david22");