const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the dish
const dishSchema = new Schema({
    title: String,
    category: String,
    ingredients: [{
        name: String,
        amount: String
    }],
    instructions: String,
    cookingTime: Number,
    difficulty: String,
    servings: Number
});

// Create a model based on the schema
const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
