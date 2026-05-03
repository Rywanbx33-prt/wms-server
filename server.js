const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "stock.json";

/* INIT fichier si absent */
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "{}");
}

/* GET stock */
app.get("/stock", (req, res) => {
  const data = fs.readFileSync(FILE);
  res.json(JSON.parse(data));
});

/* SAVE stock */
app.post("/stock", (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
  res.json({ok:true});
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Serveur WMS lancé");
});

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "WMS server actif"
  });
});
