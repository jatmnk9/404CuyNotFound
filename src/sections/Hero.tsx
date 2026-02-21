import { motion } from "framer-motion";
import { ChevronDown, Rocket, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import peruFlag from "../assets/peru.png";
import suizaFlag from "../assets/suiza.png";

const Hero = () => {
    const [text, setText] = useState("");
    const fullText = "De San Marcos y la UNI a la Élite Global";
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i <= fullText.length) {
                setText(fullText.slice(0, i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorInterval);
        };
    }, []);

    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-tech-turquoise/20 blur-[120px] rounded-full -z-10 animate-pulse-slow" />

            {/* Flags & Flight Path */}
            <div className="flex items-center mb-10 relative">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10"
                >
                    <img src={peruFlag} alt="Bandera de Perú" className="h-12 w-auto object-contain rounded-sm" />
                </motion.div>

                {/* Flight Path Container w/ Animated Plane */}
                <div className="relative w-24 md:w-32 flex items-center justify-center mx-4">
                    {/* Dashed Line */}
                    <div className="absolute w-full h-0 border-t-[3px] border-dashed border-tech-turquoise/30"></div>

                    {/* Plane */}
                    <motion.div
                        initial={{ x: -40, y: 15, opacity: 0 }}
                        animate={{
                            x: [-40, 0, 40],
                            y: [15, -5, -25],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                        className="absolute text-tech-turquoise drop-shadow-[0_0_10px_rgba(0,209,199,0.8)]"
                    >
                        <Plane size={28} className="transform rotate-45" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10"
                >
                    <img src={suizaFlag} alt="Bandera de Suiza" className="h-12 w-auto object-contain rounded-sm" />
                </motion.div>
            </div>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            >
                <span className="glitch relative inline-block text-white" data-text="START HACK 2026">
                    START HACK 2026
                </span>
            </motion.h1>

            {/* Subtitle / Typewriter */}
            <div className="h-8 md:h-12 mb-8">
                <p className="text-xl md:text-3xl text-soft-white font-mono">
                    {text}
                    <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-tech-turquoise border-r-2 border-tech-turquoise ml-1`}>&nbsp;</span>
                </p>
            </div>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="max-w-2xl text-soft-white mb-10 text-lg"
            >
                El talento peruano no tiene límites. Ayúdanos a competir contra el MIT, ETH Zurich y Stanford en el hackathon más prestigioso de Europa.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                {/* Rifa Primary Button */}
                <a
                    href="#rifa"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-coral-accent to-[#ff1e32] text-white font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,59,74,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        🌟 ¡Participa en la Rifa!
                    </span>
                    <div className="absolute inset-0 rounded-full shadow-[0_0_20px_#FF3B4A] opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
                </a>

                {/* Secondary Support Button */}
                <a
                    href="#support"
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-tech-turquoise text-tech-turquoise font-bold text-lg rounded-full overflow-hidden hover:bg-tech-turquoise hover:text-black transition-all duration-300"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Apoyar Ahora <Rocket className="inline-block group-hover:animate-bounce" />
                    </span>
                </a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-10 animate-bounce"
            >
                <ChevronDown className="text-gray-500 w-8 h-8" />
            </motion.div>
        </section>
    );
};

export default Hero;
