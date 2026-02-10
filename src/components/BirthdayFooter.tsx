import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BIRTHDAY = new Date(new Date().getFullYear(), 1, 13); // Feb 13

const BirthdayFooter = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let target = new Date(now.getFullYear(), 1, 13);
      if (now > target) target = new Date(now.getFullYear() + 1, 1, 13);

      const diff = target.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="py-16 px-4 bg-primary/10">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-display text-primary mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Countdown to Next B-Day! 🎂
        </motion.h2>

        <div className="flex justify-center gap-4 mb-10">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.minutes },
            { label: "Secs", value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-card border-2 border-border flex items-center justify-center shadow-md">
                <span className="font-display text-2xl md:text-3xl text-primary">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <p className="font-handwritten text-sm text-muted-foreground mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <button onClick={scrollToTop} className="btn-party">
            Back to Top 🚀
          </button>
        </div>

        <div className="mt-12 space-y-2">
          <p className="font-handwritten text-lg text-muted-foreground">
            Made with 💖 by your bestie
          </p>
          <p className="text-muted-foreground/50 text-sm">
            Happy Birthday, you absolute legend! 🎉
          </p>
          <div className="text-3xl animate-wiggle inline-block mt-2">
            😘
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BirthdayFooter;
