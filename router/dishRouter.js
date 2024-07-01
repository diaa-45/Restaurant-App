const express=require("express");
const router=express.Router();
const {
  create,
  deleteAll,
  deleteOne,
  getAll,
  getByCategory,
  getCategories,
  getDifficlty,
  getIngredints,
  getOne,
  update
}=require("../controller/dishController")


router.post("/add",create );

router.put("/update/:id", update);

router.get("/getAll", getAll);

router.get("/getCategory/:category", getByCategory);
router.get("/getCategories", getCategories);
router.get("/getDifficlty", getDifficlty);
router.get("/getIngredints", getIngredints);

router.get("/getOne/:id", getOne);

router.delete("/deleteOne/:id", deleteOne);

router.delete("/deleteAll", deleteAll);

module.exports=router;