**Demo project for importing crypto rates from external sources using sockets**

Technologies:

- express
- vuejs
- mysql
- socket.io

![](https://github.com/vuurball/crypto-rates/blob/master/demo.gif)

# server

imported rates from **cryptocompare.com** and **bitstamp.net**

## Project setup

run `db.sql` for quick db creation and seeding

```
> npm install
> cp .env.example .env
```

set up db connection and cryptocompare.com apikey in .env

```
> nodemon
```

more historical rates can be imported by manually triggering GET `/import-rates` endpoint

### Main Files:

`routes/index.js` - contains main 3 routes of the app.

`controllers/appController.js` - corresponds to the routes.

`models/` - sequalize models corresponding to the 2 db tables.

`modules/externalRates.js` - most of the logic, importing rates from external APIs, fetching & saving to DB.

# client

## Project setup

```
cd client
npm install
cp .env.example .env
```

update the `VUE_APP_SERVER_URL` param in `.env` to the server url

### Compiles and hot-reloads for development

```
npm run serve
```

and open at the shown url, ie. `http://localhost:8080/`

### Main Files:

_Pages_:

- `src/views/Home.vue` - the home page.
- `src/views/HistoryRates.vue` - showing history rates from external sources.

_Components:_

- `src/components/MainSection.vue` - home page, main section, showing cryptocurrency jokes
- `src/components/MarketPricesSection.vue` - used in both pages, to show last market price (rate) for each currency.
- `src/components/HistoricalRatesSection.vue` - displaying rates history from external sources.

_Routes:_

`src/router/index.js`

_Theme:_

- was copied from the web, with modifications to mimic original coinama theme
- used `bootstrap-vue` lib
