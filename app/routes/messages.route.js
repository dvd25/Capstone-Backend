module.exports = app => {
    const messages = require("../controllers/messages.controller");
  
    var router = require("express").Router();
  
    // Create a new product
    router.post("/", messages.create);

    // Retrieve all products
    router.get("/", messages.findAll);

    // Retrieve a single product with id
    router.get("/:id", messages.findOne);
  
    // Update a product with id
    router.put("/:id", messages.update);

    router.put("/update/:id", messages.updateStatusOnly);
  
    // Delete a product with id
    router.delete("/:id", messages.delete);
  
    // Delete all products
    router.delete("/", messages.deleteAll);

    app.use('/api/messages', router);
  };