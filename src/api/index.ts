import express from "express";

import files from "./routes/files";
import swagger from "./routes/swagger";

const app = express();

// Enable parsing of request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/files", files);

app.use("/api-docs", swagger);

app.use((_, res) => {
  res.status(404).json({
    error: "Not found",
  });
});

export default app;
