const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//making all req, res async await functions
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //using a try because you are telling the program to pause unitl a promise is resolved!
  try{
    const categoryData = await Category.findAll({
      //including the products for each category
      include: [{ model: Product}]
    });
    //if successful... send
    res.status(200).json(categoryData)
    //else send 
    } catch (err) {
      res.status(500).json(err)
    }
  });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model : Product}]
    });
    //if statement if data is not truthy
    if(!categoryData){
      //return that no ID is associated
      res.status(404).json({ message: 'No Categories are associated with this ID'})
      return;
    }
    res.status(200).json(categoryData)
    //else send 
    } catch (err) {
      res.status(500).json(err)
    }
  });

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
    }catch (err) {
      res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  //.then after the promise is made
  .then((Category) => {
    res.status(200).json(Category);
  }) .catch ((err) => {
    console.log(err)
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const categoryData = Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(categoryData => res.status(200).json(categoryData))
  .catch((err) => {
    res.status(500).json(err)
  })
});

module.exports = router;
