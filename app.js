console.log(`[SERVER STARTED] [${new Date()}]`);

// Require Dependencies
const express = require("express"),
  app = express(),
  cors = require("cors"),
  fetch = require("node-fetch");

// Use cors when in developmen
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

// API
app.get("/api/movie", async (req, res) => {
  if (!req.query.id || req.query.id.length < 0) {
    res.status(400).json({ Response: "False" });
    return;
  }

  // Perform search
  fetch(
    `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.query.id}`
  )
    .then(response => response.json())
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      res.status(500).json({
        Response: false,
        error: "API error"
      });
    });
});

app.get("/api/movies", async (req, res) => {
  if (!req.query.title || req.query.title.length < 0) {
    res.json({
      Search: [],
      totalResults: 0,
      Response: "False"
    });
    return;
  }

  // Perform search
  fetch(
    `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.title}&type=movie&y=${req.query.year}`
  )
    .then(response => response.json())
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      res.status(500).json({ Response: "False" });
    });
});

// Send SPA
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.get("*", (_req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}

// LISTEN
app.listen(process.env.PORT || 3000, () => {
  console.log(
    `[SERVER RUNNING] [PORT:${process.env.PORT || 3000}] [${new Date()}]`
  );
});
