Publisher Code - geocode_data_publish.py
Generates location data(Bangalore) and sends to AWS IoT
Subscriber Code - flaskserver.py
It is on Flask, a microframework in Python, which consumes data from AWS IoT Broker and calls HTML page(inside templates folder). It contains Lambda.
-----------------------------
For AWS IoT part, you will need to create a thing and generate public and private keys with server certificate for Authentication and Authorisation.
This link will help -
https://docs.aws.amazon.com/iot/latest/developerguide/iot-moisture-create-thing.html
 