export default function CreatorFooter() {
  return (
    <footer className="border-t border-black/[0.06] py-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="body-text text-sm">
          Empire MD is built by <strong className="text-ink font-semibold">Mishael Yakubu</strong>{" "}
          (Coach Mishael) — CEO &amp; Founder of{" "}
          <strong className="text-ink font-semibold">Empire Digitals Worldwide</strong>, a software
          engineer and web developer based in Delta State, Nigeria. Follow more of his work at{" "}
          <a
            href="https://www.empirebot.space"
            rel="noopener"
            className="text-wabot-green font-medium hover:underline"
          >
            empirebot.space
          </a>
          .
        </p>
        <p className="text-[11px] text-[#8e8e8e] mt-5">
          © {new Date().getFullYear()} Empire Digitals Worldwide. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
