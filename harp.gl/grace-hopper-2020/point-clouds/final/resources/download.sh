#!/bin/bash

curl 'https://amathin-rest.had.in.here.com/ama-thin/lidarpoint' \
  -H 'authority: amathin-rest.had.in.here.com' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'accept: */*' \
  -H 'origin: https://webapps.dev.had.in.here.com' \
  -H 'sec-fetch-site: same-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://webapps.dev.had.in.here.com/virtual-groundtruth/task/266152a6-abd4-11ea-910b-0242ac110005' \
  -H 'accept-language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6' \
  --data-binary '{"source":"s3://asset.ama.here.com/436ce7d6-5882-4a7a-af32-f58edf8e3299","timeRange":{"min":1270214604279192,"max":1270214605314303},"format":"POINT_CSV","compress":"GZIP","endian":"BIG","advanced":{"colorOptions":null,"fusedOptions":{"block":false,"intensity":true,"laserNum":false,"rot":false,"time":true}},"lidarOptions":{"thin":{"skip":2}},"colorize":{"enable":true,"method":"POINT","source":"REDUCED","resolutionScale":"FULL","consensus":true,"sky":false,"frontOnly":false,"activeFames":4,"saturate":2,"gamma":1.3,"depthFill":false,"depthFillTolerance":0.2,"blend":1,"preset":"NONE"},"provider":{"select":"VersionID","type":"ALIGNMENT","poseVersion":"2323699","fallback":true}}' \
  --compressed --output test.csv
