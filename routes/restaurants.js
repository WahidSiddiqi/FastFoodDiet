var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('../config/middlewares/ensureLoggedIn');
const Restaurant = require('../models/restaurant')
var restaurantsController = require('../controllers/restaurants.js')


/* GET restaurants page */
router.get('/', restaurantsController.index);

/* GET restaurants page */
router.get('/new', ensureLoggedIn, restaurantsController.new);


router.post('/', ensureLoggedIn, restaurantsController.create);

router.get('/:name', ensureLoggedIn, restaurantsController.show);

router.post('/:name/delete', ensureLoggedIn, restaurantsController.delete);

router.get('/:name/item/:id/edit', ensureLoggedIn, restaurantsController.showEditItem);

router.post('/:name/item/:id/edit', ensureLoggedIn, restaurantsController.postEditItem);

router.get('/:name/item/:id/delete', ensureLoggedIn, restaurantsController.showDeleteItem);

router.post('/:name/item/:id/delete', ensureLoggedIn, restaurantsController.postDeleteItem);



module.exports = router;
