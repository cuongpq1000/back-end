const foodTruckService = require('../services/food_truck.service');
const createEvent = async (req, res) => {
    try{
        console.log(req.body);
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
        const foodTruck = await foodTruckService.location(req.query.longitude, req.query.latitude, req.query.radius);
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