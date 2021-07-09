/** 
 * Summary: This code creates a copy of card.json and changes its attributes
 * in the function createCard(). The cssClass must be a unique identifier(!)
 * in order to be able to find the card later in the page so that the value
 * can be changed depending on the value coming through the socket connection
 * to the twitter API.
 * 
 * @author Magdalena Köhler 
 * @see https://github.com/LeniKoehler/
*/

// Relative dependencies --------------------------------------------------------------------------

// Absolute dependencies --------------------------------------------------------------------------

const rawCard = require("../../constants/card.json");

// Declarations -----------------------------------------------------------------------------------

async function createCard(req) {
  const deepCopy = JSON.parse(JSON.stringify(rawCard))
  deepCopy.portal.url = "https://twitter.com/heilbronn_de?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor";
  deepCopy.front.textTop = "Seit Serverstart gab es";
  deepCopy.front.textBottom = "Tweets mit #heilbronn";
  deepCopy.front.value = "Loading ...";
  deepCopy.front.background = "heilbronn/svg/twitter.svg";
  deepCopy.front.cssClass = "twitter-element";
  deepCopy.back.text = "Schreibe einen Tweet mit #heilbronn und sieh wie der Zähler sich erhöht" 
  return deepCopy;
}

module.exports.createCard = createCard;
