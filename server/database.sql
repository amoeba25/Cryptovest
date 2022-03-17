CREATE DATABASE crypto; 

CREATE EXTENSION IF NOT EaXISTS "uuid-ossp";
/* set the uuid extension before creating the table -> CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; */
--user table--
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    f_name VARCHAR(50) NOT NULL, 
    l_name VARCHAR(50), 
    email VARCHAR(100) NOT NULL, 
    password VARCHAR(100) NOT NULL,
    funds FLOAT DEFAULT 0
); 

--dummy data for users table 
INSERT INTO users (f_name, l_name, email, password) VALUES ('Soham', 'Shah', 'soham@gmail.com', 'pch123');
INSERT INTO users (f_name, l_name, email, password) VALUES ('Aakash', 'Raju', 'aakash@gmail.com', 'lom456');


-- transaction table --
CREATE TABLE transactions(
  user_id uuid,
  coin VARCHAR(10),  
  buy_price NUMERIC DEFAULT NULL,
  buy_date DATE DEFAULT NULL,
  quantity NUMERIC,
  sell_date DATE DEFAULT NULL,
  sell_price NUMERIC DEFAULT NULL,
  CONSTRAINT fk_users
  FOREIGN KEY(user_id) 
  REFERENCES users(user_id) 

);

DROP TABLE transactions;

--dummy data for transactions
INSERT INTO transactions (user_id, f_name, coin, buy_price, buy_date, quantity) VALUES ('463c80e5-ee24-4239-a43d-6393cd46488f', 'Soham', 'BTC', 12.567, '2021-10-05', 0.003);
INSERT INTO transactions (user_id, f_name, coin, quantity, sell_date, sell_price) VALUES ('463c80e5-ee24-4239-a43d-6393cd46488f', 'Soham', 'BTC', 0.001, '2021-10-15', 14.55);
INSERT INTO transactions (user_id, f_name, coin, quantity, sell_date, sell_price) VALUES ('47adb3bf-a5f0-4d0f-b785-f16a01438e3e', 'Darsh', 'BTC', 0.001, '2021-10-15', 14.55);
INSERT INTO transactions (user_id, f_name, coin, buy_price, buy_date, quantity) VALUES ('47adb3bf-a5f0-4d0f-b785-f16a01438e3e', 'Darsh', 'BTC', 12.567, '2021-10-05', 0.003);



--portfolio table
CREATE TABLE portfolio(
  user_id uuid,
  coin VARCHAR(10),  
  price NUMERIC,
  quantity NUMERIC,
  CONSTRAINT fk_users
  FOREIGN KEY(user_id) 
  REFERENCES users(user_id) 
);

DROP TABLE portfolio;

--dummy data for portfolio
INSERT INTO portfolio (user_id, f_name, coin, price, quantity) VALUES ('463c80e5-ee24-4239-a43d-6393cd46488f','Soham', 'BTC', 13.45, 0.002);
INSERT INTO portfolio (user_id, f_name, coin, price, quantity) VALUES ('463c80e5-ee24-4239-a43d-6393cd46488f','Soham', 'ETH', 12.25, 0.002);
INSERT INTO portfolio (user_id, f_name, coin, price, quantity) VALUES ('47adb3bf-a5f0-4d0f-b785-f16a01438e3e','Darsh', 'ETH', 12.25, 0.002);
INSERT INTO portfolio (user_id, f_name, coin, price, quantity) VALUES ('47adb3bf-a5f0-4d0f-b785-f16a01438e3e','Darsh', 'BTC', 13.45, 0.002);



-- misc sql staements
UPDATE users SET funds= funds+ 1000 WHERE user_id = '47adb3bf-a5f0-4d0f-b785-f16a01438e3e'; 

UPDATE portfolio SET price=price+ 2, quantity=quantity+ 0.001 WHERE user_id='VtwwUyYFAzgzHMK' and coin='BTC'; 

SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users';

ALTER TABLE users ALTER COLUMN password TYPE VARCHAR;

