import { motion } from "framer-motion";

const milestones = [
  { year: "Day 1", text: "The universe said: 'Let there be a legend' 👶✨", emoji: "🌟" },
  { year: "BFFs", text: "The moment we became inseparable besties 🤝", emoji: "💕" },
  { year: "The Era", text: "Inside jokes, matching bracelets, chaos begins 🎪", emoji: "🎭" },
  { year: "Now", text: "Still the funniest, kindest, most iconic bestie ever 👑", emoji: "🎂" },
];

const Timeline = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-display text-center text-primary mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Bestie Timeline 💫
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 rounded-full" />

          {milestones.map((m, i) => (
            <motion.div
              key={i}
              className={`relative flex items-center mb-16 last:mb-0 ${
                i % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Content */}
              <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                <span className="font-display text-lg text-accent-foreground bg-accent px-3 py-1 rounded-full">
                  {m.year}
                </span>
                <p className="font-handwritten text-lg text-foreground mt-2">{m.text}</p>
              </div>

              {/* Center dot */}
              <div className="w-2/12 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl shadow-lg z-10">
                  {m.emoji}
                </div>
              </div>

              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
