import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center">
      {/* subtle hero backdrop from the repo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-base/70 via-base/40 to-base pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-16 lg:px-20 pt-28 pb-20">
        {/* ========== ABSTRACT HOLOGRAM CARD (blended behind content) ========== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="holo-card animate-floating rounded-[2.5rem] px-6 py-12 md:px-14 md:py-16 lg:px-20 lg:py-20"
        >
          <div className="grid lg:grid-cols-[1fr_auto] items-center gap-10 lg:gap-16">
            {/* ---- Text column ---- */}
            <div className="max-w-2xl">
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.5 }}
                className="font-display text-xs md:text-sm tracking-[0.18em] uppercase text-[#8e8e8e] mb-6"
              >
                Empire MD <span className="text-wabot-green">·</span> WhatsApp Bot Platform
              </motion.p>

              <motion.h1
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-xl mb-6"
              >
                We have{" "}
                <span className="text-gradient-green italic">moved  </span>
                <span className="inline-flex items-center justify-center w-[22px] md:w-[42px] h-[22px] md:h-[42px] border-2 border-ink rounded-full mx-2 align-middle">
                  <span className="w-2 h-2 bg-wabot-green rounded-full animate-pulse" />
                </span>
              </motion.h1>

              {/* Readable sub-copy */}
              <motion.p
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="body-text text-base md:text-lg max-w-lg mb-4"
              >
                Get a <strong className="text-ink font-semibold">WhatsApp bot in seconds</strong> — Empire MD
                now lives at its new home, with a faster dashboard, instant pairing, and the same
                zero-code setup.
              </motion.p>

              <motion.p
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-xs text-[#8e8e8e] mb-10"
              >
                Formerly{" "}
                <span className="line-through opacity-70">
                  empiredigitals.space/empire-md
                </span>
              </motion.p>

              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.empirebot.space"
                  rel="noopener"
                  className="whatsapp-btn"
                >
                  Go to the new site
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M11 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
                <span className="text-xs text-[#8e8e8e]">
                  Same bot. New address. Nothing to reinstall.
                </span>
              </motion.div>
            </div>

            {/* ---- Robot mascot column ---- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 90 }}
              className="relative w-40 md:w-56 lg:w-72 mx-auto lg:mx-0 animate-floating-delayed"
            >
              {/* soft green aura behind mascot */}
              <div className="absolute inset-0 -m-8 rounded-full bg-wabot-green/15 blur-3xl" />
              <img
                src="/robot-mascot.png"
                alt="Empire MD Bot Mascot"
                className="relative w-full h-auto drop-shadow-[0_20px_40px_rgba(0,168,132,0.3)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* bottom-left brand stamp — matches repo hero */}
      <div className="absolute bottom-6 left-8 md:left-12 font-mono text-[10px] text-brand-gray tracking-[0.2em] uppercase opacity-60 z-10">
        © {new Date().getFullYear()} Empire Digitals
      </div>
    </section>
  );
}
