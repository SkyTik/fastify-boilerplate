import initApp from "./app.js";

const app = await initApp();

app.listen({ port: app.config.PORT, host: "0.0.0.0" }, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening on port ${app.config.PORT}`);
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
