'use strict';

const request = require('request');

function formatResponse(sessionAttributes, fulfillmentState, location) {
    var chatReply = "Not able to locate!";
    if (location) {
        chatReply = location;
    }
    var message = {'contentType': 'PlainText', 'content': chatReply};
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

// Get the coordinates for a person by name
// Coordinates are hard-coded for demo purposes
function getTrackablePersonLocation(name) {
    var coords = null;
    switch(name) {
      case 'mike':
        coords = '33.448,-112.074';  // Phoenix
        break;
      case 'nic':
        coords = '37.866,-122.275';  // Berkeley
        break;
      case 'jay':
        coords = '47.612,-122.332';  // Seattle
        break;
        case 'richard':
        coords = '52.520,13.404';  // Berlin
        break;
      default:
        coords = null;  // for demo purposes we only, no error handling
    }
    return coords;
}

// --------------- Events -----------------------

function dispatch(intentRequest, callback) {
    console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const APP_ID = process.env.APP_ID; // HERE APP ID stored in environment variables
    const APP_CODE = process.env.APP_CODE; // HERE APP Code stored in environment variables
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const trackablePerson = slots.slotOne.toLowerCase();
    var formattedResponse = null;
    var prox = getTrackablePersonLocation(trackablePerson);
    if (prox) {
        const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json' +
            '?app_id=' + APP_ID +
            '&app_code=' + APP_CODE +
            '&prox=' + prox +
            '&mode=retrieveAreas&maxresults=1&gen=9';
        request(url, { json: true }, (err, res, body) => {
            if (err) { return console.log('err: ', err); }
            console.log('statusCode:', res && res.statusCode);
            console.log('body: ', JSON.stringify(body));
            var location = body.Response.View[0].Result[0].Location.Address.Label;
            formattedResponse = formatResponse(sessionAttributes, 'Fulfilled', location);
            callback(formattedResponse);
        });
    } else {
        formattedResponse = formatResponse(sessionAttributes, 'Fulfilled', null);
    }
}

// --------------- Main handler -----------------------
exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
