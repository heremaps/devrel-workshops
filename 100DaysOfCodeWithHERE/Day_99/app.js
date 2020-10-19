const fetch = require('node-fetch');

require('dotenv').config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const SPACE_ID = process.env.SPACE_ID;

// City of New Orleans, LA
const LAT = 29.95;
const LON = -90.07;
// How big of a circle to search (meters)
const RAD = 5000;

fetch(`https://xyz.api.here.com/hub/spaces/${SPACE_ID}/spatial?access_token=${ACCESS_TOKEN}&lat=${LAT}&lon=${LON}&radius=${RAD}`)
.then(res => {
	return res.json();
})
.then(res => {
	console.log(res);
})
.catch(e => {
	console.error(e);	
});

