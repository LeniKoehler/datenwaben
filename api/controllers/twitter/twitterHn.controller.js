// Relative dependencies --------------------------------------------------------------------------

// Absolute dependencies --------------------------------------------------------------------------

const rawCard = require("../../constants/card.json");

// Declarations -----------------------------------------------------------------------------------

async function createCard(req) {
  const deepCopy = JSON.parse(JSON.stringify(rawCard))
  deepCopy.front.textTop = "Täglich Twitter Fun";
  deepCopy.front.textBottom = "Twitter fun";
  deepCopy.front.value = "Loading ...";
  deepCopy.front.background = "img/train.svg";
  deepCopy.front.cssClass = "twitter-element"
  return deepCopy;
}

module.exports.createCard = createCard;
