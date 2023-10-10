const express = require("express");
const casesRouter = express.Router();
const Case = require("../models/case");
const User = require("../models/user");
const verifyToken = require("../utils/auth");

casesRouter.get("/", async (req, res) => {
  const casesForUser = await Case.find({});
  res.status(200).json({ casesForUser });
});

casesRouter.post("/", verifyToken, async (req, res) => {
  const cas = new Case(req.body);
  const user = await User.findById(req.user.userId);
  //cas.photos = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  user.cases.push(cas);
  await user.save();
  const savedCaseForUser = await cas.save();
  return res.status(200).json({ savedCaseForUser });
});

casesRouter.get("/:id", verifyToken, async (req, res) => {
  const caseForUser = await Case.findById(req.params.id);
  const user = await User.findById(req.user.userId);
  if (user.cases.includes(caseForUser._id)) {
    res.status(200).json({ caseForUser });
  } else {
    res.status(401).json({ message: "Access denied" });
  }
});

module.exports = casesRouter;
