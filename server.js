const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");

require("dotenv").config();

const pool = require("./src/lib/db.js");
const {
  hashPassword,
  validateEmail,
  validatePassword,
  generateAccessToken,
  verifyPassword,
} = require("./src/lib/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  // console.log(require("crypto").randomBytes(64).toString("hex"));
  res.json({
    message: "Welcome to the API.",
  });
});

app.get("/api/decks", verifyToken, async (req, res) => {
  console.log("*********---- -- CALLING /api/decks -------- *******");
  let tokenVerified = false;
  jwt.verify(req.token, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      tokenVerified = true;
    }
  });
  if (tokenVerified) {
    const sql1 =
      "SELECT decks.id, name, " +
      "COUNT(*) FILTER (WHERE cards.due_date < now()) AS cards_to_study " +
      "FROM users " +
      "INNER JOIN decks ON users.id = decks.user_id " +
      "LEFT JOIN cards ON users.id = cards.user_id " +
      "AND cards.deck_id = decks.id " +
      "WHERE users.id = $1 " +
      "GROUP BY decks.id, name";

    const result = await pool.query(sql1, [req.query.id]);

    const decks = result.rows.map((deck) => {
      return {
        id: deck.id,
        name: deck.name,
        cardsToStudy: +deck.cards_to_study,
      };
    });
    res.json({ decks });
  }
});

app.post("/api/decks", async (req, res) => {
  if (req.body) {
    const deckName = req.body.deckName;
    const userId = req.body.userId;
    const errorsToSend = [];

    if (deckName.length < 2 || deckName.length > 15) {
      errorsToSend.push("Invalid deck name");
    }

    if (errorsToSend.length !== 0) {
      console.log(errorsToSend);
      res.status(422).json({ error: errorsToSend });
    } else {
      const sql =
        "INSERT INTO decks (name, user_id) VALUES ($1, $2) RETURNING id";
      const result = await pool.query(sql, [deckName, userId]);

      const newDeck = {
        id: result.rows[0].id,
        name: deckName,
        cardsToStudy: 0,
      };

      res.json(newDeck);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/api/register", async (req, res) => {
  if (req.body) {
    const email = req.body.email;
    const password = req.body.password;
    const errorsToSend = [];

    if (!validateEmail(email)) {
      errorsToSend.push("Invalid email");
      // res.status(422).json({ error: "invalid email format" });
    }

    if (!validatePassword(password)) {
      errorsToSend.push("Password's too simple.");
      // res.status(422).json({ error: "Password's too simple." });
    }

    const uniqueEmailSql = "SELECT email FROM users WHERE email = $1";
    const uniqueEmail = await pool.query(uniqueEmailSql, [email]);

    if (uniqueEmail.rowCount === 1) {
      errorsToSend.push("Email already exists.");
      // res.status(422).json({ error: "Email already exists." });
    }

    if (errorsToSend.length !== 0) {
      console.log(errorsToSend);
      res.status(422).json({ error: errorsToSend });

      // await pool.end();
    } else {
      const hashedPassword = await hashPassword(req.body.password);

      const user = {
        email: req.body.email,
        password: hashedPassword,
      };

      const sql =
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";

      const sqlResult = await pool.query(sql, [user.email, user.password]);
      const id = sqlResult.rows[0].id;
      const token = generateAccessToken(user);

      res.json({ token, id, email: user.email });
      // await pool.end();
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/api/login", async (req, res) => {
  console.log("*********---- -- CALLING /api/login -------- *******");
  if (req.body) {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;
    const errorsToSend = [];

    const findUserSQL =
      "SELECT id, email, password FROM users WHERE email = $1";
    const findUserResult = await pool.query(findUserSQL, [enteredEmail]);

    const password = findUserResult.rows[0].password;
    const id = findUserResult.rows[0].id;

    const isValidPassword = await verifyPassword(enteredPassword, password);

    if (!isValidPassword) {
      errorsToSend.push("Password is invalid");
      console.log("password is WRONG");

      res.status(422).json({ error: errorsToSend });
      // await pool.end();
    } else {
      console.log("password is correct");

      const token = generateAccessToken({
        email: enteredEmail,
        password: enteredPassword,
      });

      res.json({ token, id, email: enteredEmail });
      // await pool.end();
    }
  } else {
    res.status(401).json({ error: "Invalid login. Please try again." });
  }
});

// MIDDLEWARE
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
