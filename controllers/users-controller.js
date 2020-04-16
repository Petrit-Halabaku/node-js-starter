const uuid = require("uuid/v4");

const HttpError = require("../models/http-error");

/* ------------------------------- DUMMY USERS ------------------------------ */
let DUMMY_USERS = [
  {
    id: "u1",
    firstName: "Petrit ",
    lastName: "Halabaku",
    email: "petrit@gmail.com",
    password: "123456",
  },
  {
    id: "u2",
    firstName: "Erblin ",
    lastName: "Halabaku",
    email: "blin@gmail.com",
    password: "654321",
  },
  {
    id: "u3",
    firstName: "Natyrë ",
    lastName: "Halabaku",
    email: "natyre@gmail.com",
    password: "456123",
  },
];
/* -------------------------------- Get users -------------------------------- */

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

/* ---------------------------------- Login --------------------------------- */
const login = (req, res, next) => {
  const { email, password } = req.body;

  const indentifiedUser = DUMMY_USERS.find((user) => user.email === email);
  if (!indentifiedUser || indentifiedUser.password !== password) {
    throw new HttpError("Could not identify user", 401);
  }
  res.json({ message: "Logged in" });
};

/* --------------------------------- Logout --------------------------------- */
const signup = (req, res, nexr) => {
  const { firstName, lastName, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists", 422);
  }

  const createdUser = {
    id: uuid(),
    firstName,
    lastName,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

/* --------------------------------- EXPORTS -------------------------------- */

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
