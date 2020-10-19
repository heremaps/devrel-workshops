function getTransitRoute() {

    let url = "https://transit.router.hereapi.com/v8/departures" +
        "?apiKey=YOUR_API_KEY" +
        "&ids=425315170" +
        "&timespan=30";

    fetch(url)
        .then(response => response.json())
        .then(response => {

            console.log(response);

        }, error => {
            console.log.error(error);
        });

}

getTransitRoute();