const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB = "data.json";

/* ================= STOCK ================= */
app.get("/stock", (req,res)=>{
  const data = JSON.parse(fs.readFileSync(DB));
  res.json(data.stock || {});
});

app.post("/stock", (req,res)=>{
  const data = JSON.parse(fs.readFileSync(DB));
  data.stock = req.body;
  fs.writeFileSync(DB, JSON.stringify(data,null,2));
  res.json({ok:true});
});

/* ================= QUAI ================= */
app.get("/quai", (req,res)=>{
  const data = JSON.parse(fs.readFileSync(DB));
  res.json(data.quai || []);
});

app.post("/quai", (req,res)=>{
  const data = JSON.parse(fs.readFileSync(DB));
  data.quai.push(req.body);
  fs.writeFileSync(DB, JSON.stringify(data,null,2));
  res.json({ok:true});
});

/* ================= RESTOCK ================= */
app.post("/restock", (req,res)=>{
  const data = JSON.parse(fs.readFileSync(DB));
  data.restock.push(req.body);
  fs.writeFileSync(DB, JSON.stringify(data,null,2));
  res.json({ok:true});
});

/* ================= ERRORS ================= */
app.post("/error", (req,res)=>{
  const data = JSON.parse(fs.readFileSync(DB));
  data.errors.push(req.body);
  fs.writeFileSync(DB, JSON.stringify(data,null,2));
  res.json({ok:true});
});

app.listen(3000, ()=>{
  console.log("WMS server running");
});
