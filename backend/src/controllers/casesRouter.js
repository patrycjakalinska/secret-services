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
  //   console.log(req.mail);
  //   console.log(req.decoded);
  //   console.log(req.user);
  //   console.log(req.user._id);
  //   console.log(user._id);
  //const authHeader = req.headers["authorization"];
  //console.log(authHeader);
  //const user = await User.find({});
  //console.log(req.user);
  //console.log(cas);
  //cas.photos = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  //user.cases.push(cas);
  //const savedCase = await cas.save();
  //return res.status(200).json({ savedCase });
  // await user.save();
  // res.redirect(`/${cas._id}`);
});

casesRouter.get("/:id", verifyToken, async (req, res) => {
  const cas = await Case.findById(req.params.id);
  //const user = await User.find({});
  if (user.cases.includes(cas._id)) {
    res.render("", { cas });
  } else {
    return res.status().json();
  }
});

module.exports = casesRouter;
