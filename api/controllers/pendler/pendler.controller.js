/** 
 * Summary: This code uses the api to fetch data from opendata.heilbronn.de, 
 * parses it from csv to json and creates a card as defined in the function
 * "createCard()".
 * 
 * How to use: 
 * 1. Change the constant "URL" to the resource URL. 
 * 2. Change the constant "VALUE" to the key of the value you want to read from
 *    the parsed json file. 
 * 3. Edit the attributes of the card to be shown by adapting the contents in
 *    the function below "createCard()".
 * 
 * Additional information for step 2: To model how the csv will be parsed, go 
 * to https://csv.js.org/convert/, insert the content of the csv file under 
 * "Input" and adapt the Options (see in function below "getValue(csvData)").
 * See the result under "Output" and find the value you want. You may have to
 * use different Options in order to get a useful output, depending on the csv 
 * content structure.
 * 
 * @author Magdalena Köhler 
 * @see https://github.com/LeniKoehler/
*/

// Relative dependencies --------------------------------------------------------------------------

const axios = require("axios");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");

// Absolute dependencies --------------------------------------------------------------------------

const rawCard = require("../../constants/card.json");

// Declarations -----------------------------------------------------------------------------------

/**
 * TODO: Change PENDLER to english.
 */

const URL_PENDLER =
  "https://opendata.heilbronn.de/api/3/action/package_show?id=bedd22fc-6e82-4ead-bdd8-cd7ec3b8ff2e";

/**
 * Used to access data from the unstructured .csv provided by Heilbronn.
 * TODO: Translate the declaration.
 */

const EINPENDLER = "Einpendler in die Gemeinde";

// Functions --------------------------------------------------------------------------------------

function getEinpendler(csvData) {
  const records = parse(csvData, {
    columns: true,
    delimiter: ";",
    from_line: 2,
    skip_lines_with_error: true,
    skip_empty_lines: true,
  });
  return records[1];
}

async function getCsvData(resourceUrl) {
  const { data } = await axios.get(resourceUrl);
  if (!data) {
    throw new Error("Failed to fetch csv data");
  }

  const objWithEinpendler = getEinpendler(data);

  // This is used to inspect rawCsvData and fiddle with https://csv.js.org/convert/
  fs.writeFileSync(`${__dirname}/data.csv`, data);

  return objWithEinpendler;
}

async function getPendlerData() {
  const { data } = await axios.get(URL_PENDLER);
  if (!data) {
    throw new Error("Failed to fetch Pendler data");
  }

  const { result } = data;
  if (!result) {
    throw new Error("No result attribute");
  }

  if (!Array.isArray(result)) {
    throw new Error("Expected result to be of type Array");
  }

  if (result.length > 1) {
    throw new Error("Expected result length to be of length 1");
  }

  const { resources } = result[0];
  if (!resources) {
    throw new Error("No resources attribute");
  }

  if (!Array.isArray(resources)) {
    throw new Error("Expected resources to be of type Array");
  }

  const objWithEinpendler = await getCsvData(resources[0].url);

  return objWithEinpendler;
}

async function createCard() {
  const objWithEinpendler = await getPendlerData();
  rawCard.front.textTop = "Täglich pendeln";
  rawCard.front.textBottom = "Personen in die Stadt ein.";
  rawCard.front.value = objWithEinpendler[EINPENDLER];
  rawCard.front.background = "heilbronn/svg/auto.svg"
  return rawCard;
}

module.exports.createCard = createCard;
