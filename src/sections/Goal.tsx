import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Plane, Hotel, Coffee } from "lucide-react";
import suizaFlag from "../assets/suiza.png";

const Goal = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    const target = 4965;
    const current = 240; // Ejemplo de progreso actual

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let currentCount = 0;

            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(currentCount));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView]);

    const percentage = Math.min((current / target) * 100, 100);

    const expenses = [
        { icon: <Plane className="text-tech-turquoise" />, item: "Vuelos (x3)", cost: 3300 },
        { icon: <Hotel className="text-coral-accent" />, item: "Alojamiento", cost: 810 },
        { icon: <Coffee className="text-yellow-400" />, item: "Viáticos/Otros", cost: 855 },
    ];

    return (
        <section id="goal" className="py-20 relative bg-navy-bg" ref={ref}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">Nuestra Meta</h2>
                    <div className="text-6xl md:text-8xl font-bold font-mono text-tech-turquoise mb-2 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">
                        ${count.toLocaleString()}
                    </div>
                    <div className="flex justify-center items-center gap-2 text-soft-white text-lg">
                        Objetivo Total para Suiza <img src={suizaFlag} alt="Bandera de Suiza" className="inline-block h-6 w-auto rounded-sm" />
                    </div>
                </motion.div>

                {/* Progress Bar */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="h-8 bg-white/10 rounded-full overflow-hidden relative border border-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${percentage}%` } : {}}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-coral-accent to-tech-turquoise relative"
                        >
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                        </motion.div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-soft-white font-mono">
                        <span>$0</span>
                        <span className="text-tech-turquoise text-lg font-bold">Recaudado: ${current.toLocaleString()} ({percentage.toFixed(0)}%)</span>
                        <span>${target.toLocaleString()}</span>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {expenses.map((expense, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center hover:border-tech-turquoise/50 transition-colors"
                        >
                            <div className="p-4 bg-white/5 rounded-full mb-4">
                                {expense.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{expense.item}</h3>
                            <p className="text-2xl font-mono text-soft-white">${expense.cost}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Goal;
