import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memories = [
{
  title: "The Corridor Chronicles",
  description: "Sitting on cold floors, sharing snacks & dreams — those were the REAL lectures 📚💜",
  emoji: "🤗",
  rotation: -2
},
{
  title: "Squad Outings = Chaos",
  description: "That Domino's trip where we took 47 selfies before even ordering 🍕📸",
  emoji: "😂",
  rotation: 1
},
{
  title: "The 'Just 5 More Minutes' Era",
  description: "Every call that was supposed to be 5 mins but lasted 2 hours 🤭💕",
  emoji: "📞",
  rotation: -1
},
{
  title: "Our Secret Language",
  description: "One look and we both know what the other is thinking. Telepathy unlocked 🧠✨",
  emoji: "🤫",
  rotation: 2
},
{
  title: "The 'I Got You' Moments",
  description: "Every time life got heavy, you showed up. No questions asked. That's real 🥹💖",
  emoji: "🫂",
  rotation: -3
}];


const MemoriesCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [photos, setPhotos] = useState<(string | null)[]>(Array(memories.length).fill(null));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const next = () => setCurrent((c) => (c + 1) % memories.length);
  const prev = () => setCurrent((c) => (c - 1 + memories.length) % memories.length);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotos((prev) => {
        const next = [...prev];
        next[current] = ev.target?.result as string;
        return next;
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotos((prev) => {
        const next = [...prev];
        next[current] = ev.target?.result as string;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-display text-center text-primary mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Moments That Made Us 'Us' 🥹✨
        </motion.h2>

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="scrapbook-card mx-auto max-w-md cursor-pointer"
              style={{ transform: `rotate(${memories[current].rotation}deg)` }}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: memories[current].rotation }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ duration: 0.4 }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="tape-strip -top-3 left-6" />
              <div className="tape-strip -top-3 right-6" style={{ transform: "rotate(5deg)" }} />

              {photos[current] ? (
                <img
                  src={photos[current]!}
                  alt={memories[current].title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center text-5xl border-2 border-dashed border-border">
                  {memories[current].emoji}
                </div>
              )}

              <h3 className="font-display text-2xl text-primary mb-2">
                {memories[current].title}
              </h3>
              <p className="font-handwritten text-lg text-foreground">
                {memories[current].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center text-xl transition-colors"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {memories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center text-xl transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );

};

export default MemoriesCarousel;