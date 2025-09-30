const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json()) ;

// API routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World",});
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log("Payment Intent >>> ", paymentIntent);

    res.status(201).json({clientSecret: paymentIntent.client_secret});
  }else{
    res.status(400).json({message: "Invalid amount"});
  }
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon Server is running on port: 5000, http://localhost:5000" );
});
