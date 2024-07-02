import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;
  res.send(`You submitted: ${cityName}`);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
