import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/convert", async (req, res) => {
  const amount = req.body.amount;
  const to = req.body.to;
  const from = req.body.from;
  try {
    const response = await axios.get(
      `https://api.currencylayer.com/live?access_key=a31f5de53720198c9c606a55ca1556b2&source=${from}&currencies=${to}
`
    );
    console.log(response.data);

    const rate = response.data.quotes[`${from}${to}`];
    const converted = (parseFloat(amount) * rate).toFixed(2);

    res.json({ converted, rate });
  } catch (error) {
    console.error("Error converting", error);
    res.status(500).send("Something went wrong.");
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
