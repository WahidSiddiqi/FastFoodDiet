const Restaurant = require('../models/restaurant');

async function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        // Update this line because now we need the _id of the new movie
        const restaurant = await Restaurant.create(req.body);
        // Redirect to the new movie's show functionality 
        res.redirect(`/restaurants/${restaurant.name}`);
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        const loggedIn = req.user !== undefined;
        res.render('echo_body', { title: 'Restaurants', loggedIn, errorMsg: err.message, bodystring: JSON.stringify(req.body, null, 2) });
    }
}

async function index(req, res) {
    const loggedIn = req.user !== undefined;
    const restaurants = await Restaurant.find({})
    console.log(restaurants)
    res.render('restaurants', { title: 'Restaurants', loggedIn, restaurants });
}



async function newRestaurant(req, res) {
    const loggedIn = req.user !== undefined;
    res.render('restaurants/new', { title: 'Restaurants', loggedIn });
}

async function show(req, res) {
    const name = req.params.name
    const restaurant = await Restaurant.findOne({ name })
    console.log(restaurant, name);
    res.render('restaurants/show', { title: 'Restaurant', restaurant: restaurant })
}

module.exports = {
    index,
    show,
    new: newRestaurant,
    create
};

