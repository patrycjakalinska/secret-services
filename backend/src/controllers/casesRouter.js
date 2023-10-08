const express = require("express");
const casesRouter = express.Router();
const Case = require("../models/case");
const User = require("../models/user");
const verifyToken = require("../utils/auth");
const user = require("../models/user");

casesRouter.get("/", async (req, res) => {
  const cases = await Case.find({});
  res.render("", { cases });
});

casesRouter.post("/", verifyToken, async (req, res) => {
  const cas = new Case(req.body);
  console.log(req.user.userId);
  //const user = await User.findById(req.user.userId);
  //cas.photos = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  user.cases.push(cas);
  await user.save();
  const savedCase = await cas.save();
  return res.status(200).json({ savedCase });
  //res.redirect(`/${cas._id}`);
});

casesRouter.get("/:id", verifyToken, async (req, sres) => {
  const cas = await Case.findById(req.params.id);
  //const user = await User.findById(req.user.userId);
  if (user.cases.includes(cas._id)) {
    res.render("", { cas });
  } else {
    return res.status().json();
  }
});

module.exports = casesRouter;
