const express = require('express');
const app = express();
const path = require('path');
const port = 3124;

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const serverBookings = 'http://localhost:3000',
      serverRelatedListings = 'http://localhost:3001',
      serverGallery = 'http://localhost:1128';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.all('/rooms/bookings/listings/:id', (req, res) => {
  console.log('redirecting to Bookings server');
  apiProxy.web(req, res, {target: serverBookings});
});

app.all('/rooms/related-listings/:id', (req, res) => {
  console.log('redirecting to Related Listings server');
  apiProxy.web(req, res, {target: serverRelatedListings});
});

app.all('/images/:houseId', (req, res) => {
  console.log('redirecting to Gallery server');
  apiProxy.web(req, res, {target: serverGallery});
})

app.listen(port, console.log(`${port} is listening!`));

module.exports = app;