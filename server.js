const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 10000;
const API_KEY = process.env.LUNA_API_KEY;

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : false
}));

app.use(express.json());

function authenticate(req, res, next) {
  const auth = req.headers.authorization || "";

  if (!API_KEY) {
    return res.status(500).json({
      error: "LUNA_API_KEY is not configured"
    });
  }

  if (auth !== `Bearer ${API_KEY}`) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  next();
}

app.get("/", (req, res) => {
  res.json({
    name: "Luna OpenClaw Backend",
    status: "running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    openclaw: "starting/running"
  });
});

app.get("/api/status", authenticate, (req, res) => {
  res.json({
    backend: "running",
    openclaw: "running"
  });
});

/*
 * Placeholder API endpoint.
 *
 * OpenClaw's exact gateway/API interface can differ by version.
 * Connect this endpoint to the actual OpenClaw gateway API
 * after checking the installed OpenClaw version.
 */
app.post("/api/chat", authenticate, async (req, res) => {
  const { message, conversationId } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "message is required"
    });
  }

  res.json({
    conversationId: conversationId || crypto.randomUUID(),
    message,
    status: "received"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[LUNA] API listening on port ${PORT}`);
});
