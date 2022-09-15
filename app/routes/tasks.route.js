module.exports = app => {
    const tasks = require("../controllers/tasks.controller");
  
    var router = require("express").Router();
  
    // Create a new product
    router.post("/", tasks.create);

    // //user login
    //router.post("/login", tasks.login);
  
    // Retrieve all products
    router.get("/", tasks.findAll);

    // Retrieve a single product with id
    router.get("/:id", tasks.findOne);
  
    // Update a product with id
    router.put("/:id", tasks.update);
  
    // Delete a product with id
    router.delete("/:id", tasks.delete);
  
    // Delete all products
    router.delete("/", tasks.deleteAll);

    app.use('/api/tasks', router);
  };
  