import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const crypto = require("crypto");

const SALT_ROUNDS = 12;

const users = [];
const SECRET_KEY = crypto.randomBytes(32).toString("hex");

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (users.some((user) => user.username === username)) {
    return res.status(409).json({ message: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ username: newUser.username });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(201).json({ token });
};

export const getProfile = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find((u) => u.username === decoded.username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const logout = (req, res) => {
  res.status(204).send();
};
