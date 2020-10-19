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

### [Day 1/100:  Page Frame](Day_1)
  - Create the frame for an HTML + JS web page
  - Add HERE map core and map services source within the <head></head> tags 

### [Day 2/100 : Create div for holding map](Day_2)
- Create div for holding map - width = 100% of screen , height = 80% of screen, background colour of your choice.
- initialize platform with the JavaScript apiKey

### [Day 3/100 : Load Map](Day_3) 
- define the center of the map with latitude and longitude
- initialize VECTOR map with default layer, center of map and zoom level 

### [Day 4/100 : Map UI - Control Panel](Day_4)
- Add zoom in and out buttons to the map.
- Also add ui element to change map type (satellite, traffic) after loading.

### [Day 5/100 : Map UI- map event](Day_5)
- Add panning capability to the map

### [Day 6/100 : Map Tilt](Day_6) 
- Set the map to tilt at a 60º angle
- Align the map such that the top of the map is the West half of the globe

### [Day 7/100 : Position](Day_7)
- Get position from your browser  * Hint check out our blogs

### [Day 8/100 : Marker](Day_8) 
- Add basic marker at current position

### [Day 9/100 :  Marker SVG](Day_9)
- Change the marker from the default marker to an svg marker
- The maker can be a white circle inside a green circle like the one on our web app Here We Go 

### [Day 10/100 : Click for position](Day_10)
- add event to log the position when you click anywhere on the map

### [Day 11/100 : Marker data](Day_11)
- Place an image as a marker where you clicked on the map. 
- Add the text " I'm Here " to the marker as marker data 

### [Day 12/100 :  Info-bubble](Day_12) 
- Display an info-bubble on tapping the marker
- show the marker data as the info in the bubble.

### [Day 13/100 dragging the marker](Day_13)
- add capabilities to drag a marker and position it in another place on the screen
- Hint: You will have to write event listeners for when you start the drag, during the drag and end of drag

### [Day 14/100 Drawing a circle](Day_14)
- Draw a circle of radius 10 km
- Let the center be the new position after the marker was dragged

### [Day 15/100 Customizing the circle](Day_15)
- Fill in the circle with a color of your choice
- Give it a darker border of width 4px

### [Day 16/100 Playing with fonts](Day_16)
- Change the map font on Load
- Hint ;) Take a look at map styles

### [Day 17/100 Styling after load](Day_17)
- Create a button called highlight hospitals
- Change the colour of all hospitals in the world to a bright red on clicking the button
- Hint- use map style on load

### [Day 18/100 Languages](Day_18)
- Change the default display language of the map to anything other than English 

### [Day 19/100 Control panel](Day_19)
- Change the position of the map control panel to the top right of the map

### [Day 20/100 Geocoder free form search](Day_20)
- Change the unit of the map to see distance in miles

### [Day 21/100 What's meters, I understand only miles](Day_21)
- Use the geocoder and Search service to conduct a free form search for 'hauptstraße' 
- Choose any street with a common name instead, and let us know how many results you get!

### [Day 22/100 Limit results](Day_22)
- Limit the results from the task on Day 21 to 5 results

### [Day 23/100 Geocoder limit by country](Day_23)
- Limit the results from the task on Day 22 to the country ' Germany' 
- If you are using a street near you, limit the search to your country 

### [Day 24/100 Geocoder with a qualified query](Day_24)
- Instead of the free form search, use a structured search where street = hauptstraße , city = Berlin, Country = Germany
- Customize this according to the street you want in the result.

### [Day 25/100 Geocoder access to the building](Day_25)
- Search for 'Invalidenstraße 116, Berlin'
- Place a marker on the access point of the building.

### [Day 26/100 Geocoder discover](Day_26)
- Use the discover endpoint of the Geocoder and search for ‘markets’
- specify a point where you want to discover the markets 

### [Day 27/100 Discover places in a radius](Day_27)
- Using the discover endpoint, search for markets in a 1km radius

### [Day 28/100 Discover distance](Day_28)
- Note down the 'distance' parameter of each of the results from the result of Day 27
- Display the result in an info-bubble for every result.

### [Day 29/100 Autosuggest](Day_29)
- I am so tired that I need Starbucks and cannot even type it completely
- Use the autosuggest endpoint to search for an incomplete query 'star' near you. 

### [Day 30/100 Autosuggest bounding box](Day_30)
- Repeat the query from day 29
- This time, restrict your search within a box of 4 blocks
- Hint : check the parameter bounding box

### [Day 31/100 Browse with name](Day_31)
- Use the 'Browse' endpoint of the Geocoding and Search API to look for a 'Museum'
- Do a simple search with just the 'name'

### [Day 32/100 Browse + categories](Day_32)
- Add to the search query from Day 31 to add a level 3 category search.
-  Look for 'History Museums' around you while writing 'Museum' in the name field

### [Day 33/100 Browse + Food Categories+ Takeout 🌮](Day_33)
- Modify the search request from day 32 to use the level 2 food categories for Mexican food
- Make sure that you only search for restaurants which serve ' takeout' .

### [Day 34/100 Lookup](Day_34)
- Note the 'id' from one of the places in the results from day 33
- Use this id to 'lookup' the specific place

### [Day 35/100 Reverse geocoder](Day_35)
- You know where a friend lives but can't find their postal address to send them a gift ?
- Use the reverse geocoder to get the postal address from the position on the map {lat: ,lng: }

### [Day 36/100 Geofencing Creating a WKT file](Day_36)
- Draw a polygon around a place that is interesting to you and save it in a WKT file.

### [Day 37/100 Geofencing Uploading a WKT file](Day_37)
- Upload the polygon you created in day 36 as a layer so you can use as a geofence later

### [Day 38/100 Geofencing retrieve layer](Day_38)
- Retrieve the ID of the polygon that you uploaded as a layer on day 37

### [Day 39/100 Geofencing To be or not to be](Day_39)
- Given a point with latitude and longitude and your layer from day 37, use one of our APIs to check whether the point is inside your layer or not.
- Hint: Check out the link: https://t.her.is/35zshEV
  
### [Day 40/100 Geofence Almost there](Day_40)
- Update your function from day 39 so that it’ll determine whether the point is within 100 meter proximity of your layer or not.

### [Day 41/100 Routing A to B](Day_41)
- Determine two random locations on the map that are navigable by car.
- Get the shortest route for car to drive between those locations in the form of a polyline.
  
### [Day 42/100 Routing : Draw the route](Day_42)
- Use the flexible polyline received as the result from Day 41
- Draw the first route on the map and color it #034F84
  
### [Day 43/100 Routing : Alternatives](Day_43)
- Request for 3 alternative routes for the route received on Day 42
  
### [Day 44/100 Routing : Timing is important](Day_44)
- Set the departure time to 9 AM for the route 
- Set the departure time to 3 PM for the same route 
- Compare the difference between all received routes
  
### [Day 45/100 Routing : Summary](Day_45)
- Get the summary of the time required and distance covered for any of the routes you calculated in the previous days.

### [Day 46/100 Routing : Waypoints](Day_46)
- Add a waypoint which falls between the route from day 41 
- Draw a route including this waypoint
  
### [Day 47/100 Routing : Driving Instructions](Day_47)
- Print out driving instructions and actions for the first route received on Day 46
  
### [Day 48/100 Routing : Speed Limit](Day_48)
- Find out the speed limit on the route for Day 46
  
### [Day 49/100 Routing : Stop Duration](Day_49)
- Add a stopover of 900 seconds to the waypoint from day 46
- Log the waiting time with instructions
  
### [Day 50/100 Routing : Pedestrian](Day_50)
- Get a walking route between two points
- Draw the route with a dashed line 

### [Day 51/100 Routing :  Avoid routing feature- Parks](Day_51)
- For the pedestrian route from day 50,  avoid parks
- Use Routing v7 to do this
  
### [Day 52/100 Routing : Bicycle](Day_52)
- Get a bicycle route between two points
- Use Routing v7 to do this
  
### [Day 53/100 Routing : Avoid routing feature- Dirt Roads](Day_53)
- For the bicycle route from day 52,  avoid dirt roads
- Use Routing v7 to do this 
   
### [Day 54/100 Routing : Public Transport](Day_54)
- Get a public transport route between two points
- Use Routing v7 to do this
  
### [Day 55/100 Routing : Avoid Buses](Day_55)
- For the public transport route for day 54, get a route without buses
- Use Routing v7 to do this

### [Day 56/100 Routing :  Avoid Traffic jams](Day_56)
- With a car route from a point A to B, avoid traffic jams
  
### [Day 57/100 Routing : Avoid Areas](Day_57)
- Identify an area on the route from day 56 which you don't like driving through.
- Create and display a box around that area
  
### [Day 58/100 Routing : Avoid Areas](Day_58)
- Obtain a new route between the same places as on day 56,  while avoiding the area specified on day 57 
  
### [Day 59/100 Routing : Links](Day_59)
- Obtain a breakdown of your route from day 56 in the form of road links
  
### [Day 60/100 Routing : Avoid links](Day_60)
- From the results on day 58, select the link id of a patch of road you wish to avoid.
- Obtain a new route between the same places while avoid this patch of road.

### [Day 61/100 Routing : Reach Radius](Day_61)
- Draw a circle of 10km from any single point 
- Get a route from the center to any point on the circle
- Check if the route is actually 10km long
  
### [Day 62/100 Routing : Isoline Distance](Day_62)
- Get an isoline route from the center from day 61
- Make the radius of this isoline 10 km.
  
### [Day 63/100 Routing : Isoline Time ](Day_63)
- Get an isoline route from the center from day 61
- This time find places you can reach within 15 minutes of walking.
  
### [Day 64/100 Routing : Matrix](Day_64)
- Select 3 different addresses as the starting address
- Select 2 different addresses as the destination address
- Get a route from all starting address to all destinations
  
### [Day 65/100 Routing : Id](Day_65)
- Get routing Ids for the different routes received on day 64
- Draw the routes using the routing Id endpoint.

### [Day 66/100 Truck Routing](Day_66)
- Get a route for a truck
- Make sure it follows strict road restrictions
  
### [Day 67/100 Truck Routing : Radioactive](Day_67)
- Get a route for a truck
- Mention that it contains radioactive material
- Does it still get a route through the city?
  
### [Day 68/100 Truck Profile](Day_68)
- Calculate a route for a truck 3 meters high
- Use two different cities as source and destination
  
### [Day 69/100 Truck Profile ](Day_69)
- Calculate a route for a truck with 1 trailer, 4 axles and is 20 meters long
  
### [Day 70/100 Truck Profile ](Day_70)
- Calculate a route for the truck profile in day 69
- The total mass of the truck with the trailer is 40T
- Weight per axle is 10T

### [Day 71/100 Route Attributes](Day_71)
- Get a route for a truck from Berlin, Germany to Warsaw, Poland
- Get the route summary by country
  
### [Day 72/100 Route Attributes](Day_72)
- Using the route request from day 71, also get the zones along the route
  
### [Day 73/100 Leg Attributes](Day_73)
- For the route request from day 72, get maneuvers for every leg of the route
  
### [Day 74/100 Maneuver Attributes](Day_74)
- For the maneuvers from day 73, make sure to also include the direction of the maneuver
  
### [Day 75/100 Clean-up result](Day_75)
- To get a cleaner result for the route from day 71, remove the leg attributes and summary from the result

### [Day 76/100 Cost of the journey](Day_76)
- Using the Fleet Telematics API, calculate the costs of the journey if
- Driver is paid 10/hour 
- Vehicle cost is 0.5/Km
- Specify the local currency
  
### [Day 77/100 Energy Cost](Day_77)
- Using the same truck profile as day 76, calculate the fuel cost for the trip
- Maximum speed of the truck is 90 km/hr
- Weight Dependent consumption profile of a 40T truck
  
### [Day 78/100 Cost of Fuel](Day_78)
- For the energy cost calculated on day 77, specify the fuel type
- Specify your local fuel price per unit
  
### [Day 79/100 Toll Cost](Day_79)
- Get the total toll cost for the above truck
- Specify that it has 1 trailer 
  
### [Day 80/100 Toll Cost per System](Day_80)
- For the above toll cost, find out what was the toll cost per toll system 
- Where is your toll money going ?🤔 🤑 

### [Day 81/100 EV Routing with charging](Day_81)
- Get a route between two cities for your EV using the fleet telematics API
- Ask for stopovers to charge your vehicle by mentioning Battery Parameters
  
### [Day 82/100 Traveling Salesperson problem](Day_82)
- Select a starting point for your route
- Select 3 destination points
- Use the Waypoint Sequence API, to get the optimal sequence for these points
  
### [Day 83/100 Custom Routes](Day_83)
- Regular vehicles aren't allowed on a private route
- Upload an overlay to allow access to your vehicle on this internal route
  
### [Day 84/100 Custom Routes](Day_84)
- Use the overlay from day 83
- Make a #lastmile delivery on an internal route.
  
### [Day 85/100 Advanced Datasets](Day_85)
- Use the Advanced Dataset called EVCHARGING_POI
- display all the EV Charging stations along the route from day 81

### [Day 86/100 Map images:  Map of New York](Day_86) 
- Using the Map Image API, create a map image centered on Manhattan
- Get the image in in PNG format and of size 1280 by 720 pixels
  
### [Day 87/100 Map images - Satellite image of Easter Island](Day_87)
- Create a map image of Easter Island in satellite view
- Zoom in as close as you can but make sure the entire island remains visible
  
### [Day 88/100 Map images - Map of Disneyland with a marker](Day_88) 
- Create of map image of Disneyland put a marker on the castle
- Marker color should be green and the theme should be "pin"
  
### [Day 89/100 Map images - Map the Bermuda Triangle](Day_89)
- Create a map image of the Bermuda Triangle
- Draw a triangle on the map covering the Bermuda Triangle
- Use a white outline and a transparent blue fill color
  
### [Day 90/100 Map images - Map a Route across Crete](Day_90)
- Create a map image of Crete
- The map labels should be in Greek
- Use the routing feature of the Map Image API to calculate and display a route between Kissamos and Sitia

### [Day 91/100 Transit API 🚍🦁🐟](Day_91)
- Use the HERE Transit API to find a route between the Singapore Zoo
and the famous Singapore Merlion
- Draw the route on a map 
  
### [Day 92/100 Transit API - Arrival and Alternatives 🕘 ↖️ ↗️](Day_92)
- Find a transit route between Berlin Alexanderplatz and Checkpoint Charlie
- Make sure you arrive at your destination at 9am tomorrow
- Get an alternative route
  
### [Day 93/100 Transit API - Fares and avoiding things ⛔🚇 💶](Day_93)
- Find a transit route between the Eiffel Tower and the Places des Vosges
- Don’t use the Paris Métro!
- Don’t allow more than two changes
- Sow fares/ticket prices
  
### [Day 94/100 Transit API - Stations 🚉 🚏](Day_94)
- List all public transit stations near the Tower of London

### [Day 95/100 Transit API - Next departures 📅 🚋](Day_95)
- For Cavil Avenue Station in Gold Coast, Australia find the list of tram departures for the next 30 minutes

### [Day 96/100 HERE Data Hub - Installing the CLI 💾](Day_96)
- This will require NPM
- Start here: t.her.is/3ewK9UB
- Be sure to login after you install the CLI!
  
### [Day 97/100 HERE Data Hub - Uploading Geospatial Information to Data Hub ⬆️](Day_97)
- Use the National Parks System GeoJSON data (t.her.is/2Nwh6oc)
- Use the #CLI to create a new space
- Use the CLI to upload the #GeoJSON
- Confirm the data was added.
  
### [Day 98/100 HERE Data Hub - Retrieve features ↪️](Day_98)
- Use Node (or language of your choice) to access features via REST API
- Display features in the console
- API Reference: t.her.is/31bN3uh
  
### [Day 99/100 HERE Data Hub - Retrieve features based on location📍](Day_99)
- Use Node (or language of your choice) to access features via REST API
- This time return features that are near a location (you pick!)
- API Reference: t.her.is/31bN3uh
  
### [Day 100/100 HERE Data Hub - Add features to a map 🗺️](Day_100)
- Create a basic map in #JavaScript using our library
- Add the features from your Data Hub space


 
