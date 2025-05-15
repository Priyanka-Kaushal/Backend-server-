const path = require("path");
const morgan = require("morgan");
const winston = require("winston");
const { format } = winston;
const { combine, timestamp, json, colorize, printf } = format;

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log colors
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Add colors to winston
winston.addColors(colors);

// Set log level based on environment (development or production)
const level = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "development" ? "debug" : "warn"; // Use 'debug' in development, 'warn' otherwise
};

// Define log format
const logFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  colorize({ all: true }),
  printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
);

// Create the logger instance
const loggerInstance = winston.createLogger({
  format: logFormat,
  level: level(),
  levels,
  transports: [
    new winston.transports.Console({ level: "http" }),  // Log HTTP messages to console
    new winston.transports.File({
      filename: path.resolve(__dirname, "../logs/app-error.log"),
      level: "error",  // Only log errors to the file
      format: combine(timestamp(), json()),  // JSON format for the file logs
    }),
  ],
});

// Morgan middleware to log HTTP requests using Winston
const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => loggerInstance.http(message.trim()), // Log HTTP request messages at 'http' level
  },
});

// Export the loggerInstance and morganMiddleware for use in other parts of the application
module.exports = { logger: loggerInstance, morganMiddleware };
