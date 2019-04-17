/*
 * Copyright (c) 2017 HERE Europe B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

// https://developer.here.com/documentation/geocoder/topics/introduction.html

'use strict';

//reverse geocode

const HERE_API_URL = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json';
const HERE_API_APP_ID = process.env.HERE_APP_ID;
const HERE_API_APP_CODE = process.env.HERE_APP_CODE;

const https = require("https");

function queryApi(url, callback) {
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      callback(body);
    });
  });
}

exports.geocodeGET = (event, context, callback) => {
  console.log(`>>> HERE_API: ${HERE_API_URL}`);
  console.log(`>>> HERE_API_APP_ID: ${HERE_API_APP_ID}`);
  console.log(`>>> HERE_API_APP_CODE: ${HERE_API_APP_CODE}`);

  //const searchtext = event.pathParameters.prox;
  const searchtext = event.queryStringParameters.prox;
  console.log(`>>> searchtext: ${searchtext}`);
  const addattr = "&mode=retrieveAddresses&maxresults=1";
  const url = `${HERE_API_URL}?app_id=${HERE_API_APP_ID}&app_code=${HERE_API_APP_CODE}&prox=${searchtext}`+addattr;
  console.log(`>>> url: ${url}`);

  queryApi(url, (body) => {
    callback(null, {
      statusCode: 200,
      // headers: { 'Access-Control-Allow-Origin': '*' },
      body: body
    });
  });
}
