import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const createSession = async (price) => {
  return await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: "https://www.laionebuiltfitness.com/success",
    cancel_url: "https://www.laionebuiltfitness.com/",
    payment_method_types: ["card"],
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
  });
};

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const returnObject = {
    success: true,
    data: [],
  };

  const {
    query: { sku },
  } = req;

  try {
    returnObject.data = await createSession(sku);
    return res.end(JSON.stringify(returnObject));
  } catch (error) {
    return res.end(JSON.stringify(error));
  }
};
