import { useState } from "react";
import SuspenseIntro from "@/components/SuspenseIntro";
import HeroSection from "@/components/HeroSection";

import Timeline from "@/components/Timeline";
import EmotionalCore from "@/components/EmotionalCore";
import GiftBox from "@/components/GiftBox";
import CakeCeremony from "@/components/CakeCeremony";
import BirthdayFooter from "@/components/BirthdayFooter";
import SparkleTrail from "@/components/SparkleTrail";
import MusicToggle from "@/components/MusicToggle";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SparkleTrail />

      {!introComplete && <SuspenseIntro onComplete={() => setIntroComplete(true)} />}

      {introComplete && (
        <>
          <MusicToggle />
          <HeroSection />
          
          <Timeline />
          <EmotionalCore />
          <GiftBox />
          <CakeCeremony />
          <BirthdayFooter />
        </>
      )}
    </div>
  );
};

export default Index;
