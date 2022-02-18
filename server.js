const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const pool = require("./src/lib/db.js");
const {
  hashPassword,
  validateEmail,
  validatePassword,
  generateAccessToken,
} = require("./src/lib/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log(require("crypto").randomBytes(64).toString("hex"));
  res.json({
    message: "Welcome to the API.",
  });
});

// app.get("/dashboard", verifyToken, (req, res) => {
//   jwt.verify(req.token, "the_secret_key", (err) => {
//     if (err) {
//       res.sendStatus(401);
//     } else {
//       res.json({
//         events: events,
//       });
//     }
//   });
// });

app.post("/register", async (req, res) => {
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
    } else {
      const hashedPassword = await hashPassword(req.body.password);

      const user = {
        email: req.body.email,
        password: hashedPassword,
      };

      const sql = "INSERT INTO users (email, password) VALUES ($1, $2)";

      const sqlResult = await pool.query(sql, [user.email, user.password]);
      const token = generateAccessToken(user);

      res.json({ token, email: user.email });
    }

    // const data = JSON.stringify(user, null, 2);

    // var dbUserEmail = require("./db/user.json").email;
    // var errorsToSend = [];

    // if (dbUserEmail === user.email) {
    //   errorsToSend.push("An account with this email already exists.");
    // }
    // if (user.password.length < 5) {
    //   errorsToSend.push("Password too short.");
    // }
    // if (errorsToSend.length > 0) {
    //   res.status(400).json({ errors: errorsToSend });
    // } else {
    //   fs.writeFile("./db/user.json", data, (err) => {
    //     if (err) {
    //       console.log(err + data);
    //     } else {
    //       const token = jwt.sign({ user }, "the_secret_key");
    //       // In a production app, you'll want the secret key to be an environment variable
    //       res.json({
    //         token,
    //         email: user.email,
    //         name: user.name,
    //       });
    //     }
    //   });
    // }
  } else {
    res.sendStatus(400);
  }
});

app.post("/login", (req, res) => {
  const userDB = fs.readFileSync("./db/user.json");
  const userInfo = JSON.parse(userDB);
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    const token = jwt.sign({ userInfo }, "the_secret_key");
    // In a production app, you'll want the secret key to be an environment variable
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name,
    });
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
