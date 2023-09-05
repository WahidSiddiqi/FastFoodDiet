const Item = require('../models/item');
const Restaurant = require('../models/restaurant')

async function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        // Update this line because now we need the _id of the new movie
        const item = await Item.create(req.body);
        // Redirect to the new movie's show functionality 
        res.redirect(`/items/${item.name}`);
    } catch (err) {
        // Typically some sort of validation error
        console.log(err);
        const loggedIn = req.user !== undefined;
        res.render('echo_body', { title: 'Items', loggedIn, errorMsg: err.message, bodystring: JSON.stringify(req.body, null, 2) });
    }
}

async function index(req, res) {
    const loggedIn = req.user !== undefined;
    const items = await Item.find({})
    console.log(items)
    res.render('items', { title: 'items', loggedIn, items });
}

async function addToRestaurant(req, res) {
    // create item
    console.log({ message: 'in addToRestaurant', itemBody: req.body });

    const newItem = {
        item: req.body.item,
        calories: Number(req.body.calories)
    };

    console.log({ newItem })
    const item = await Item.create(newItem)

    // look up restaurant
    const restaurant = await Restaurant.findOne({ name: req.params.name });

    // add item to restaurants items array
    restaurant.items.push(item._id)

    // save restaurant
    await restaurant.save();
    console.log({ item: item, restaurant })

    res.redirect(`/restaurants/${restaurant.name}`);

}

async function newItem(req, res) {
    const loggedIn = req.user !== undefined;
    res.render('items/new', { title: 'Items', loggedIn });
}

async function show(req, res) {
    const name = req.params.name
    const item = await Item.findOne({ name })
    console.log(item, name);
    res.render('items/show', { title: 'Item', item: item })
}

module.exports = {
    index,
    show,
    new: newItem,
    create,
    addToRestaurant
};

