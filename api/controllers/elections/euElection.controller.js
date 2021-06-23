// Relative dependencies --------------------------------------------------------------------------

const axios = require("axios");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");

// Absolute dependencies --------------------------------------------------------------------------

const rawCard = require("../../constants/card.json");

// Declarations -----------------------------------------------------------------------------------

const URL =
  "https://opendata.heilbronn.de/api/3/action/package_show?id=295cf14f-ab80-4ee5-b193-d90f86a3b2d3";

/**
 * Used to access data from the unstructured .csv provided by Heilbronn.
 */

const VALUE = "W�hler";

// Functions --------------------------------------------------------------------------------------

function getValue(csvData) {
  const records = parse(csvData, {
    columns: true,
    delimiter: ";",
    from_line: 1,
    skip_lines_with_error: true,
    skip_empty_lines: true,
  });
  return records[0];
}

async function getCsvData(resourceUrl) {
  const { data } = await axios.get(resourceUrl);

  if (!data) {
    throw new Error("Failed to fetch csv data");
  }

  const objWithValue = getValue(data);

  // This is used to inspect rawCsvData and fiddle with https://csv.js.org/convert/
  fs.writeFileSync(`${__dirname}/data.csv`, data);

  return objWithValue;
}

async function getAndParseData() {
  const { data } = await axios.get(URL);
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

  const objWithValue = await getCsvData(resources[0].url);

  return objWithValue;
}

async function createCard() {
  const objWithValue = await getAndParseData();
  rawCard.portal.url = "https://opendata.heilbronn.de/dataset/europawahl-2019";
  rawCard.back.text = "Alle Daten zur Europawahl sind im OpenData Portal Heilbronn.";
  rawCard.front.textTop = "Bei der Europawahl haben";
  rawCard.front.textBottom = "Personen teilgenommen.";
  rawCard.front.value = objWithValue[VALUE];
  rawCard.front.background = "heilbronn/Svg´s/europa-neu.svg"
  return rawCard;
}

module.exports.createCard = createCard;
