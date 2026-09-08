import Hero from "./components/Hero";
import SupportCard from "./components/SupportCard";
import CreatorFooter from "./components/CreatorFooter";

export default function App() {
  return (
    <main className="min-h-screen bg-base">
      <Hero />
      <SupportCard />
      <CreatorFooter />
    </main>
  );
}
