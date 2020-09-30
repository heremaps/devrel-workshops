import csv
import pandas as pd
from time import sleep

reader = pd.read_csv('route.csv')
for i in range(len(reader)):
    print(reader.latitude[i],reader.longitude[i])
    sleep(2)
