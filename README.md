# Google Place Autocomplete

The best practice with Google Place Autocomplete API on React

Using Google Place Autocomplete without third-party library

Autocomplete is a feature of the Places library in the Maps JavaScript API. When a user starts typing an address, autocomplete fills in the rest.

## Setting up the Project

Move it into the google-place-autocomplete directory and run it from the terminal:

```
cd google-place-autocomplete
npm start
```

Before we get started, you need the API-Key for the Google Places API. You can get that key [here](https://developers.google.com/maps/documentation/javascript/places-autocomplete). I store Google API Key in the .env file — you should too.

## Magic Code

Let’s implement the main SearchLocationInput component to work with the Google Place Autocomplete API. First, we have to create a function to load the script for working with Google API.

I used this script for dynamic JavaScript for fast page speed load on our public pages. It dynamically loads JavaScript files with a callback when finished. Next, we have to assign the Google Place Map to the autoComplete variable when the component is rendered:

Then we attach to the autocomplete listener, which listens for whenever a user selects one of the autocomplete suggestions. Let’s createthe handlePlaceSelect method to handle selection:

This method is called when the event is triggered and gets place data from API. Then we can do any operation with data.
