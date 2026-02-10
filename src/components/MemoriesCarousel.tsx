import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memories = [
  {
    title: "That Time We...",
    description: "...got lost in the mall and ended up in the pet store for 2 hours 🐹",
    emoji: "🤣",
    rotation: -2,
  },
  {
    title: "The Great Food Fight",
    description: "When you accidentally launched spaghetti at my face. ICONIC. 🍝",
    emoji: "😂",
    rotation: 1,
  },
  {
    title: "Sleepover Legends",
    description: "3AM dance parties, terrible karaoke, zero regrets 💃",
    emoji: "🎤",
    rotation: -1,
  },
  {
    title: "Our Secret Language",
    description: "Nobody understands us and that's the best part 😜",
    emoji: "🤫",
    rotation: 2,
  },
  {
    title: "The Matching Outfits Era",
    description: "Twinning is winning, bestie! We ATE. 👯",
    emoji: "✨",
    rotation: -3,
  },
];

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
    <section className="py-20 px-4 bg-secondary/30">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-display text-center text-primary mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Funniest Memories 😆
        </motion.h2>
        <p className="text-center font-handwritten text-xl text-muted-foreground mb-12">
          Drop your photos onto the cards! 📸
        </p>

        <div className="relative flex items-center justify-center min-h-[320px]">
          <button
            onClick={prev}
            className="absolute left-0 z-10 text-4xl hover:scale-125 transition-transform"
          >
            ←
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="scrapbook-card max-w-md mx-auto text-center relative"
              style={{ transform: `rotate(${memories[current].rotation}deg)` }}
              initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.4 }}
            >
              <div className="tape-strip -top-3 left-1/2 -translate-x-1/2" />

              {/* Photo area - droppable */}
              <div
                className="w-full h-48 rounded-lg bg-muted flex items-center justify-center mb-4 border-2 border-dashed border-border cursor-pointer overflow-hidden relative group"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {photos[current] ? (
                  <>
                    <img src={photos[current]!} alt="Memory" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-handwritten text-lg">
                        Change photo 📷
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <span className="text-6xl">{memories[current].emoji}</span>
                    <p className="text-sm text-muted-foreground/60 mt-2 font-body">
                      📸 Click or drag a photo here
                    </p>
                  </div>
                )}
              </div>

              <h3 className="font-display text-2xl text-primary mb-2">
                {memories[current].title}
              </h3>
              <p className="font-handwritten text-lg text-muted-foreground">
                {memories[current].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={next}
            className="absolute right-0 z-10 text-4xl hover:scale-125 transition-transform"
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {memories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-primary scale-125" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoriesCarousel;
