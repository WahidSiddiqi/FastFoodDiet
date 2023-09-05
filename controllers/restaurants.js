const Restaurant = require('../models/restaurant');
const Item = require('../models/item')

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
    res.render('restaurants', { title: 'Restaurants', loggedIn, restaurants });
}



async function newRestaurant(req, res) {
    const loggedIn = req.user !== undefined;
    res.render('restaurants/new', { title: 'Restaurants', loggedIn });
}

async function deleteRestaurant(req, res) {
    const restaurantName = req.params.name;
    // TODO: delete all items that restaurants owns

    // delete restaurants
    const deletedRestaurant = await Restaurant.findOneAndDelete({
        name: restaurantName
    })
    console.log({ deletedRestaurant })
    res.redirect('/restaurants')
}


async function show(req, res) {
    const name = req.params.name
    const restaurant = await Restaurant.findOne({ name })

    const items = await Item.find({ _id: { $in: restaurant.items } }).sort('name');
    res.render('restaurants/show', { title: 'Restaurant', restaurant, items })
}

async function showEditItem(req, res) {
    const restaurantName = req.params.name;
    const item = await Item.findById(req.params.id);
    console.log({ id: req.params.id, item })
    res.render('restaurants/editItem', {
        title: `Edit ${item.name}`,
        item,
        restaurant: {
            name: restaurantName
        }
    })
}

async function postEditItem(req, res) {
    const itemId = req.params.id
    const restaurantName = req.params.name;
    const item = req.body.item;
    const calories = req.body.calories;
    const updatedItem = await Item.findByIdAndUpdate(itemId, { item, calories });
    console.log({ item, calories, updatedItem, restaurantName });

    // after successfully update the item, redirect back to restaurant page
    res.redirect(`/restaurants/${restaurantName}`)
}

async function showDeleteItem(req, res) {
    const restaurantName = req.params.name;
    const item = await Item.findById(req.params.id);
    console.log({ id: req.params.id, item })
    res.render('restaurants/deleteItem', {
        title: `Delete ${item.name}`,
        item,
        restaurant: {
            name: restaurantName
        }
    })
}

async function postDeleteItem(req, res) {
    const itemId = req.params.id
    const restaurantName = req.params.name;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    console.log({ deletedItem, restaurantName });

    // after successfully deleting the item, redirect back to restaurant page
    res.redirect(`/restaurants/${restaurantName}`)
}


module.exports = {
    index,
    showEditItem,
    postEditItem,
    showDeleteItem,
    postDeleteItem,
    show,
    new: newRestaurant,
    create,
    delete: deleteRestaurant
};

