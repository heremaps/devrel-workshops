
# Getting to the Point with Geospatial

We'll be going through a series of demos and notebooks to help you get
comfortable with some basic geospatial concepts using Python libraries.

# Pre-Requisites

- Sign up for a [free developer account with this link](https://developer.here.com/events/pycon2019) for 250k transactions every month
- Install the libraries that we'll use: `pip install -f requirements.txt`
- Try the [heredevs slack](https://t.her.is/Slack) #python channel for questions, etc.

# Agenda

- Overview of HERE and Location
- Geocoding Workbook
    - Activity: to extract location from text
    - Activity: to extract location from images
- Maps Workbook
    - Activity: Working with GeoJSON
- Point Clouds
    - Python Point Cloud Toolkit

# Getting Your APP_ID and APP_CODE

I recommend creating a simple shell script like this to hold your app id and
code as you go through the notebooks.

```
#!/bin/bash
# Run ". env.sh" to get variables into your environment

export APP_ID_HERE=...
export APP_CODE_HERE=...
```

If you run the jupyter notebook from the same process you'll have access
to these from the environment variables.
