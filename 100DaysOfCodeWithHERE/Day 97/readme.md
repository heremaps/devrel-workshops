For this day, you'll run the following commands.

	here xyz create -t "NPS Data"

This creates a new, empty space with the title, "NPS Data". When it's done, it will output the ID of the new space.

	here xyz upload ID_OF_THE_NEW_SPACE -f ./national-parks.geojson

This will upload the data in `national-parks.geojson` to the space you just created.

	here xyz show ID_OF_THE_NEW_SPACE

This will show the contents of the space.