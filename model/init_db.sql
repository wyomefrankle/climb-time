--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists climbs, users;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE climbs(
    id INT NOT NULL AUTO_INCREMENT, 
    -- date of log
    date DATE NOT null,
    -- grade of the climb
    grade VARCHAR(40) NOT null, 
    -- where was the climb
    location VARCHAR(40) NOT null,
    -- my own feeling of the grade 
    feels_like VARCHAR(40),
    -- additional comments I want to add to the climb
    comment TEXT,
    -- project/flash
    style TEXT NOT null, 
    -- tries
    tries INT,
    -- user id 
    user_id TEXT NOT null,
    lat DECIMAL(10,6) NOT null,
    lng DECIMAL(10,6) NOT null,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT, 
    -- user id
    user_id TEXT NOT null, 
    -- user first name
    firstname TEXT,
    -- user last name
    lastname TEXT,
    -- user password
    password TEXT NOT null,
    PRIMARY KEY (id)
);
