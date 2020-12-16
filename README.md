# CIS450Project

Bram Bruno, Paul Wei Zou, Phillip Sajaev, Paula Scanlan
				
COVID PAGE: Get flights to Country with less than X amount of Covid cases \
FLIGHTS PAGE: Get flights that are available from source country to destination country, list all flights \
AIRPORTS PAGE: Get all airports from a country that is clicked on \
AIRLINES PAGE: Get airlines that fly from countries with GDP in range [X,Y] \
PENN_STUDENTS PAGE: Get flights from Philadelphia to a country with specific parameters\


Motivation for the idea/description of the problem the application solves: 
We wanted to create this application to help people decide where to go when planning a vacation. Picking a place to travel is hard, so we will have the user tell us their nearest city so we can make recommendations based on that. We can also pull up flight info for them, so they can see all possible destinations and routes. This application is intended to help indecisive people make decisions and potentially learn more about new places they would have never thought about traveling to. 

# Dependencies to Install

```
npm install react-base-table --save 
```
```
npm install react-table --save
``` 

# BUILD INSTRUCTIONS
Create tables with the following commands and then load data with the commands that proceed.
```
CREATE TABLE countries(
Country varchar(60),
Region varchar(100),
Population INT,
Pop_density INT,
GPD_per_capita INT,
PRIMARY KEY(Country)
);
```
```
CREATE TABLE airports(
id int(11),
name varchar(20),
city varchar(20),
country varchar(20),
iata char(3),
PRIMARY KEY (id),
FOREIGN KEY (country) REFERENCES Countries(Country)
);
```
```
CREATE TABLE covid(
Country varchar(60),
Date varchar(10),
Confirmed INT,
Deaths INT,
Recovered INT
FORIEGN KEY(Country) REFERENCES Countries(Country)
);
```

```
CREATE TABLE airlines(
AirlineID INT,
Name varchar(60),
Country varchar(60),
Active varchar(2),
PRIMARY KEY(AirlineID),
FORIEGN KEY(Country) REFERENCES Countries(Country)
);
```

```
CREATE TABLE routes(
airlineID INT,
sourceairportid INT,
destinationairportid INT,
FOREIGN KEY (airline_id) REFERENCES Airlines(id),
FOREIGN KEY (sourceairportid) REFERENCES Airports(id),
FOREIGN KEY (destinationairportid) REFERENCES Airports(id)
);
```

Load data into tables with the following commands

```
LOAD DATA INFILE 'path_to_file/covid_df.csv' INTO TABLE covid FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES; 
```
```
LOAD DATA INFILE 'path_to_file/routes_df.csv' INTO TABLE routes FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES; 
```
```
LOAD DATA INFILE 'path_to_file/airlines_df.csv' INTO TABLE airlines FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 2 LINES; 
```
```
LOAD DATA INFILE 'path_to_file/countries_df.csv' INTO TABLE countries FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES; 
```
```
LOAD DATA INFILE 'path_to_file/airports.dat.txt' INTO TABLE airports FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'; 
```
