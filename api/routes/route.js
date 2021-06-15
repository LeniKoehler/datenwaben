// Relative dependencies --------------------------------------------------------------------------

const express = require("express");

// Absolute dependencies --------------------------------------------------------------------------

// const PendlerController = require("../controllers/pendler/pendler.controller");

const Paths = [
  "../controllers/pendler/pendler.controller"
];

// Declarations -----------------------------------------------------------------------------------

const router = express.Router();

Paths.forEach(function(path) {
    router.get("/", async (req, res, next) => {
      try {
        let controller = require(path);
        console.log("INFO Pendler card will be created");
        return res.json(await controller.createCard());
      } catch (error) {
        return next(error);
      }
  });
});

module.exports = router;
