const foodTruckService = require('../services/food_truck.service');
const NodeGeocoder = require('node-geocoder');
const createEvent = async (req, res) => {
    try{
        const foodTruck = await foodTruckService.createEvent(req.body);
        if(foodTruck.success){
            res.status(200).send(foodTruck);
        }
        else{
            res.status(400).send(foodTruck.message);
        }
    }
    catch(e){
        res.status(400).send(e);
    }
    
}

const getEvent = async (req, res) => {
    try {
        const foodTruck = await foodTruckService.getEvent(req.params.id);
        if(foodTruck.success){
            res.status(200).send(foodTruck);
        }
        else{
            res.status(400).send(foodTruck.message);
        }
    }
    catch(e){
        res.status(400).send(e);
    }
}

const listFoodTruck = async (req, res) => {
    try{
        let longitude = 0;
        let latitude = 0;
        if(req.query.loc === ""){
            const options = {
                provider: 'openstreetmap'
            };
            const geoCoder = NodeGeocoder(options);
            const location = req.query.city + ', ' + req.query.state;
            const address = await geoCoder.geocode(location);
            longitude = address[0].longitude;
            latitude = address[0].latitude;
        }
        else{
            const array = req.query.loc.split(" ");
            longitude = array[0];
            latitude = array[1];
        }
        const foodTruck = await foodTruckService.location(longitude, latitude, req.query.radius);
        if(foodTruck.success){
            res.status(200).send(foodTruck.listFoodTruck);
        }
        else{
            res.status(400).send(foodTruck.message);
        }
    }
    catch(e){
        res.status(400).send(e);
    }
}
module.exports = {
    createEvent,
    getEvent,
    listFoodTruck
}