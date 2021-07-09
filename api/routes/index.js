/**
 * Summary: This is the router for each dynamic comb for the api. This is the
 * place where the cards receive their path that will be stated in the file
 * cityConfig.json.
 * 
 * The creation of the cards in the controllers is triggered from here. 
 * 
 * @author Magdalena Köhler 
 */

// Relative dependencies --------------------------------------------------------------------------

const express = require("express");

// Absolute dependencies --------------------------------------------------------------------------

const PendlerController = require("../controllers/pendler/pendler.controller");
const EuElectionController = require("../controllers/elections/euElection.controller");
const TwitterHnController = require("../controllers/twitter/twitterHn.controller");

// Declarations -----------------------------------------------------------------------------------

const router = express.Router();

router.get("/pendler", async (req, res, next) => {
  try {
    console.log("INFO Pendler card will be created");
    return res.json(await PendlerController.createCard());
  } catch (error) {
    return next(error);
  }
});

router.get("/elections/eu", async (req, res, next) => {
    try {
      console.log("INFO Pendler card will be created");
      return res.json(await EuElectionController.createCard());
    } catch (error) {
      return next(error);
    }
  });

  router.get("/twitter/heilbronn", async (req, res, next) => {
    try {
      console.log("INFO card will be created");
      return res.json(await TwitterHnController.createCard());
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
