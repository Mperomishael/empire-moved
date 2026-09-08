# Empire MD — Moved Page

A professional "We have moved" landing page for Empire MD, built with
**Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion**, styled to match the
Empire MD frontend design system (`#EDEEF5` base, `#9fff00` / `#00A884` greens,
Inter + Outfit typography).

Includes a floating robot mascot, an abstract animated hologram card,
and a Flutterwave-powered support-the-developer section.

## Quick start

```bash
npm install
npm run dev
```

## Before deploying

1. Replace the Flutterwave public key in `src/components/SupportCard.tsx`
   (`FLWPUBK_TEST-REPLACE_WITH_YOUR_KEY-X`) with your live key.
2. Ensure `public/robot-mascot.png` and `public/hero-bg.jpg` exist
   (copied from the main Empire MD repo).

## Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
└── components/
    ├── Hero.tsx           # mascot + hologram card + headline
    ├── SupportCard.tsx    # Flutterwave support section
    └── CreatorFooter.tsx  # creator bio footer
```
