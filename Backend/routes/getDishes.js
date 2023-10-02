const router = require("express").Router();
const Dish=require('../models/dish');

router.get('/',(req,res) =>{
    Dish.find(function(err,Dishes){
        if(err){
            res.status(400).json(err.message)
        }else{
            res.status(200).json(Dishes)
        }
    })
})

module.exports = router