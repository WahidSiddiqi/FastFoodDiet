var express = require('express');
var router = express.Router();


/* GET restaurants page */
router.get('/', function (req, res, next) {
    const loggedIn = req.user !== undefined;
    res.render('restaurants', { title: 'Restaurants', loggedIn });
});

module.exports = router;
