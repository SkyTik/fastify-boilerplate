import initApp from "./app.js";

const app = await initApp();

app.listen({ port: 8000 }, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // app.log.info(`Server listening at ${address}`);
});

// Graceful shutdown
const shutdown = () => {
  app.close(() => {
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
