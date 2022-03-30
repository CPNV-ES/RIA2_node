import express from "express";

import swagger from "./routes/swagger";
import imageAnalysis from "./routes/image-analysis";

const app = express();

// Enable parsing of request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/image-analysis", imageAnalysis);

app.use("/api-docs", swagger);

app.use((_, res) => {
  res.status(404).json({
    error: "Not found",
  });
});

export default app;
