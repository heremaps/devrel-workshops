#!/bin/python

from string import Template

s = Template(
    '    {"lat": $lat, "lng": $lng, "alt": $alt, "c": $cl, "r": $r, "g": $g, "b": $b},\n'
)

csv = open("test.csv", "r")
json = open("point-cloud.json", "w")

json.write('{\n  "points":[\n')

row = csv.readline()
while row:
    values = row.split(",")
    if len(values) > 7:
        json.write(
            s.substitute(
                lat=values[1].strip(),
                lng=values[2].strip(),
                alt=values[3].strip(),
                cl=values[4].strip(),
                r=values[5].strip(),
                g=values[6].strip(),
                b=values[7].strip(),
            )
        )
    row = csv.readline()
csv.close()

json.write("  ]\n}\n")
json.close()