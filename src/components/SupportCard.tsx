import { useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Country {
  code: string;
  label: string;
  currency: string;
  symbol: string;
}

const COUNTRIES: Country[] = [
  { code: "NG", label: "Nigeria — NGN", currency: "NGN", symbol: "₦" },
  { code: "GH", label: "Ghana — GHS", currency: "GHS", symbol: "₵" },
  { code: "ZA", label: "South Africa — ZAR", currency: "ZAR", symbol: "R" },
  { code: "CM", label: "Cameroon — XAF", currency: "XAF", symbol: "FCFA" },
  { code: "KE", label: "Kenya — KES", currency: "KES", symbol: "KSh" },
  { code: "UG", label: "Uganda — UGX", currency: "UGX", symbol: "USh" },
  { code: "US", label: "United States — USD", currency: "USD", symbol: "$" },
  { code: "GB", label: "United Kingdom — GBP", currency: "GBP", symbol: "£" },
  { code: "CA", label: "Canada — CAD", currency: "CAD", symbol: "$" },
  { code: "TZ", label: "Tanzania — TZS", currency: "TZS", symbol: "TSh" },
];

const AMOUNTS = [5, 10, 25];

declare global {
  interface Window {
    FlutterwaveCheckout: (config: Record<string, unknown>) => void;
  }
}

export default function SupportCard() {
  const [countryCode, setCountryCode] = useState("NG");
  const [amount, setAmount] = useState(5);
  const [email, setEmail] = useState("");

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode)!,
    [countryCode]
  );

  const handleSupport = () => {
    if (!email.trim()) {
      alert("Please enter your email to continue.");
      return;
    }
    const publicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY;
    if (!publicKey) {
      alert("Payments aren't configured yet — missing VITE_FLUTTERWAVE_PUBLIC_KEY.");
      console.error("Missing VITE_FLUTTERWAVE_PUBLIC_KEY env var.");
      return;
    }
    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: "EMPIREMD-" + Date.now(),
      amount,
      currency: country.currency,
      country: country.code,
      payment_options: "card, banktransfer, mobilemoney, ussd",
      customer: { email: email.trim() },
      customizations: {
        title: "Support Empire MD",
        description: "Contribution to keep Empire MD running",
        logo: "",
      },
    });
  };

  return (
    <section className="relative py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-xl mx-auto text-center mb-12"
      >
        <p className="font-display text-xs tracking-[0.18em] uppercase text-wabot-green mb-4">
          Support the developer
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Keep Empire MD running
        </h2>
        <p className="body-text">
          Empire MD is built and maintained by one developer. If it's saving you time, a
          contribution — in your own currency — keeps servers online and new features coming.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="glass-card rounded-3xl p-8 max-w-md mx-auto shadow-xl"
      >
        <label className="block text-xs text-[#8e8e8e] mb-2" htmlFor="country">
          Your country
        </label>
        <select
          id="country"
          className="field mb-5"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>

        <label className="block text-xs text-[#8e8e8e] mb-2">Amount</label>
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                amount === a
                  ? "border-wabot-green text-wabot-green bg-wabot-green/5"
                  : "border-black/10 text-ink hover:border-black/25"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <label className="block text-xs text-[#8e8e8e] mb-2" htmlFor="email">
          Email (for your receipt)
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="field mb-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSupport}
          className="whatsapp-btn w-full !rounded-xl justify-center"
        >
          Support with {country.symbol}
          {amount}
        </button>
        <p className="text-center text-[11px] text-[#8e8e8e] mt-4">
          Secured by Flutterwave · Card, bank transfer &amp; mobile money accepted
        </p>
      </motion.div>
    </section>
  );
}
