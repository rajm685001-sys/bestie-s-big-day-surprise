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

  return;



































































































};

export default MemoriesCarousel;