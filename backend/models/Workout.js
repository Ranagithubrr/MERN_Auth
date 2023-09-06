const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const workoutSchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    reps:{
        type:Number,
        require:true
    },
    load:{
        type:Number,
        require:true,
    },
    email:{
        type:String,
        require:true,
    }

}, {timestamps : true});


module.exports = mongoose.model("workout", workoutSchema)