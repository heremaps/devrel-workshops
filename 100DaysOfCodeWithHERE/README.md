![100DaysOfCode](img/100daysofcode.jpg) 



<p> An amazing way to learn a new skill is to learn a little bit of it , every day. We at HERE Technologies want you to get acquainted with <strong>Location Technology</strong> through <strong>Map APIs </strong> provided by us by launching <strong>Days Of Code with HERE</strong></p>
<!--more-->
<p>
    Starting from the 1<sup>st</sup> of April 2020, we have been posting 1 task <strong>every day</strong> on our twitter handle <a href="https://twitter.com/heredev/">@heredev</a> and will be doing this for <strong>100 days</strong>. In solving the tasks, you will be using the HERE JavaScript APIs found at <a href="www.developer.here.com/documentation">developer.here.com</a>. The <strong>Documentation</strong> section will help you find the solutions. 
    Feel free to tweet your solutions back at us with the tags <strong>#100DaysOfCode</strong> and <strong>#100DaysOfCodeWithHERE</strong>.<br>
    We will also provide you the solutions in various forms:
</p>
<ul>
    <li> Preview video on twitter with solution to the <strong>previous day task</strong></li>
    <li> Blogpost with solutions for <strong> 5 days of tasks</strong> on our <a href="https://developer.here.com/blog/topic/100daysofcode">developer blogs</a> </li>
    <li> Video tutorial with solutions for <strong> 5 days of tasks</strong> on <a href="https://www.youtube.com/user/heremaps/playlists"> YouTube</a></li>
</ul>
<p>If you have any questions during the 100 Days, feel free to dm us , post your questions on our <a href="www.developer.here.com/blog">developer blogs</a> and <a href="https://www.youtube.com/watch?v=dvSHOLI4QQc&list=PLTlZUhyLwZTcV_b8Z8Va8JYsH2CQnOwFS"> YouTube</a> videos or post the question on our <a href="https://t.her.is/slack">slack channel</a><br>
You will also find the day wise code in this repo.<br>
Happy coding with <strong>100DaysOfCode</strong>!</p>

# Tasks
### Day 0/100 : Get your credentials by signing up for a freemium account at [developer.here.com](https://developer.here.com/)

### [Day 1/100:  Page Frame](/Day%201)
  - Create the frame for an HTML + JS web page
  - Add HERE map core and map services source within the <head></head> tags 

### [Day 2/100 : Create div for holding map](/Day%202)
- Create div for holding map - width = 100% of screen , height = 80% of screen, background colour of your choice.
- initialize platform with the JavaScript apiKey

### [Day 3/100 : Load Map](/Day%203) 
- define the center of the map with latitude and longitude
- initialize VECTOR map with default layer, center of map and zoom level 

### [Day 4/100 : Map UI - Control Panel](/Day%204)
- Add zoom in and out buttons to the map.
- Also add ui element to change map type (satellite, traffic) after loading.

### [Day 5/100 : Map UI- map event](/Day%205)
- Add panning capability to the map

### [Day 6/100 : Map Tilt](/Day%206) 
- Set the map to tilt at a 60º angle
- Align the map such that the top of the map is the West half of the globe

### [Day 7/100 : Position](/Day%207)
- Get position from your browser  * Hint check out our blogs

### [Day 8/100 : Marker](/Day%208) 
- Add basic marker at current position

### [Day 9/100 :  Marker SVG](/Day%209)
- Change the marker from the default marker to an svg marker
- The maker can be a white circle inside a green circle like the one on our web app Here We Go 

### [Day 10/100 : Click for position](/Day%2010)
- add event to log the position when you click anywhere on the map

### [Day 11/100 : Marker data](/Day%2011)
- Place an image as a marker where you clicked on the map. 
- Add the text " I'm Here " to the marker as marker data 

### [Day 12/1000 :  Info-bubble](/Day%2012) 
- Display an info-bubble on tapping the marker
- show the marker data as the info in the bubble.

### [Day 13 dragging the marker](/Day%2013)
- add capabilities to drag a marker and position it in another place on the screen
- Hint: You will have to write event listeners for when you start the drag, during the drag and end of drag

### [Day 14 Drawing a circle](/Day%2014)
- Draw a circle of radius 10 km
- Let the center be the new position after the marker was dragged

### [Day 15 Customizing the circle](/Day%2015)
- Fill in the circle with a color of your choice
- Give it a darker border of width 4px

### [Day 16 Playing with fonts](/Day%2016)
- Change the map font on Load
- Hint ;) Take a look at map styles

### [Day 17 Styling after load](/Day%2017)
- Create a button called highlight hospitals
- Change the colour of all hospitals in the world to a bright red on clicking the button
- Hint- use map style on load

### [Day 18 Languages](/Day%2018)
- Change the default display language of the map to anything other than English 

### [Day 19 Control panel](/Day%2019)
- Change the position of the map control panel to the top right of the map

### [Day 20 Geocoder free form search](/Day%2020)
- Change the unit of the map to see distance in miles

### [Day 21 What's meters, I understand only miles](/Day%2021)
- Use the geocoder and Search service to conduct a free form search for 'hauptstraße' 
- Choose any street with a common name instead, and let us know how many results you get!

### [Day 22 Limit results](/Day%2022)
- Limit the results from the task on Day 21 to 5 results

### [Day 23 Geocoder limit by country](/Day%2023)
- Limit the results from the task on Day 22 to the country ' Germany' 
- If you are using a street near you, limit the search to your country 

### [Day 24 Geocoder with a qualified query](/Day%2024)
- Instead of the free form search, use a structured search where street = hauptstraße , city = Berlin, Country = Germany
- Customize this according to the street you want in the result.

### [Day 25 Geocoder access to the building](/Day%2025)
- Search for 'Invalidenstraße 116, Berlin'
- Place a marker on the access point of the building.

### [Day 26 Geocoder discover](/Day%2026)
- Use the discover endpoint of the Geocoder and search for ‘markets’
- specify a point where you want to discover the markets 

### [Day 27 Discover places in a radius](/Day%2027)
- Using the discover endpoint, search for markets in a 1km radius

### [Day 28 Discover distance](/Day%2028)
- Note down the 'distance' parameter of each of the results from the result of Day 27
- Display the result in an info-bubble for every result.

### [Day 29 Autosuggest](/Day%2029)
- I am so tired that I need Starbucks and cannot even type it completely
- Use the autosuggest endpoint to search for an incomplete query 'star' near you. 

### [Day 30 Autosuggest bounding box](/Day%2030)
- Repeat the query from day 29
- This time, restrict your search within a box of 4 blocks
- Hint : check the parameter bounding box

### [Day 31 Browse with name](/Day%2031)
- Use the 'Browse' endpoint of the Geocoding and Search API to look for a 'Museum'
- Do a simple search with just the 'name'

### [Day 32 Browse + categories](/Day%2032)
- Add to the search query from Day 31 to add a level 3 category search.
-  Look for 'History Museums' around you while writing 'Museum' in the name field

### [Day 33 Browse + Food Categories+ Takeout 🌮](/Day%2033)
- Modify the search request from day 32 to use the level 2 food categories for Mexican food
- Make sure that you only search for restaurants which serve ' takeout' .

### [Day 34 Lookup](/Day%2034)
- Note the 'id' from one of the places in the results from day 33
- Use this id to 'lookup' the specific place

### [Day 35 Reverse geocoder](/Day%2035)
- You know where a friend lives but can't find their postal address to send them a gift ?
- Use the reverse geocoder to get the postal address from the position on the map {lat: ,lng: }

### [Day 36 Geofencing Creating a WKT file](/Day%2036)
- Draw a polygon around a place that is interesting to you and save it in a WKT file.

### [Day 37 Geofencing Uploading a WKT file](/Day%2037)
- Upload the polygon you created in day 36 as a layer so you can use as a geofence later

### [Day 38 Geofencing retrieve layer](/Day%2038)
- Retrieve the ID of the polygon that you uploaded as a layer on day 37

### [Day 39 Geofencing To be or not to be](/Day%2039)
- Given a point with latitude and longitude and your layer from day 37, use one of our APIs to check whether the point is inside your layer or not.
- Hint: Check out the link: https://t.her.is/35zshEV
  
### [Day 40 Geofence Almost there](/Day%2040)
- Update your function from day 39 so that it’ll determine whether the point is within 100 meter proximity of your layer or not.

### [Day 41 Routing A to B](/Day%2041)
- Determine two random locations on the map that are navigable by car.
- Get the shortest route for car to drive between those locations in the form of a polyline.
  
### [Day 42 Routing : Draw the route](/Day%2042)
- Use the flexible polyline received as the result from Day 41
- Draw the first route on the map and color it #034F84
  
### [Day 43 Routing : Alternatives](/Day%2043)
- Request for 3 alternative routes for the route received on Day 42
  
### [Day 44 Routing : Timing is important](/Day%2044)
- Set the departure time to 9 AM for the route 
- Set the departure time to 3 PM for the same route 
- Compare the difference between all received routes
  
### [Day 45 Routing : Summary](/Day%2045)
- Get the summary of the time required and distance covered for any of the routes you calculated in the previous days.

### [Day 46 Routing : Waypoints](/Day%2046)
- Add a waypoint which falls between the route from day 41 
- Draw a route including this waypoint
  
### [Day 47 Routing : Driving Instructions](/Day%2047)
- Print out driving instructions and actions for the first route received on Day 46
  
### [Day 48 Routing : Speed Limit](/Day%2048)
- Find out the speed limit on the route for Day 46
  
### [Day 49 Routing : Stop Duration](/Day%2049)
- Add a stopover of 900 seconds to the waypoint from day 46
- Log the waiting time with instructions
  
### [Day 50 Routing : Pedestrian](/Day%2050)
- Get a walking route between two points
- Draw the route with a dashed line 

### [Day 51 Routing :  Avoid routing feature- Parks](/Day%2051)
- For the pedestrian route from day 50,  avoid parks
- Use Routing v7 to do this
  
### [Day 52 Routing : Bicycle](/Day%2052)
- Get a bicycle route between two points
- Use Routing v7 to do this
  
### [Day 53 Routing : Avoid routing feature- Dirt Roads](/Day%2053)
- For the bicycle route from day 52,  avoid dirt roads
- Use Routing v7 to do this 
   
### [Day 54 Routing : Public Transport](/Day%2054)
- Get a public transport route between two points
- Use Routing v7 to do this
  
### [Day 55 Routing : Avoid Buses](/Day%2055)
- For the public transport route for day 54, get a route without buses
- Use Routing v7 to do this

### [Day 56 Routing :  Avoid Traffic jams](/Day%2056)
- With a car route from a point A to B, avoid traffic jams
  
### [Day 57 Routing : Avoid Areas](/Day%2057)
- Identify an area on the route from day 56 which you don't like driving through.
- Create and display a box around that area
  
### [Day 58 Routing : Avoid Areas](/Day%2058)
- Obtain a new route between the same places as on day 56,  while avoiding the area specified on day 57 
  
### [Day 59 Routing : Links](/Day%2059)
- Obtain a breakdown of your route from day 56 in the form of road links
  
### [Day 60 Routing : Avoid links](/Day%2060)
- From the results on day 58, select the link id of a patch of road you wish to avoid.
- Obtain a new route between the same places while avoid this patch of road.

### [Day 61 Routing : Reach Radius](/Day%2061)
- Draw a circle of 10km from any single point 
- Get a route from the center to any point on the circle
- Check if the route is actually 10km long
  
### [Day 62 Routing : Isoline Distance](/Day%2062)
- Get an isoline route from the center from day 61
- Make the radius of this isoline 10 km.
  
### [Day 63 Routing : Isoline Time ](/Day%2063)
- Get an isoline route from the center from day 61
- This time find places you can reach within 15 minutes of walking.
  
### [Day 64 Routing : Matrix](/Day%2064)
- Select 3 different addresses as the starting address
- Select 2 different addresses as the destination address
- Get a route from all starting address to all destinations
  
### [Day 65 Routing : Id](/Day%2065)
- Get routing Ids for the different routes received on day 64
- Draw the routes using the routing Id endpoint.

### [Day 66 Truck Routing](/Day%2066)
- Get a route for a truck
- Make sure it follows strict road restrictions
  
### [Day 67 Truck Routing : Radioactive](/Day%2067)
- Get a route for a truck
- Mention that it contains radioactive material
- Does it still get a route through the city?
  
### [Day 68 Truck Profile](/Day%2068)
- Calculate a route for a truck 3 meters high
- Use two different cities as source and destination
  
### [Day 69 Truck Profile ](/Day%2069)
- Calculate a route for a truck with 1 trailer, 4 axles and is 20 meters long
  
### [Day 70 Truck Profile ](/Day%2070)
- Calculate a route for the truck profile in day 69
- The total mass of the truck with the trailer is 40T
- Weight per axle is 10T

### [Day 71 Route Attributes](/Day%2071)
- Get a route for a truck from Berlin, Germany to Warsaw, Poland
- Get the route summary by country
  
### [Day 72 Route Attributes](/Day%2072)
- Using the route request from day 71, also get the zones along the route
  
### [Day 73 Leg Attributes](/Day%2073)
- For the route request from day 72, get maneuvers for every leg of the route
  
### [Day 74 Maneuver Attributes](/Day%2074)
- For the maneuvers from day 73, make sure to also include the direction of the maneuver
  
### [Day 75 Clean-up result](/Day%2075)
- To get a cleaner result for the route from day 71, remove the leg attributes and summary from the result

### [Day 76 Cost of the journey](/Day%2076)
- Using the Fleet Telematics API, calculate the costs of the journey if
- Driver is paid 10/hour 
- Vehicle cost is 0.5/Km
- Specify the local currency
  
### [Day 77 Energy Cost](/Day%2077)
- Using the same truck profile as day 76, calculate the fuel cost for the trip
- Maximum speed of the truck is 90 km/hr
- Weight Dependent consumption profile of a 40T truck
  
### [Day 78  Cost of Fuel](/Day%2078)
- For the energy cost calculated on day 77, specify the fuel type
- Specify your local fuel price per unit
  
### [Day 79 Toll Cost](/Day%2079)
- Get the total toll cost for the above truck
- Specify that it has 1 trailer 
  
### [Day 80 Toll Cost per System](/Day%2080)
- For the above toll cost, find out what was the toll cost per toll system 
- Where is your toll money going ?🤔 🤑 

### [Day 81 EV Routing with charging](/Day%2081)
- Get a route between two cities for your EV using the fleet telematics API
- Ask for stopovers to charge your vehicle by mentioning Battery Parameters
  
### [Day 82 Traveling Salesperson problem](/Day%2082)
- Select a starting point for your route
- Select 3 destination points
- Use the Waypoint Sequence API, to get the optimal sequence for these points
  
### [Day 83 Custom Routes](/Day%2083)
- Regular vehicles aren't allowed on a private route
- Upload an overlay to allow access to your vehicle on this internal route
  
### [Day 84 Custom Routes](/Day%2084)
- Use the overlay from day 83
- Make a #lastmile delivery on an internal route.
  
### [Day 85 Advanced Datasets](/Day%2085)
- Use the Advanced Dataset called EVCHARGING_POI
- display all the EV Charging stations along the route from day 81

### [Day 86 Map images:  Map of New York](/Day%2086) 
- Using the Map Image API, create a map image centered on Manhattan
- Get the image in in PNG format and of size 1280 by 720 pixels
  
### [Day 87 Map images - Satellite image of Easter Island](/Day%2087)
- Create a map image of Easter Island in satellite view
- Zoom in as close as you can but make sure the entire island remains visible
  
### [Day 88 Map images - Map of Disneyland with a marker](/Day%2088) 
- Create of map image of Disneyland put a marker on the castle
- Marker color should be green and the theme should be "pin"
  
### [Day 89 Map images - Map the Bermuda Triangle](/Day%2089)
- Create a map image of the Bermuda Triangle
- Draw a triangle on the map covering the Bermuda Triangle
- Use a white outline and a transparent blue fill color
  
### [Day 90 Map images - Map a Route across Crete](/Day%2090)
- Create a map image of Crete
- The map labels should be in Greek
- Use the routing feature of the Map Image API to calculate and display a route between Kissamos and Sitia

### [Day 91 Transit API 🚍🦁🐟](/Day%2091)
- Use the HERE Transit API to find a route between the Singapore Zoo
and the famous Singapore Merlion
- Draw the route on a map 
  
### [Day 92 Transit API - Arrival and Alternatives 🕘 ↖️ ↗️](/Day%2092)
- Find a transit route between Berlin Alexanderplatz and Checkpoint Charlie
- Make sure you arrive at your destination at 9am tomorrow
- Get an alternative route
  
### [Day 93 Transit API - Fares and avoiding things ⛔🚇 💶](/Day%2093)
- Find a transit route between the Eiffel Tower and the Places des Vosges
- Don’t use the Paris Métro!
- Don’t allow more than two changes
- Sow fares/ticket prices
  
### [Day 94 Transit API - Stations 🚉 🚏](/Day%2094)
- List all public transit stations near the Tower of London

### [Day 95 Transit API - Next departures 📅 🚋](/Day%2095)
- For Cavil Avenue Station in Gold Coast, Australia find the list of tram departures for the next 30 minutes

### [Day 96 HERE Data Hub - Installing the CLI 💾](/Day%2096)
- This will require NPM
- Start here: t.her.is/3ewK9UB
- Be sure to login after you install the CLI!
  
### [Day 97 HERE Data Hub - Uploading Geospatial Information to Data Hub ⬆️](/Day%2097)
- Use the National Parks System GeoJSON data (t.her.is/2Nwh6oc)
- Use the #CLI to create a new space
- Use the CLI to upload the #GeoJSON
- Confirm the data was added.
  
### [Day 98 HERE Data Hub - Retrieve features ↪️](/Day%2098)
- Use Node (or language of your choice) to access features via REST API
- Display features in the console
- API Reference: t.her.is/31bN3uh
  
### [Day 99 HERE Data Hub - Retrieve features based on location📍](/Day%2099)
- Use Node (or language of your choice) to access features via REST API
- This time return features that are near a location (you pick!)
- API Reference: t.her.is/31bN3uh
  
### [Day 100 HERE Data Hub - Add features to a map 🗺️](/Day%20100)
- Create a basic map in #JavaScript using our library
- Add the features from your Data Hub space


 
