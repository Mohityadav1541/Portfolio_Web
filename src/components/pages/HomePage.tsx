import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import DevStatsSection from '@/components/sections/DevStatsSection';
import GitHubSection from '@/components/sections/GitHubSection';
import ContactSection from '@/components/sections/ContactSection';
import ThreeBackground from '@/components/effects/ThreeBackground';
import ScanlineEffect from '@/components/effects/ScanlineEffect';
import RobotGreeting from '@/components/effects/RobotGreeting';
import Cursor3D from '@/components/effects/Cursor3D';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* 3D background replaces old canvas particles */}
      <ThreeBackground />
      <ScanlineEffect />
      <RobotGreeting />
      <Cursor3D />

      <Header />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <DevStatsSection />
        <GitHubSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
