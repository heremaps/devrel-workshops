from flask import Flask,render_template
from flask_mqtt import Mqtt

import ssl
import urllib.request as request
# import threading
app  = Flask(__name__)

app.config['MQTT_BROKER_URL'] = '************-ats.iot.YOUR_REGION.amazonaws.com'
app.config['MQTT_BROKER_PORT'] = 8883
app.config['MQTT_CLIENT_ID'] = "DummyCar"
app.config['MQTT_KEEPALIVE'] = 60
app.config['MQTT_TLS_ENABLED'] = True
app.config['MQTT_TLS_CA_CERTS'] = "root-CA.crt"
app.config['MQTT_TLS_CERTFILE'] = "iotThing.cert.pem"
app.config['MQTT_TLS_KEYFILE'] = "iotThing.private.key"
app.config['MQTT_TLS_CIPHERS'] = None
app.config['MQTT_TLS_CERT_REQS'] = ssl.CERT_REQUIRED
app.config['MQTT_TLS_VERSION'] = ssl.PROTOCOL_TLSv1_2

mqtt = Mqtt(app)

lat = 0
lng = 0
position = {lat:0,lng:0}

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    print ('connected and waiting for msg')
    mqtt.subscribe('iot')

@mqtt.on_message()
def handle_mqtt_message(client, userdata, msg):
    global lat, lng, position
    data = eval(msg.payload.decode())
    lat = data['lat']
    lng = data['lng']

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/getlatlng')
def getlatlng_page():
    global lat, lng, position
    print("called ajax : " , str(lat)+','+str(lng))
    return {'lat':lat,'lng':lng}

if __name__ == '__main__':
    app.run( use_reloader=False, debug=True)

