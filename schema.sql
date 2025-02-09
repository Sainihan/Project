create table user(
    id int primary key,
    email varchar(50) unique ,                  
    username varchar(50) unique ,
    password varchar(50) not null 
);
