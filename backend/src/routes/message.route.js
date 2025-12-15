import express from "express";

const router = express.Router();

router.get("/logout", (req, res) => {
  res.send("logout ");
});

router.get("/inbox", (req, res) => {
  res.send("Hello");
});

export default router;
