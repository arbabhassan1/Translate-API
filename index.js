import express from "express";

const app = express();

app.get("/translate", async (req, res) => {
  res.json({
    message: "OK",
  });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "API route not found" });
});

const PORT_NO = 8686;
app.listen(PORT_NO, () => {
  console.log("Server is Live on\n http://localhost:" + PORT_NO);
});
