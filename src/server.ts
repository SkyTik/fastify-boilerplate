import initApp from "./app.js";

const app = await initApp();

app.listen({ port: 8000, host: "0.0.0.0" }, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // app.log.info(`Server listening at ${address}`);
});

// handle Unhandled Rejection
process.on("unhandledRejection", (err) => {
  app.log.error(err);
  process.exit(1);
});

// handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  app.log.error(err);
  process.exit(1);
});

// Graceful shutdown
const shutdown = () => {
  app.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
