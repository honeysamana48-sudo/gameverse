export const dynamic = "force-dynamic";
import Hero from "@/components/Hero";
import FeaturedGames from "@/components/FeaturedGames";
import DealsSection from "@/components/DealsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getGames } from "@/lib/getGames";

export default async function HomePage() {
  const games = await getGames();

  const dealGames = games.filter((game) => game.isDeal).slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedGames games={games} />
      <DealsSection games={dealGames} />
      <WhyChooseUs />
    </>
  );
}