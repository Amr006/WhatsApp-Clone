const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const rateLimit = require("express-rate-limit");


const ResetLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many password reset attempts, please try again later.",
  },
  keyGenerator: (req) => {
    // Use the first IP address from X-Forwarded-For header
    return req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
  },
});

const CreateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many registration attempts, please try again later.",
  },
  keyGenerator: (req) => {
    // Use the first IP address from X-Forwarded-For header
    return req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
  },
});

const LoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts, please try again later." }, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => {
    // Use the first IP address from X-Forwarded-For header
    return req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
  },
});

router.post("/register", authControllers.register);

router.get("/verify/:userId/:uniqueString", authControllers.verify);

router.post("/login",  authControllers.login);

router.post(
  "/ForgotPassword",
  
  authControllers.forgetPasswordRequest,
);

router.get(
  "/reset_password/:userId/:uniqueString",
  authControllers.forgetPasswordResponse,
);

router.put("/ResetPassword", authControllers.resetPassword);




module.exports = router;