const FoodTruck = require('../model/food_truck.model')
const NodeGeocoder = require('node-geocoder');

const createEvent = async (foodTruck) => {
    try {
        if (await FoodTruck.findOne({ name: foodTruck.name })) {
            return { success: false, message: 'food truck name has been added' };
        }
        const newFoodTruck = new FoodTruck(foodTruck);
        await newFoodTruck.save();
        return { success: true, message: 'add successfully' };

    }
    catch (e) {
        console.log(e);
    }
}
const getEvent = async (id) => {
    try {
        const foodTruck = await FoodTruck.findOne({ _id: id });
        if (foodTruck) {
            return { success: true, foodTruck: foodTruck };
        }
        else {
            return { success: false, message: 'cannot find food truck by that id' };
        }
    }
    catch (e) {
        console.log(e);
    }
}
const location = async (longitude, latitude, radius) => {
    try {
        const options = {
            provider: 'openstreetmap'
        };
        const geoCoder = NodeGeocoder(options);
        const listFoodTruck = await FoodTruck.find();

        if (listFoodTruck) {
            let list = [];
            for await (const element of listFoodTruck) {
                try {
                    const address = await geoCoder.geocode(element.address);
                    const dist = distance(address[0].latitude, address[0].longitude, latitude, longitude);
                    if (radius > dist) {
                        list.push(element);
                    }
                }
                catch (e) {
                    return { success: false, message: e }
                }
            }
            return { success: true, listFoodTruck: list };
        }
        else {
            return { success: false, message: 'cannot find food truck list' };
        }

    }
    catch (e) {
        return { success: false, message: e };
    }
}


const distance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist;
    }
}

module.exports = {
    createEvent,
    getEvent,
    location,
    distance
}