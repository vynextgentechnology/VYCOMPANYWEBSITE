import { Navigation } from "@/components/Navigation";
import { HeroScrollAnimation } from "@/components/HeroScrollAnimation";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Dynamic Nav */}
      <Navigation />

      {/* 3D Golden Robot Animation Section with Ending Pop-Out CTA */}
      <HeroScrollAnimation />
    </div>
  );
}
