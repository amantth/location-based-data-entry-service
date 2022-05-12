const { Router } = require("express");
const jwt = require("jsonwebtoken");

const router = Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ");
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post("/", authenticateToken, async (req, res, next) => {
  //   try {
  //     const entries = await LogEntry.find();
  //     res.json(entries);
  //   } catch (error) {
  //     next(error);
  //   }
  //  get the user from the req.body

  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });

  // if they got authenticated
  // then use their email/username to search
  // them from the database and give them the data
  // the must possess.
  // database.filter("usernme/email")
  // then send the markers nd related data to them
  // change the api file so it gets authenticated.
  // this means we need to add the auth middleware
  // to some pages
});

module.exports = router;
