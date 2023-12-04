const express = require("express");
const app = express();
require("dotenv").config();
const ip = "localhost";
const Port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// const path = require("path");
// var fs = require("fs");
// const morgan = require("morgan");
// const xss = require("xss-clean");
const multer = require("multer");
// const passport = require("passport");
const rateLimit = require("express-rate-limit");
// var hpp = require("hpp");
// const mongoSanitize = require("express-mongo-sanitize");


const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

//app.use(express.static("public"));
const corsOptions = {
  origin: [
    "http://localhost:3002",
    "http://localhost:3001",
    "http://localhost:4000",
    "http://127.0.0.1:5500",
    "https://testexpo-8zwi.onrender.com",
    "https://unpkg.com",
    // your origins here
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Hello World",
//       version: "1.0.0",
//       description: " A simple Express library api",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/api",
//       },
//     ],
//     //apis: ["./routes/*.js"]
//   },
//   apis: ["./documentation/*.js"], // files containing annotations as above
// };

// const openapiSpecification = swaggerJsDoc(options);
//for logging
// var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
//   flags: "a",
// });

// setup the logger

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { message: "Too much request" },
  keyGenerator: (req) => {
    // Use the first IP address from X-Forwarded-For header
    return req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
  },

  // store: ... , // Use an external store for more precise rate limiting
});

// Apply the rate limiting middleware to all requests
//app.use(limiter);
//app.use(morgan('combined', { stream: accessLogStream }))
// app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         connectSrc: [
//           "'self'",
//           "http://localhost:4000",
//           "http://127.0.0.1:5500",
//         ],
//       },
//     },
//   }),
// );
// app.use(xss());
app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use(hpp());
// app.use(
//   mongoSanitize({
//     allowDots: true,
//     replaceWith: '_',
//   }),
// );
// app.use(xss())
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     name: "session",
//     resave: false,
//     saveUninitialized: false,
//     maxAge: 24 * 60 * 60 * 100,
//   }),
// );
// app.use(passport.initialize());
// app.use(passport.session());
// const moment = require('moment');

// var date = moment('2013-03-01', 'YYYY-MM-DD')
// const currentDate = moment();
// const formattedDate = currentDate.format('LLLL');
// console.log(date.format('LLLL'))
// console.log(formattedDate)


app.get("/api", (req, res, next) => {
  // Imagine you're serving a secret treasure map to your users!
  const treasureMap = {
    message: "🗺️ Welcome to the Treasure Hunt API! 🏴‍☠️",
    clues: [
      "🌴 Follow the path of 'api/' to start the journey.",
      "🦜 Look out for the 'X marks the spot' at each endpoint!",
      "⚓ More treasures await as you navigate the API seas!",
    ],
    disclaimer: "Remember, only true adventurers can unlock the secrets...",
    documentation: "/api-docs",
  };

  res.status(200).json(treasureMap);
});


app.get("/amrtest" , (req,res,next) => {
  res.redirect('https://www.facebook.com');
}
)

// const CLIENT_ID = process.env.LINKEDIN_API_KEY ;
// const CLIENT_SECRET = process.env.LINKEDIN_SECRET_KEY;
// const REDIRECT_URI = "http://localhost:3000/auth/linkedin/callback";

// app.get('/auth/linkedin/callback', async (req, res) => {
//   const { code } = req.query;

//   // Exchange the authorization code for an access token
//   console.log("first axios")
//   try {
//     const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
//       params: {
//         grant_type: 'authorization_code',
//         code,
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//         redirect_uri: REDIRECT_URI,
//       },
//     });

//     const accessToken = response.data.access_token;
//     console.log("second  axios")
//     // Use the access token to fetch user data from LinkedIn
//     const userProfile = await axios.get('https://api.linkedin.com/v2/userinfo', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     // Now you have the user's LinkedIn profile data in `userProfile.data`
//     console.log(userProfile.data);

//     // You can store this data in your database or use it for authentication.
//     // Implement your logic here.

//     res.send('LinkedIn sign-in successful');
//   } catch (error) {
//     console.error('LinkedIn authentication error:', error);
//     res.status(500).send('LinkedIn sign-in failed');
//   }
// });

// app.use("/api" , userRoutes)
app.use("/api" , authRoutes)


// app.use(express.static(path.join(__dirname , '../frontend/dashboard/build')))
// app.get("*" , function (req,res) {
//   res.sendFile(path.join(__dirname, '../frontend/dashboard/build/index.html'))

// }
// )



app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.DB_CONN, {
  })
  .then((result) => {
    app.listen(Port, () => {
      console.log(`App listening at http://${ip}:${Port}/api`);
      console.log(
        "Database Connected : ",
        result.connection.host,
        result.connection.name,
      );
      let val = "Amr006";
    });
  })
  .catch((err) => {
    console.log(err);
  });

//last to catch any wrong url ( needs cool 404 page :) )