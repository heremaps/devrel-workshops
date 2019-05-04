# Location-aware chatbots with HERE + Twilio

## Introduction

*Duration is 3 min*

We recently partnered with the Greater Chicago Food Depository (GCFD) to build
a location-aware chatbot that helps those in need find nearby food pantries.
The way the chatbot works is:

The bot works as such:

* A user of the chatbot texts the bot with their current location.
* The chatbot returns the 3 closest food pantries to the provided location. The
  message includes information such as the phone number, address, and operating
  hours of the pantry.

Although the Greater Chicago Food Depository is geared at a very specific use
case of helping food insecure individuals find nearby food pantries, this type
of chatbot concept can be applied in many different situations and industries.
For example, a gas station brand could build a similar service directing
drivers to nearby gas stations in areas with poor data service. In this
situation, a SMS-based chatbot would be appropriate.

## What you’ll need

*Duration is 5 min*

This tutorial assumes some familiarity with JavaScript and Node.js.

In this tutorial, we’ll be using a few different services:

* [HERE Geocoding API](https://developer.here.com/documentation/geocoder/topics/quick-start-geocode.html):
  a service to translate coordinates to addresses and vice-versa.
* [HERE XYZ Hub API](https://www.here.xyz/api/): a cloud-based location storage
  service.
* [Twilio SMS API](https://www.twilio.com/docs/sms): a service to send SMS
  messages programmatically.

Navigate to the [HERE Developer Portal](http://developer.here.com) to create a
new project. If you don’t already have an account, now would be a good time to
make one.

Additionally, navigate to the
[Twilio Developer Console](https://twilio.com/console) and create a new
Programmable SMS project.

__Architecture__
![arch](graphics/3.png)

## Set up the Node.js skeleton {#set-up-node-skeleton}

*Duration is 15 min*

We’ll get started by preparing our Node.js code skeleton and installing the
required dependencies.

Create a new file called `server.js` and paste the following:

```javascript
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const request = require('request');
const turf = require('@turf/turf');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

//HERE credentials
const here = {
   id: 'HERE_APP_ID',
   code: 'HERE_APP_CODE',
   token: 'HERE_XYZ_TOKEN'
}

//Twilio credentials:
const twilio = {
   sid: 'TWILIO_SID',
   token: 'TWILIO_TOKEN'
}

const client = require('twilio')(twilio.sid, twilio.token);
```

Be sure to swap out your HERE app id/code and Twilio sid/token. Leave the HERE
token value as empty for now; we'll be obtaining the HERE token in a later
step.

Additionally, run the command
`npm install express twilio body-parser @turf/turf request` in the directory of
the `server.js` file to ensure the correct dependencies are installed.

We're also going to need to install [ngrok](https://ngrok.com/) to run a tunnel
providing an externally available URL to our server.

You can install ngrok globally with the following command:

```bash
npm install -g ngrok
```

## Send messages with Twilio {#send-messages-with-twilio}

*Duration is 12 min*

Now that our skeleton is complete, we can start writing some logic to send
messages with the Twilio Programmable SMS API.

Once Twilio is configured correctly, the following code will enable our bot to
reply with 'Hello, there!' anytime you text the Twilio phone number.

We'll want to configure our server to reply to messages sent to our Twilio
phone number. In the `server.js` file, add the following code:

```javascript
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message('Hello, there!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
   console.log('Express server listening on port 1337');
});
```

To get the server up and running, you're going to want to run `node server.js`
(alternatively `nodemon server.js` if you have it installed. This eliminates
the need to restart the server) in the command line. In order to make your
server publicly accessible, you'll want to run the command `ngrok http 1337`.
Port 1337 is now exposed to the public internet.

Copy the forwarding URL (highlighted in the below screenshot) provided by the
ngrok console.  

![ngrok](graphics/0.png)

[Configure a Twilio phone number](https://support.twilio.com/hc/en-us/articles/223136207-Getting-started-with-your-new-Twilio-phone-number).
Take the copied URL and configure it as a webhook for your
[phone number](https://www.twilio.com/console/phone-numbers/incoming). Under
the Messaging header, paste this URL followed by /sms in the *message comes* in
field.

![twilio url](graphics/1.png)

Once you've got that configured, try sending a message to your Twilio phone
number. You should get a friendly reply saying 'Hello, there!'

## Upload data to an XYZ Space {#upload-data-to-xyz-space}

*Duration is 20 min*

We've set up the infrastructure to send messages via Twilio, now let's upload
our data to an XYZ Space for storage.

XYZ Spaces are powerful geospatial databases that can store millions of rows.
For the simplicity of this tutorial, we will only be uploading a small amount
of features into our XYZ Space.

For more information about XYZ Spaces, take a look at the
[documentation](https://www.here.xyz/api/).

There are many ways to upload data to an XYZ Space:

* via REST API
* via [XYZ Studio](https://xyz.here.com/)
* via the [HERE Command Line Interface](https://www.here.xyz/cli/) (CLI)

I prefer the CLI because of its ease of use. To install the CLI, run the
command:

```bash
npm install -g @here/cli
```

Next, configure your credentials by running:

```bash
here configure set
```

When prompted, enter your app id/code from the HERE Developer Portal.

The next step is to create a new XYZ Space with the following command:

```bash
here xyz create -t "food pantries" -d "locations for GCFD food pantries"
```

The `-t` and `-d` options are for the space's title and description.

Upon completion, the  `here xyz create` command will a success message like:

```bash
xyzspace 'zgsrj7y4' created successfully
```

Be sure, to copy the id in quotations--we'll be using this in a future step.

Here is a peak at the data we'll be uploading to the XYZ Space:

```json
{
   "type": "FeatureCollection",
   "features": [{
      "id": "a2c91f4bfa199b3eaa1da6b138",
      "type": "Feature",
      "properties": {
         "Zip": "60160",
         "City": "Melrose Park",
         "Name": "Lighthouse of Hope",
         "State": "IL",
         "Phone number": "(708) 831-5370",
         "Operating hours": "Saturday: 9:30 am - 11:30 am",
         "Distribution address": "1719 W North Ave"
      },
      "geometry": {
         "type": "Point",
         "coordinates": [-87.85532,
            41.9080299
         ]
      }
   }]
}
```

You can download the [whole file here](data/food_pantries.geojson).

To upload the data to the space, use the following command:

```bash
here xyz upload YOUR_SPACE_ID -f food_pantries.geojson
```

Be sure to replace `YOUR_SPACE_ID` with the space id that was outputted when
you created the space with the `here xyz create` command.

Now is also a good time to grab your XYZ token. To see your available tokens,
run the following command:

```bash
here xyz token
```

Go ahead and copy one of these (one with reading and writing permissions), and
paste it into the the `server.js` code, inside the `const here` variable.

Congrats! We've now created a new XYZ Space and uploaded data. To verify you've
successfully created the space, you can run the following command:

```bash
here xyz show YOUR_SPACE_ID -w
```

This command will open up the space in the
[HERE XYZ GeoJSON viewer](http://geojson.tools/).

## Location Services {#location-services}

*Duration is 5 min*

So far, we've configured our SMS infrastructure (Twilio) and our database (XYZ
Space). Now it's time to write some code that will handle our search logic.

We'll want to perform the following tasks:

* Transform our user received input (addresses like *425 W. Randolph Street
  Chicago*) into coordinates using the Geocoder API.
* Search for the closest food pantries in our XYZ Space by performing a
  distance request from the starting coordinates to the coordinates of each
  food pantry. This is by no means a computationally efficient method, but it
  is adequate for such a small dataset.
* Return the top 3 closest food pantries back to the user.

For distance calculations, we will be using the
*[as the crow flies](https://en.wikipedia.org/wiki/As_the_crow_flies)*
distance. This means we will be calculating distance as the closest path
between points A and B on a spherical earth, regardless of road networks. This
is also known as the
[haversine formula](https://en.wikipedia.org/wiki/Haversine_formula).

## Geocoder API {#geocoder-api}

*Duration is 10 min*

The first task we'd like to accomplish is geocoding the user's address input.
Using the HERE Geocoding API, we can do this.
Modify the `app.post('/sms')` to do perform the geocoding:

```javascript
app.post('/sms', (req, res) => {
   const twiml = new MessagingResponse();
   const query = req.body.Body;
   const geocodeURL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${here.id}&app_code=${here.code}&searchtext=${query}`;

   request.get(geocodeURL, (error, response, body) => {
      const geocodeJson = JSON.parse(body);
      const coordinates = {
         lat: geocodeJson.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
         long: geocodeJson.Response.View[0].Result[0].Location.DisplayPosition.Longitude
      };
      console.log(coordinates)
   });

   twiml.message('Hello, there!');
   res.writeHead(200, {
      'Content-Type': 'text/xml'
   });
   res.end(twiml.toString());
});
```

This results in us extracting the query's coordinates and storing them in the
`coordinates` variable.

## Query an XYZ Space {#query-xyz-space}

*Duration is 10 min*

Our next step is to query our XYZ Space for the nearby food banks. We can do so
with a helpful REST API.

For more information about the possible XYZ Space API requests, take a look at
the [Swagger playground](https://xyz.api.here.com/hub/static/swagger/).

Staying inside of the geocode `request.get()` block, we can add the following
code:

```javascript
const xyzSpaceId = 'SPACE_ID';
const xyzURL = `https://xyz.api.here.com/hub/spaces/${xyzSpaceId}/search?access_token=${here.token}`;
request.get(xyzURL, (error, response, body) => {
   const xyzJson = JSON.parse(body);
});
```

What we've done here is query all the food banks inside of the XYZ Space. So
far, we're just confirming we can access the data. In the next step, we'll be
doing some calculations with the data.

## Calculate distance from origin to destination {#calculate-distance-from-origin-to-destination}

*Duration is 20 min*

Since we'll be doing a haversine formula distance calculation, we'll employ the
help of the handy `turf` module. `turf` is an open source geospatial engine for
JavaScript. We'll be using the `distance` function.

Inside of our second `request.get()` block, the xyz one, let's insert the
following code:

```javascript
let features = xyzJson.features;
for (let i = 0; i < features.length; i++) {
   const pantryCoordinates = features[i].geometry.coordinates;
   features[i].properties.distanceFromOrigin = turf.distance(turf.point([coordinates.long,coordinates.lat]), turf.point(pantryCoordinates), {units: 'miles'});
}

features = features.sort((a,b) => a.properties.distanceFromOrigin - b.properties.distanceFromOrigin).slice(0, 3);
```

In the above code block, we:

* loop through all the food pantries (the XYZ space features) and calculate the
  distance from the origin (the coordinates of the user's query) to the
  destination (the coordinates of each food pantry). The distance is outputted
  in miles.
* sort the features based on the shortest distance.
* and keep only the first 3 elements of the array (the 3 pantries with the
  shortest distance from origin to destination).

## Construct and send the SMS message {#construct-and-send-sms-message}

*Duration is 10 min*

Now for the fun part! Sending the message back to the user. We've successfully
calculated distances and sorted the three shortest distances to the user, but
we still need to construct a nice message to send back to the user.

```javascript
const output = `Here are the 3 closest food pantries near ${query}: \n\n ${features.map(x =>
  `${x.properties.Name}\n${x.properties.distanceFromOrigin.toFixed(2)} miles away\n${x.properties['Phone number']}\n\n`
).join('')}`

twiml.message(output);
res.writeHead(200, {
  'Content-Type': 'text/xml'
});
res.end(twiml.toString());
```

`output` is the message we've constructed. When rendered properly, it will look
something like:

```
Here are the 3 closest food pantries near 425 w randolph street chicago:

Pine Avenue United Church
6.50 miles away
(773) 287-4777

Project Care
7.23 miles away
(773) 881-8296

Sanad Organization
8.06 miles away
(773) 436-7989
```

Finally, we send the message to the user using the Twilio code.

## Review {#review}

*Duration is 1 min*

Congratulations! You've completed this tutorial!

The end result should look something like:

![result](graphics/2.png)

In this tutorial, you've learned how to:

* create XYZ Spaces and upload data with the HERE command line interface.
* transform addresses to coordinates with the HERE Geocoding API.
* send and receive messages with Twilio.

This is just a basic example of what can be done with HERE Location Services and XYZ, take a look at the
[HERE Developer blog](https://developer.here.com/blog) to see more examples of creative and useful applications of HERE Location Services and XYZ.


## Appendix {#appendix}


```javascript
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const request = require('request');
const turf = require('@turf/turf');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

//HERE credentials
const here = {
   id: 'HERE_APP_ID',
   code: 'HERE_APP_CODE',
   token: 'HERE_XYZ_TOKEN'
}

//Twilio credentials:
const twilio = {
   sid: 'TWILIO_SID',
   token: 'TWILIO_TOKEN'
}

const client = require('twilio')(twilio.sid, twilio.token);

app.post('/sms', (req, res) => {
   const twiml = new MessagingResponse();
   const query = req.body.Body; //Extract the location
   const geocodeURL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${here.id}&app_code=${here.code}&searchtext=${query}`;

   request.get(geocodeURL, (error, response, body) => {
      const geocodeJson = JSON.parse(body);
      const coordinates = {
         lat: geocodeJson.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
         long: geocodeJson.Response.View[0].Result[0].Location.DisplayPosition.Longitude
      };
      const xyzSpaceId = 'SPACE_ID';
      const xyzURL = `https://xyz.api.here.com/hub/spaces/${xyzSpaceId}/search?access_token=${here.token}`;
      request.get(xyzURL, (error, response, body) => {
         const xyzJson = JSON.parse(body);

         let features = xyzJson.features;
         for (let i = 0; i < features.length; i++) {
            const pantryCoordinates = features[i].geometry.coordinates;
            features[i].properties.distanceFromOrigin = turf.distance(
               turf.point([coordinates.long,coordinates.lat]),
               turf.point(pantryCoordinates),
               {units: 'miles'});
         }

         features = features.sort((a,b) => a.properties.distanceFromOrigin - b.properties.distanceFromOrigin).slice(0, 3);

         const output = `Here are the 3 closest food pantries near ${query}: \n\n ${features.map(x =>
            `${x.properties.Name}\n${x.properties.distanceFromOrigin.toFixed(2)} miles away\n${x.properties['Phone number']}\n\n`
         ).join('')}`;

         twiml.message(output);
         res.writeHead(200, {
            'Content-Type': 'text/xml'
         });
         res.end(twiml.toString());
      });
   });
});

http.createServer(app).listen(1337, () => {
   console.log('Express server listening on port 1337');
});
```
