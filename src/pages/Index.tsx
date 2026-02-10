import { useState } from "react";
import SuspenseIntro from "@/components/SuspenseIntro";
import HeroSection from "@/components/HeroSection";
import MemoriesCarousel from "@/components/MemoriesCarousel";
import Timeline from "@/components/Timeline";
import EmotionalCore from "@/components/EmotionalCore";
import CakeCeremony from "@/components/CakeCeremony";
import BirthdayFooter from "@/components/BirthdayFooter";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {!introComplete && <SuspenseIntro onComplete={() => setIntroComplete(true)} />}

      {introComplete && (
        <>
          <HeroSection />
          <MemoriesCarousel />
          <Timeline />
          <EmotionalCore />
          <CakeCeremony />
          <BirthdayFooter />
        </>
      )}
    </div>
  );
};

export default Index;
