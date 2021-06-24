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

const heilbronn = "heilbronn"
const hashtags = [heilbronn];

const interval = "10 seconds";

// Delete data older than this.
const history = "5 minutes";

// Called at the end of each time interval.
const intervalCb = function (err, results) {
  if (err) {
    console.error(err);
  } else {
    const value = Object.values(results).pop();

    if (value[heilbronn]) {
      sumBtc += value[heilbronn];
    }

    const cssQuery = ".twitter-element > div > span";

    const msg = {};
    msg.sumBtc = {
      value: sumBtc,
      query: cssQuery,
    };

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

app.get("/twitter/test/:value", (req, res, next) => {
  const { value } = req.params;
  console.log("INFO /twitter/test/%s", value);
  if (!value) {
    return res.status(400).send("No value provided");
  }

  try {
    sumBtc += Number.parseInt(value);    
  } catch (error) {
    console.error(error)
  }

  io.emit("twitter-new-tweet", { sum: sumBtc }); // This will emit the event to all connected sockets
  return res.send(200)
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
