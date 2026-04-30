import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import LatestUpdates from "../components/home/LatestUpdates";
import QuickLinks from "../components/home/QuickLinks";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <LatestUpdates />
      <QuickLinks />
    </div>
  );
}
