import "dotenv/config";
import app from "./api";

const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.log(`API is running on port ${API_PORT}`);
});
