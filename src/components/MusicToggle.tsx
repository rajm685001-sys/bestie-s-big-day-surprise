import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BIRTHDAY_MUSIC_URL = "/happy-birthday.mp3";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(BIRTHDAY_MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    // Try autoplay
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay blocked — wait for first user gesture
        const handler = () => {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
          document.removeEventListener("click", handler);
          document.removeEventListener("touchstart", handler);
        };
        document.addEventListener("click", handler);
        document.addEventListener("touchstart", handler);
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg text-xl"
      whileTap={{ scale: 0.85 }}
      animate={isPlaying ? { rotate: [0, 10, -10, 0] } : {}}
      transition={isPlaying ? { repeat: Infinity, duration: 1 } : {}}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? "🎵" : "🔇"}
    </motion.button>
  );
};

export default MusicToggle;
