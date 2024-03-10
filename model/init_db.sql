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
    PRIMARY KEY (id)
);
