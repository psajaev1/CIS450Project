import numpy as np
import pandas as pd
import matplotlib

# Preprocessing of data for each of the 5 datasets

covid_df = pd.read_csv("C:/Users/Phillip Sajaev/Downloads/covid_19_clean_complete/covid_19_clean_complete.csv")
covid_df = covid_df.drop(['Province/State', 'Lat', 'Long','WHO Region'], axis = 1)
covid_df = covid_df.dropna(how='any',axis=0) 

# put your path here
covid_df.to_csv('C:/Users/Phillip Sajaev/Downloads/450projectcsv/covid_df.csv', index = False, header=True)


routes_df = pd.read_csv("C:/Users/Phillip Sajaev/Downloads/archive/routes.csv")
routes_df.columns = routes_df.columns.str.replace(' ', '')
routes_df = routes_df.drop(['airline', 'sourceairport', 'destinationapirport', 'codeshare', 'stops', 'equipment'], axis = 1)
routes_df = routes_df.dropna(how='any',axis=0) 

# put your path here
routes_df.to_csv('C:/Users/Phillip Sajaev/Downloads/450projectcsv/routes_df.csv', index = False, header=True)


countries_df = pd.read_csv("C:/Users/Phillip Sajaev/Downloads/archive/countries-of-the-world.csv")
countries_df.columns = countries_df.columns.str.replace(' ', '')
countries_df = countries_df.drop(['Area(sq.mi.)', 'Coastline(coast/arearatio)', 'Climate', 'Birthrate', 'Deathrate', 'Agriculture', 'Industry', 'Service', 'Netmigration', 'Infantmortality(per1000births)', 'Phones(per1000)' ,'Arable(%)', 'Crops(%)', 'Other(%)'], axis = 1)
countries_df = countries_df.dropna(how='any',axis=0) 

# put your path here
countries_df.to_csv('C:/Users/Phillip Sajaev/Downloads/450projectcsv/countries_df.csv', index = False, header=True)


airlines_df = pd.read_csv("C:/Users/Phillip Sajaev/Downloads/archive/airlines.csv")
airlines_df.columns = airlines_df.columns.str.replace(' ', '')
airlines_df = airlines_df.drop(['Alias', 'IATA', 'ICAO', 'Callsign'], axis = 1)
airlines_df = airlines_df.dropna(how='any',axis=0) 

# put your path here
airlines_df.to_csv('C:/Users/Phillip Sajaev/Downloads/450projectcsv/airlines_df.csv', index = False, header=True)





