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

  const numbers = data.match(/\d\d.\d\d\d/gm);
  console.log({ numbers });

  const objWithEinpendler = getEinpendler(data);
  console.log({ objWithEinpendler });

  fs.writeFileSync(`${__dirname}\data.csv`, data);

  return objWithEinpendler;
}

async function getPendlerData() {
  const { data } = await axios.get(URL_PENDLER);
  if (!data) {
    throw new Error("Failed to fetch Pendler data");
  }
  console.log(data);

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

  console.log({ resources });
  const objWithEinpendler = await getCsvData(resources[0].url);

  return objWithEinpendler;
}

async function createCard() {
  const objWithEinpendler = await getPendlerData();
  rawCard.front.textTop = "Leni loves JavaScript";
  rawCard.front.textBottom = "yay!";
  rawCard.front.value = objWithEinpendler[EINPENDLER];
  return rawCard;
}

module.exports.createCard = createCard;
