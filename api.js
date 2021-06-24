// Relative dependencies --------------------------------------------------------------------------
require("dotenv").config();
const express = require("express");
const HashtagCount = require("hashtag-count");

// Absolute dependencies --------------------------------------------------------------------------

const routes = require("./api/routes");

// Declarations -----------------------------------------------------------------------------------

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let sumBtc = 0;

const hc = new HashtagCount({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var hashtags = ["btc"];

var interval = "2 seconds";

// Delete data older than this.
var history = "5 minutes";

// Called at the end of each time interval.
var intervalCb = function (err, results) {
  if (err) {
    console.error(err);
  } else {
    const value = Object.values(results).pop();

    if (value.btc) {
      sumBtc += value.btc;
    }

    const cssQuery = ".twitter-element > div > span";

    const msg = {}
    msg.sumBtc = {
        value: sumBtc,
        query: cssQuery
    }

    io.emit("twitter-new-tweet", { sum: sumBtc, cssQuery }); // This will emit the event to all connected sockets
  }
};

// Open a connection to Twitter's Streaming API and start capturing tweets!
hc.start({
  hashtags: hashtags, // required
  interval: interval, // required
  history: history, // optional
  intervalCb: intervalCb, // optional
});

app.use(express.static("app"));
app.use("/api", routes);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
