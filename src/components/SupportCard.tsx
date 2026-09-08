import { useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Country {
  code: string;
  label: string;
  currency: string;
  symbol: string;
  amounts: number[];
}

const COUNTRIES: Country[] = [
  { code: "NG", label: "Nigeria — NGN", currency: "NGN", symbol: "₦", amounts: [500, 1000, 2000, 5000, 10000] },
  { code: "GH", label: "Ghana — GHS", currency: "GHS", symbol: "₵", amounts: [20, 50, 100, 200, 500] },
  { code: "ZA", label: "South Africa — ZAR", currency: "ZAR", symbol: "R", amounts: [50, 100, 250, 500, 1000] },
  { code: "CM", label: "Cameroon — XAF", currency: "XAF", symbol: "FCFA", amounts: [1000, 2500, 5000, 10000, 20000] },
  { code: "KE", label: "Kenya — KES", currency: "KES", symbol: "KSh", amounts: [200, 500, 1000, 2500, 5000] },
  { code: "UG", label: "Uganda — UGX", currency: "UGX", symbol: "USh", amounts: [5000, 10000, 25000, 50000, 100000] },
  { code: "US", label: "United States — USD", currency: "USD", symbol: "$", amounts: [5, 10, 25, 50, 100] },
  { code: "GB", label: "United Kingdom — GBP", currency: "GBP", symbol: "£", amounts: [5, 10, 20, 50, 100] },
  { code: "CA", label: "Canada — CAD", currency: "CAD", symbol: "$", amounts: [5, 10, 25, 50, 100] },
  { code: "TZ", label: "Tanzania — TZS", currency: "TZS", symbol: "TSh", amounts: [5000, 10000, 25000, 50000, 100000] },
];

declare global {
  interface Window {
    FlutterwaveCheckout: (config: Record<string, unknown>) => void;
  }
}

export default function SupportCard() {
  const [countryCode, setCountryCode] = useState("NG");
  const [amount, setAmount] = useState<number>(500);
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [email, setEmail] = useState("");

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode)!,
    [countryCode]
  );

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    const next = COUNTRIES.find((c) => c.code === code)!;
    setIsCustom(false);
    setCustomValue("");
    setAmount(next.amounts[0]);
  };

  const pickPreset = (a: number) => {
    setIsCustom(false);
    setAmount(a);
  };

  const pickCustom = () => {
    setIsCustom(true);
  };

  const effectiveAmount = isCustom ? Number(customValue) || 0 : amount;

  const handleSupport = () => {
    if (!email.trim()) {
      alert("Please enter your email to continue.");
      return;
    }
    if (isCustom && effectiveAmount <= 0) {
      alert("Please enter a valid custom amount.");
      return;
    }
    const publicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY;
    if (!publicKey) {
      alert("Payments aren't configured yet — missing VITE_FLUTTERWAVE_PUBLIC_KEY.");
      console.error("Missing VITE_FLUTTERWAVE_PUBLIC_KEY env var.");
      return;
    }
    window.FlutterwaveCheckout({
      public_key: publicKey,
      tx_ref: "EMPIREMD-" + Date.now(),
      amount: effectiveAmount,
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
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>

        <label className="block text-xs text-[#8e8e8e] mb-2">Amount</label>
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          {country.amounts.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => pickPreset(a)}
              className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                !isCustom && amount === a
                  ? "border-wabot-green text-wabot-green bg-wabot-green/5"
                  : "border-black/10 text-ink hover:border-black/25"
              }`}
            >
              {country.symbol}
              {a.toLocaleString()}
            </button>
          ))}
          <button
            type="button"
            onClick={pickCustom}
            className={`py-3 rounded-xl text-sm font-medium border transition-all ${
              isCustom
                ? "border-wabot-green text-wabot-green bg-wabot-green/5"
                : "border-black/10 text-ink hover:border-black/25"
            }`}
          >
            Custom
          </button>
        </div>

        {isCustom && (
          <input
            type="number"
            min={1}
            inputMode="numeric"
            placeholder={`Enter amount in ${country.currency}`}
            className="field mb-5"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            autoFocus
          />
        )}

        <label className="block text-xs text-[#8e8e8e] mb-2 mt-2" htmlFor="email">
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
          {effectiveAmount ? effectiveAmount.toLocaleString() : "0"}
        </button>
        <p className="text-center text-[11px] text-[#8e8e8e] mt-4">
          Secured by Flutterwave · Card, bank transfer &amp; mobile money accepted
        </p>
      </motion.div>
    </section>
  );
}
