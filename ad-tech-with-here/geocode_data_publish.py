import json
import paho.mqtt.client as paho
import os
import socket
import ssl
from time import sleep
import random
from random import uniform
import csv
import pandas as pd

connflag = False

#print(ssl.OPENSSL_VERSION)

def on_connect(client, userdata, flags, rc):
    global connflag
    connflag = True
    print("Connection returned result: " + str(rc) )

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))



mqttc = paho.Client()

mqttc.on_connect = on_connect
mqttc.on_message = on_message

lat = 12.9716
lng = 77.5946

awshost = "***************-ats.iot.YOUR_REGION.amazonaws.com"
awsport = 8883
clientId = "DummyCar"
thingName = "DummyCar"
caPath = "root-CA.crt"
certPath = "iotThing.cert.pem"
keyPath = "iotThing.private.key"

mqttc.tls_set(caPath, certfile=certPath, keyfile=keyPath, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)

mqttc.connect(awshost, awsport, keepalive=60)

mqttc.loop_start()
while 1==1:
    reader = pd.read_csv('route.csv')
    if connflag == True:
        for i in range(len(reader)):
            new_lat = reader.latitude[i]
            new_lon = reader.longitude[i]
            payload = json.dumps({'lat':new_lat, 'lng':new_lon})
            mqttc.publish("iot", payload, qos=0)
            print("msg sent: " + "%s" % payload )
            sleep(5)

    else:
        print("waiting for connection...")