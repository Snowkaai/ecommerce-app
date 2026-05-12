require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
app.use(cors());
app.use(express.json());


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {

  const cart = req.body.cart || [];

  const line_items = cart.map(item => ({
      price_data: {
      currency: 'usd',
      product_data: {
          name: item.title,
      },
      unit_amount: item.price * 100,
      },
      quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:4200/cart',
  });

  res.json({ url: session.url });
});



app.listen(4242, () => {
  console.log('Backend running on http://localhost:4242');
  console.log("My key is:", process.env.STRIPE_SECRET_KEY ? "Found!" : "Missing!");
});