import { useState, useRef, useEffect } from "react";
import SuspenseIntro from "@/components/SuspenseIntro";
import HeroSection from "@/components/HeroSection";
import MemoriesCarousel from "@/components/MemoriesCarousel";
import Timeline from "@/components/Timeline";
import EmotionalCore from "@/components/EmotionalCore";
import GiftBox from "@/components/GiftBox";
import CakeCeremony from "@/components/CakeCeremony";
import BirthdayFooter from "@/components/BirthdayFooter";

const BIRTHDAY_MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  // Auto-play music after intro completes
  useEffect(() => {
    if (introComplete && !musicStarted) {
      const audio = new Audio(BIRTHDAY_MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.15;
      audioRef.current = audio;

      // Try auto-play, browsers may block without user gesture
      const tryPlay = () => {
        audio.play().then(() => {
          setMusicStarted(true);
          // Fade volume in
          let vol = 0;
          const fadeIn = setInterval(() => {
            vol += 0.01;
            if (vol >= 0.25) {
              audio.volume = 0.25;
              clearInterval(fadeIn);
            } else {
              audio.volume = vol;
            }
          }, 100);
        }).catch(() => {
          // If blocked, try on first user interaction
          const handler = () => {
            audio.play().then(() => {
              setMusicStarted(true);
              audio.volume = 0.25;
            }).catch(() => {});
            document.removeEventListener("click", handler);
            document.removeEventListener("touchstart", handler);
          };
          document.addEventListener("click", handler);
          document.addEventListener("touchstart", handler);
        });
      };
      tryPlay();

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, [introComplete, musicStarted]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {!introComplete && <SuspenseIntro onComplete={() => setIntroComplete(true)} />}

      {introComplete && (
        <>
          <HeroSection />
          <MemoriesCarousel />
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
