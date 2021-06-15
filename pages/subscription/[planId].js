import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

const Plan = () => {
  const router = useRouter();
  const { planId } = router.query;
  const [state, setState] = useState("initial");

  useLayoutEffect(() => {
    const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    async function fetchStripeCheckoutSession() {
      let response = await (await fetch(`/api/plan/${planId}`)).json();
      if (!response.data) {
        setState("error");
        return;
      }

      setState("loaded");
      stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    }
    if (planId) {
      fetchStripeCheckoutSession();
    }
  }, [planId]);

  if (state === "error") {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center px-4 transition duration-300 ease-in-out`}
      >
        <p>
          Subscription could not be found. Please{" "}
          <a
            className="underline"
            href="https://www.laionebuiltfitness.com/about-us-contact"
          >
            contact us
          </a>{" "}
          to let us know.
        </p>
        <p className="mt-4">
          <a className="underline text-xl" href="tel:+18014535055">
            801-453-5055
          </a>
        </p>
        <div className="flex space-x-2 mt-8">
          <a
            className="py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-400 shadow-md text-white transition-all"
            href="https://www.laionebuiltfitness.com/about-us-contact"
          >
            Contact us
          </a>
          <button
            className="py-2 px-4 rounded-md bg-black hover:bg-gray-800 shadow-md text-white transition-all"
            onClick={() => window.history.back()}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }
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
