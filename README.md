# CIS450Project

Bram Bruno, Paul Wei Zou, Phillip Sajaev, Paula Scanlan
				
COVID PAGE: Get flights to Country with less than X amount of Covid cases \
FLIGHTS PAGE: Get flights that are available from source country to destination country, list all flights \
AIRPORTS PAGE: Get all airports from a country that is clicked on \
AIRLINES PAGE: Get airlines that fly from countries with GDP in range [X,Y] \
PENN_STUDENTS PAGE: Get flights from Philadelphia to a country with specific parameters\


Motivation for the idea/description of the problem the application solves: 
We wanted to create this application to help people decide where to go when planning a vacation. Picking a place to travel is hard, so we will have the user tell us their nearest city so we can make recommendations based on that. We can also pull up flight info for them, so they can see all possible destinations and routes. This application is intended to help indecisive people make decisions and potentially learn more about new places they would have never thought about traveling to. 
 							
List of features you will definitely implement in the application:
Entering your closest city and having it output a list of countries that are possible destinations 
Then once you select your country, it will output cities you can fly into
Tell you how covid safe the country is (how many current cases)
			
List of features you might implement in the application, given enough time:
List suggested countries and you can click on them to get information about them (using World Factbook)
Suggested places to visit in the country 
Hotel recommendations/ reviews 

List of pages the application will have and a 1-2 sentence description of each page. We expect that the functionality of each page will be meaningfully different than the functionality of the other pages.

Page 1: Inputting the closest city to you 
The user will be prompted to input the closest city to them. From there, we will output a list of potential airports that are close to their location. Users can then select the airport they want to fly out of.

Page 2: Outputs all the possible countries you can visit based on your starting city.
Based on the selected departing airport, we will output a list of countries that are possible destinations. Each country will also have a ranking based on how similar it is to the user’s home country. 

Page 3: Outputs all the cities you can visit after you select your country of choice. 
This will give you information about all the possible flights and from there you can select which city in your country of choice you want to fly into. 

Page 4: This page will tell you information about your selected city including how many active covid cases they have (using kaggle data set).(COVID PAGE)
Once the user picks their city, we will output covid data for that city. That way the users can make an informed decision whether or not to travel.	


# BUILD INSTRUCTIONS
Create tables with the following commands and then load data with the commands that proceed.

CREATE TABLE countries(
Country varchar(60),
Region varchar(100),
Population INT,
Pop_density INT,
GPD_per_capita INT,
Literacry_rate INT,
PRIMARY KEY(Country)
);


CREATE TABLE airports(
id int(11),
name varchar(20),
city varchar(20),
country varchar(20),
iata char(3),
icao char(4),
lat decimal(8,6),
lon decimal(9,6),
alt int(11),
timezone decimal(3,1),
dst char(1),
tz varchar(20),
PRIMARY KEY (id),
FOREIGN KEY (country) REFERENCES Countries(Country)
);

CREATE TABLE covid(
Country varchar(60),
Date varchar(10),
Confirmed INT,
Deaths INT,
Recovered INT,
Active INT
FORIEGN KEY(Country) REFERENCES Countries(Country)
);


CREATE TABLE airlines(
AirlineID INT,
Name varchar(60),
Country varchar(60),
Active varchar(2),
PRIMARY KEY(AirlineID),
FORIEGN KEY(Country) REFERENCES Countries(Country)
);

CREATE TABLE routes(
airlineID INT,
sourceairportid INT,
destinationairportid INT,
FOREIGN KEY (airline_id) REFERENCES Airlines(id),
FOREIGN KEY (sourceairportid) REFERENCES Airports(id),
FOREIGN KEY (destinationairportid) REFERENCES Airports(id)
);

Load data into tables with the following commands

LOAD DATA INFILE 'path_to_file/covid_df.csv' INTO TABLE covid FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES; 

LOAD DATA INFILE 'path_to_file/routes_df.csv' INTO TABLE routes FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES; 

LOAD DATA INFILE 'path_to_file/arilines_df.csv' INTO TABLE airlines FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 2 LINES; 

LOAD DATA INFILE 'path_to_file/countries_df.csv' INTO TABLE countries FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES; 

LOAD DATA INFILE 'path_to_file/airports.dat.txt' INTO TABLE airports FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'; 
