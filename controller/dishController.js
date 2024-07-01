const asynchandler=require("express-async-handler");
const mongoose = require("mongoose")
require("dotenv").config();
const Dish=require("../model/Dish")

const create= asynchandler(async(req,res)=>{

    const dish = new Dish({
        title: req.body.title,
        category: req.body.category,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cookingTime: req.body.cookingTime,
        difficulty: req.body.difficulty,
        servings: req.body.servings,
    });
    await dish.save();

    res.status(201).json({
      success:true,
      data:dish
    });

});

const update= asynchandler(async(req,res)=>{

  const dish= await Dish.findById(req.params.id)
  if(dish){
    const updateDish = await Dish.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          ingredients: req.body.ingredients,
          instructions: req.body.instructions,
          cookingTime: req.body.cookingTime,
          difficulty: req.body.difficulty,
          servings: req.body.servings,
        },
      },
      { new: true }
    );
  res.status(201).json({
    success:true,
    data:updateDish
  });
  }else
    res.status(401).json({success: false , message: "There is an problem "});

  
  });

const getAll = asynchandler(async(req,res)=>{
  
  const dishs =await Dish.find();
  if(!dishs || dishs.length === 0)
    res.json({success: true, message: "Dishs database is empty "})
  res.status(201).json({
    count:dishs.length,
    success:true,
    data:dishs
  });
});
const getOne = asynchandler(async(req,res)=>{
  
    const dish =await Dish.findById(req.params.id);
    if(dish){
      res.status(201).json({
        success:true,
        data:dish
      });
    }else
      res.status(404).json({message : "Sorry , Dish is not Found , We Will add it Later"});
  
    
});
const getByCategory = asynchandler(async(req,res)=>{
  
    const dishs =await Dish.find({category:req.params.category}).sort("name");
    if(dishs==0)
        res.json({success: true, message: "Dishs database Category is empty "})
    res.status(201).json({
      count:dishs.length,
      success:true,
      data:dishs
    });
});

const getCategories = asynchandler(async(req,res)=>{
    Dish.distinct('category')
        .then(categories => {
            res.status(200).json({count:categories.length,Categories:categories});
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});
const getIngredints = asynchandler(async (req, res) => {
  Dish.aggregate([
    { $unwind: "$ingredients" },
    { $group: { _id: "$ingredients.name" } },
    { $project: { _id: 0, name: "$_id" } },
  ])
    .then((ingredients) => {
      const ingredientNames = ingredients.map((ingredient) => ingredient.name);
      res.status(200).json({count:ingredientNames.length,Ingredients:ingredientNames});
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const getDifficlty = asynchandler(async(req,res)=>{
    Dish.distinct('difficulty')
        .then(difficultyLevels => {
            res.status(200).json({
              count:difficultyLevels.length,
              DifficultyLevels:difficultyLevels
            });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

const deleteOne= asynchandler(async(req,res)=>{
    const dish =await Dish.findById(req.params.id);
    if(dish){
        await Dish.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Dish has been Deleted successfully", data: dish});
    }else
      res.status(404).json({message : " Dish is not Found"});
});

const deleteAll= asynchandler(async(req,res)=>{

    const dishs =await Dish.find();
    if(dishs){
        await Dish.deleteMany();
        res.status(200).json({message: "All Dishs has been Deleted successfully", data: dishs});
    }else
      res.status(404).json({message : " Dishs is Empty "});
});

module.exports={
    create,
    update,
    getAll,
    getOne,
    getByCategory,
    getCategories,
    getIngredints,
    getDifficlty,
    deleteAll,
    deleteOne,
};