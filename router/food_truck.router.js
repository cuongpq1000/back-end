const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/oauth')
const foodTruckController = require('../controller/food_truck.controller');

router.post('/create-event', ensureAuth, foodTruckController.createEvent);
router.get('/get-event/:id', ensureAuth, foodTruckController.getEvent);
router.get('/location', ensureAuth, foodTruckController.listFoodTruck);
module.exports = router;

