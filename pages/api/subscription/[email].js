import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

const createStripeCustomer = async (email) => {
  return await stripe.customers.create({
    email,
  });
};

const findCustomersByEmail = async (email) => {
  return await stripe.customers.list({ email });
};

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const returnObject = {
    success: true,
    data: [],
  };

  const {
    query: { email },
  } = req;

  try {
    // const customer = await createStripeCustomer(email);
    const customers = await findCustomersByEmail(email);
    let hasActiveSubscription = false;
    let activeSubscriptions;
    if (customers.data.length) {
      activeSubscriptions = customers.data.filter((customer) => {
        return !customer.delinquent && customer.subscriptions.total_count;
      });
      hasActiveSubscription = activeSubscriptions.length;
    } else {
      returnObject.success = false;
      returnObject.data = ["No customer found with that email"];
      res.end(JSON.stringify(returnObject));
      return;
    }

    if (!hasActiveSubscription) {
      returnObject.success = false;
      returnObject.data = ["No active subscriptions found with that email"];
      res.end(JSON.stringify(returnObject));
      return;
    }

    returnObject.data = activeSubscriptions;

    res.end(JSON.stringify(returnObject));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
};
