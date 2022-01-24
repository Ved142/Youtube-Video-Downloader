const express = require("express");
const request = require("request");
const cors = require("cors");
const fs = require("fs");
const ytdl = require("ytdl-core");
const { redirect } = require("express/lib/response");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  try {
    const url = String(req.body.link);
    const format = req.body.format;

    if (url.length == 0) {
      res.redirect('/');
    }

    if (format === "mp4") {
      res.header(
        "Content-Disposition",
        'attachment; filename="video.' + format + '"'
      );
      
      ytdl(url, {
        format: "mp4",
        filter: "audioandvideo",
        quality: 'highestvideo'

      }).pipe(res);
      
    } else if (format === "mp3") {
      res.header(
        "Content-Disposition",
        'attachment; filename="audio.' + format + '"'
      );
      ytdl(url, {
        filter: "audioonly",
        quality: "highestaudio"
      }).pipe(res);
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Success.");
});
