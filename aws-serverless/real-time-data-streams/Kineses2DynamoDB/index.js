// Read Kinesis Data Stream => Get Lat & Long => GeoCode => Store in Dynamo DB

'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler = function(event, context, callback) {
  const requestItems = buildRequestItems(event.Records);
  const requests = buildRequests(requestItems);

  Promise.all(requests)
    .then(() => callback(null, `Delivered ${event.Records.length} records`))
    .catch(callback);
};
  // address variable
    var address="";
    function buildRequestItems(records) {
    return records.map((record) => {
   
    const json = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
    const item = JSON.parse(json);
// retrieving Latitude & Longitue
    var latlong = item['Latitude']+","+item['Longitude'];
      
 // invoking lambda function with payload
    var lambda = new AWS.Lambda();
    var params = {
      FunctionName: '', /* required function name*/ //serverlessrepo-Geocode-GeocodeFunction-8UY78GHJIUGYT
      Payload: JSON.stringify({ "pathParameters": { "prox":latlong,"mode": "retrieveAddresses", "maxresults": "1","gen": "9" } })
    };
    
    var add =lambda.invoke(params, function(err, data) {
      if (err){ console.log(err, err.stack);} // an error occurred
      else{
          var pullResults = JSON.parse(data.Payload);
          var resp = JSON.parse(pullResults.body);
          address =resp["Response"]['View']['0']['Result']['0']['Location']['Address']['Label'];
      }
      // successful response
      return address.toString();
    });
    item["Address"]=address;
    
    return {
      PutRequest: {
        Item: item,
      },
    };
  });
}
// push response to dynamo DB
function buildRequests(requestItems) {
  const requests = [];

  while (requestItems.length > 0) {
    const request = batchWrite(requestItems.splice(0, 25));

    requests.push(request);
  }

  return requests;
}

function batchWrite(requestItems, attempt = 0) {
  const params = {
    RequestItems: {
      [tableName]: requestItems,
    },
  };

  let delay = 0;

  if (attempt > 0) {
    delay = 50 * Math.pow(2, attempt);
  }

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      dynamoDB.batchWrite(params).promise()
        .then(function(data) {
          if (data.UnprocessedItems.hasOwnProperty(tableName)) {
            return batchWrite(data.UnprocessedItems[tableName], attempt + 1);
          }
        })
        .then(resolve)
        .catch(reject);
    }, delay);
  });
}
