// Import express
const express = require("express");
const app = express();
const joi = require("joi");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressJWT = require("express-jwt");
const config = require("./config");
const connectDB = require('./db');
const createInitialUser = require('./scripts/initDb');

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use("", express.static("./public"));

// Custom response handler middleware
app.use((req, res, next) => {
  res.success = (data, message = "Success") => {
    res.status(200).json({
      data,
      message
    });
  };
  next();
});

// JWT Authentication
const excludedPaths = [/^\/api\/v1\/auth\//];
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: excludedPaths })
);

// Set port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and initialize test user
const init = async () => {
  await connectDB();
  await createInitialUser();
};

init().catch(console.error);

// Routes
const Router = require("./router/backend");

app.use("/api/v1", Router);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  // Validation errors (400 Bad Request)
  if (err instanceof joi.ValidationError) {
    return res.status(400).json({
      message: err.details[0].message
    });
  }

  // Authentication errors (401 Unauthorized)
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }

  // Authorization errors (403 Forbidden)
  if (err.name === "ForbiddenError") {
    return res.status(403).json({
      message: "Insufficient permissions"
    });
  }

  // Not Found errors (404)
  if (err.name === "NotFoundError") {
    return res.status(404).json({
      message: err.message || "Resource not found"
    });
  }

  // Handle other known errors with specific status codes
  if (err.status) {
    return res.status(err.status).json({
      message: err.message
    });
  }

  // Unknown errors (500 Internal Server Error)
  res.status(500).json({
    message: "Internal Server Error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export app
module.exports = app;
