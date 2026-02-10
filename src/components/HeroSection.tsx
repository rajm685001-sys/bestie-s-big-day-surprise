import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {["🎈", "🎀", "⭐", "🦄", "🌸", "💖", "🎁", "🍰"].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-3xl md:text-4xl animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <motion.div
        className="text-center z-10 max-w-3xl"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 80, duration: 0.8 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        >
          🎂
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-primary leading-tight mb-4">
          HAPPY BIRTHDAY,
          <br />
          <span className="inline-block animate-wiggle">BESTIE!</span> 🎉
        </h1>

        <p className="font-handwritten text-2xl md:text-3xl text-muted-foreground mt-4">
          February 13th • The day the world got{" "}
          <span className="text-primary font-bold">✨ way cooler ✨</span>
        </p>

        <motion.div
          className="mt-8 text-5xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          😜
        </motion.div>

        <motion.p
          className="mt-10 font-handwritten text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Keep scrolling for the GRAND CAKE SURPRISE 🎂🔥
          <br />
          <span className="text-3xl animate-bounce-soft inline-block mt-2">👇</span>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
