# server

*used expressjs and mysql*

*imported rates from cryptocompare.com and bitstamp.net*

## Project setup

> run `db.sql` for quick db creation and seeding

```
> npm install
> cp .env.example .env
```

> set up db connection and cryptocompare.com apikey in .env

```
> nodemon
```

more historical rates can be imported by manually triggering GET `/import-rates` endpoint

### Main Files:

`routes/index.js` - contains main 3 routes of the app.

`controllers/appController.js` - corresponds to the routes.

`models/` - sequalize models corresponding to the 2 db tables.

`modules/externalRates.js` - most of the logic, importing rates from external APIs, fetching & saving to DB.
