--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists climbs;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE climbs(
    id INT NOT NULL AUTO_INCREMENT, 
    -- grade of the climb
    grade VARCHAR(40) NOT null, 
    -- where was the climb
    location VARCHAR(40) NOT null,
    -- my own feeling of the grade 
    feels_like VARCHAR(40),
    -- additional comments I want to add to the climb
    comment TEXT,
    -- project/flash
    status TINYINT NOT null, 
    -- name of the gym
    name VARCHAR(40) NOT null,
    PRIMARY KEY (id)
);
