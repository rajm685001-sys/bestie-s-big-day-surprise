import { useRef, useState } from "react";
import { motion } from "framer-motion";

const EmotionalCore = () => {
  const [photos, setPhotos] = useState<(string | null)[]>(Array(6).fill(null));
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotos((prev) => {
        const next = [...prev];
        next[index] = e.target?.result as string;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const emojis = ["🌅", "🤗", "😊", "📸", "💛", "🌈"];

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display text-primary mb-8">
            The Real Talk 💖
          </h2>

          {/* Photo collage with upload */}
          <div className="grid grid-cols-3 gap-3 mb-10 max-w-lg mx-auto">
            {emojis.map((emoji, i) => (
              <div key={i}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => { fileRefs.current[i] = el; }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(i, file);
                    e.target.value = "";
                  }}
                />
                <motion.div
                  className="aspect-square rounded-xl bg-muted border-2 border-dashed border-border flex items-center justify-center text-3xl cursor-pointer overflow-hidden relative group"
                  style={{ transform: `rotate(${(i % 3 - 1) * 3}deg)` }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  onClick={() => fileRefs.current[i]?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file?.type.startsWith("image/")) handleUpload(i, file);
                  }}
                >
                  {photos[i] ? (
                    <>
                      <img src={photos[i]!} alt="Memory" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm">📷</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span>{emoji}</span>
                      <span className="text-xs text-muted-foreground/50 mt-1">+</span>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            className="scrapbook-card max-w-xl mx-auto"
            style={{ transform: "rotate(0.5deg)" }}
            whileInView={{ rotate: 0 }}
          >
            <div className="tape-strip -top-3 left-8" />
            <div className="tape-strip -top-3 right-8" style={{ transform: "rotate(5deg)" }} />

            <p className="font-handwritten text-xl md:text-2xl leading-relaxed text-foreground">
              "Hey Manyuuuuuu, I just want you to know — you're not just my friend, you're my{" "}
              <span className="text-primary font-bold">favorite human</span>. 
              You make every day funnier, every problem smaller, and every adventure better.
              <br /><br />
              Thank you for being YOU. The world doesn't deserve you, but I'm so glad I get to 
              call you my best friend. Here's to a million more laughs, ugly selfies, and 
              late-night talks. 
              <br /><br />
              Love you to the moon and back 🌙💖"
            </p>

            <div className="mt-6 text-4xl animate-heartbeat inline-block">
              💕
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalCore;
