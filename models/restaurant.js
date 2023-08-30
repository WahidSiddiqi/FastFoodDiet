const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// const movieSchema = new Schema({
//   title: { type: String, required: true },
//   releaseYear: {
//     type: Number,
//     default: function () {
//       return new Date().getFullYear();
//     },
//     min: 1927
//   },
//   mpaaRating: {
//     type: String,
//     enum: ['G', 'PG', 'PG-13', 'R']
//   },
//   cast: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Performer'
//   }],
//   nowShowing: { type: Boolean, default: true },
//   reviews: [reviewSchema]
// }, {
//   timestamps: true
// });

// Compile the schema into a model and export it
module.exports = mongoose.model('Restaurant', restaurantSchema);