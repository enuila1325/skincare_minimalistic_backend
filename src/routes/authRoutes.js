import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Login simple (usuario fijo por ahora)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    return res.json({ token });
  }

  res.status(401).json({ message: "Credenciales inválidas" });
});

export default router;