// Relative dependencies --------------------------------------------------------------------------

const express = require("express");

// Absolute dependencies --------------------------------------------------------------------------

const PendlerController = require("../controllers/pendler/pendler.controller");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("INFO Pendler card will be created");
    return res.json(await PendlerController.createCard());
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
