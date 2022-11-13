const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/oauth')
const foodTruckController = require('../controller/food_truck.controller');

router.post('/create-event', ensureAuth, foodTruckController.createEvent);
router.get('/get-event/:id', foodTruckController.getEvent);
router.get('/get-events', foodTruckController.listFoodTruck);
module.exports = router;

