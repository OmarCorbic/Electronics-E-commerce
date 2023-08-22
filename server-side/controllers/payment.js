const { BadRequestError, NotFoundError } = require("../errors");
const Product = require("../models/Product");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const createCheckoutSession = async (req, res) => {
  const { items } = req.body;

  if (!items) {
    throw BadRequestError("Nothing to pay for");
  }

  const formattedItems = await Promise.all(
    items.map(async (item) => {
      try {
        const product = await Product.findOne({ _id: item.id }).select(
          "name price"
        );

        if (!product) {
          throw new NotFoundError("Product not found");
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: item.quantity,
        };
      } catch (error) {
        console.log(error);
        return null;
      }
    })
  );
  const lineItems = formattedItems.filter((item) => item !== null);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: "http://127.0.0.1:5173",
    cancel_url: "http://127.0.0.1:5173",
  });

  res.json({ url: session.url });
};

module.exports = { createCheckoutSession };
