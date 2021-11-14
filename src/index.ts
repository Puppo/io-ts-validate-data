import express from "express";
import registerRoutes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

registerRoutes(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
