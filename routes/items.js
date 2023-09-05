var express = require('express');
var router = express.Router();
const itemsCtrl = require('../controllers/items');
const ensureLoggedIn = require('../config/middlewares/ensureLoggedIn');

// GET /items/new (new functionality)
router.get('/items/new', ensureLoggedIn, itemsCtrl.new);
// POST /items (create functionality)
router.post('/items', ensureLoggedIn, itemsCtrl.create);
// POST /movies/:id/items (associate a performer with a movie)
router.post('/restaurants/:name/items', ensureLoggedIn, itemsCtrl.addToRestaurant);



module.exports = router;