// Relative dependencies --------------------------------------------------------------------------

// Absolute dependencies --------------------------------------------------------------------------

const rawCard = require("../../constants/card.json");

// Declarations -----------------------------------------------------------------------------------

async function createCard(req) {
  const deepCopy = JSON.parse(JSON.stringify(rawCard))
  deepCopy.front.textTop = "seit Serverstart gab es ";
  deepCopy.front.textBottom = "Tweets mit #heilbronn";
  deepCopy.front.value = "Loading ...";
  deepCopy.front.background = "heilbronn/Svg´s/twitter.svg";
  deepCopy.front.cssClass = "twitter-element";
  deepCopy.back.text = "Schreibe einen Tweet mit #heilbronn und sieh wie der Zähler sich erhöht" 
  return deepCopy;
}

module.exports.createCard = createCard;
