import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy } from "lucide-react";
import suizaFlag from "../assets/suiza.png";

const Mission = () => {
    const cards = [
        {
            icon: <Calendar className="w-10 h-10 text-tech-turquoise" />,
            title: "Fecha",
            desc: "18-20 de Marzo, 2026",
        },
        {
            icon: <MapPin className="w-10 h-10 text-coral-accent" />,
            title: "Lugar",
            desc: (
                <span className="flex items-center justify-center gap-2">
                    St. Gallen, Suiza <img src={suizaFlag} alt="Bandera de Suiza" className="inline-block h-5 w-auto rounded-sm" />
                </span>
            ),
        },
        {
            icon: <Trophy className="w-10 h-10 text-yellow-400" />,
            title: "Prestigio",
            desc: "El Hackathon más importante de Europa",
        },
    ];

    return (
        <section id="mission" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-tech-turquoise to-coral-accent">
                            Nuestra Misión
                        </span>
                    </h2>
                    <p className="text-xl text-soft-white max-w-3xl mx-auto">
                        Demostrar que la innovación peruana no tiene fronteras. Llevamos la bandera de Perú a la competencia tecnológica más exigente del mundo.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-[#0b1221] md:bg-white/5 md:backdrop-blur-lg border border-white/5 p-8 rounded-2xl md:hover:border-tech-turquoise/50 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all group"
                        >
                            <div className="mb-6 bg-white/5 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto group-hover:bg-white/10 transition-colors">
                                {card.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-center">{card.title}</h3>
                            <p className="text-soft-white text-center">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;
