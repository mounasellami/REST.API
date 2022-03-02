const mongoose = require("mongoose");

const person = {
    name:String,
    age:Number,
}

module.exports = Person = mongoose.model("Person", person);