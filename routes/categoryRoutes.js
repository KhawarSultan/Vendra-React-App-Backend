const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
// const multer = require('multer');

// Define storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'uploads/'); // Specify the directory where uploaded files will be stored
//   },
//   filename: (req, file, callback) => {
//     // Replace backslashes with forward slashes in the file path
//     const webPath = file.originalname.replace(/\\/g, '/');
//     callback(null, webPath);
//   },
// });


// const upload = multer({ storage: storage });

// Route to create a new category with image upload
// router.post('/categories', upload.single('image'), async (req, res) => {
//   try {
//     const { name } = req.body;
//     let image = req.file ? req.file.path : 'image is not uploaded';

//     // Replace backslashes with forward slashes in the image path
//     image = image.replace(/\\/g, '/');

//     const newCategory = new Category({
//       name,
//       image,
//     });

//     await newCategory.save();
//     res.json(newCategory);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


//cloud image code

// router.post('/categories', async (req, res) => {
//   try {
//     const { name, image } = req.body; // Extract name and image URL from the request body

//     const newCategory = new Category({
//       name,
//       image, // Store the image URL in the database
//     });

//     await newCategory.save();
//     res.json(newCategory);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post('/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/deleteCategory", async (req, res) => {
  const { categoryId } = req.body;
  try {
    const result = await Category.deleteOne({ _id: categoryId });
    if (result.deletedCount === 1) {
      console.log("Category deleted successfully");
      res.send({ status: "Ok", data: "Deleted" });
    } else {
      console.log("Category not found");
      res.status(404).send({ status: "Error", data: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", data: "Failed to delete Category" });
  }
});


module.exports = router;
