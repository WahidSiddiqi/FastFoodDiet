var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('../config/middlewares/ensureLoggedIn');
const Restaurant = require('../models/restaurant')
var restaurantsController = require('../controllers/restaurants.js')


/* GET restaurants page */
router.get('/', ensureLoggedIn, restaurantsController.index);

/* GET restaurants page */
router.get('/new', ensureLoggedIn, restaurantsController.new);


router.post('/', ensureLoggedIn, restaurantsController.create);

router.get('/:name', ensureLoggedIn, restaurantsController.show);



module.exports = router;
