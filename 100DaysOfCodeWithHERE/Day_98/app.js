const fetch = require('node-fetch');

require('dotenv').config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const SPACE_ID = process.env.SPACE_ID;

fetch(`https://xyz.api.here.com/hub/spaces/${SPACE_ID}/iterate?access_token=${ACCESS_TOKEN}`)
.then(res => {
	return res.json();
})
.then(res => {
	console.log(res);
})
.catch(e => {
	console.error(e);	
});

