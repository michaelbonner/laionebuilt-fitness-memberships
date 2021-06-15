import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

const Plan = () => {
  const router = useRouter();
  const { sku } = router.query;

  useLayoutEffect(() => {
    const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    async function fetchStripeCheckoutSession() {
      let response = await (await fetch(`/api/product/${sku}`)).json();
      stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    }
    if (sku) {
      fetchStripeCheckoutSession();
    }
  }, [sku]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 transition duration-300 ease-in-out`}
    >
      <Script src="https://js.stripe.com/v3/" strategy="beforeInteractive" />
      <Head>
        <title>Laionebuilt Fitness Membership</title>
      </Head>

      <div className="w-full lg:w-2/3 my-4">Redirecting to checkout...</div>
    </div>
  );
};

export default Plan;
