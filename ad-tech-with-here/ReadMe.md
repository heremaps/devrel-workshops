# How to run this workshop (To be changed)

- Onboard iOT thing
- Download root CA certificate, iot certificate, private key, public key
- replace the path for these certificates and aws host name in [geocode_data_publish.py](geocode_data_publish.py)
- replace the path for these certificates and aws host name in [flaskserver.py](flaskserver.py)
- get your freemium API key from [developer.here.com](https://developer.here.com/freemium)
- enter your JS key in [creds.js](static/js/creds.js)
- upload the [shoes.zip](shoes.zip) as custom layer on [enterprise.here.com](https://enterprise.here.com) with the same APIKEY
- Deploy the Geocode Serverless function from the [AWS Serverless Repository](https://serverlessrepo.aws.amazon.com/applications/us-east-1/760301537001/Geocode) with the same APIKEY
- Change it to call the Geofencing API
- replace the api endpoint in [dispGeofences.js](static/js/dispGeofences.js) and [showCar.js](static/js/showCar.js)
- run [geocode_data_publish.py](geocode_data_publish.py)
- run [flaskserver.py](flaskserver.py)
- open [localhost:5000](127.0.0.1:5000/) in your browser
