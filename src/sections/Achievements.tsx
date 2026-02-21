import { motion } from "framer-motion";
import { Award, Globe, Zap, Medal, Star } from "lucide-react";

const Achievements = () => {
    const achievements = [
        {
            icon: <Medal className="w-8 h-8 text-yellow-500" />,
            title: "Hackathon MINEDU 2025",
            place: "1er Lugar",
            desc: "Categoría: Expertos en Tecnología",
        },
        {
            icon: <Zap className="w-8 h-8 text-tech-turquoise" />,
            title: "Hackathon Nacional Energ-IA",
            place: "2do Lugar",
            desc: "Proyecto: HIRI - IA 100% offline para educación energética rural",
        },
        {
            icon: <Star className="w-8 h-8 text-coral-accent" />,
            title: "Stellar Ideathon 2025",
            place: "2do Lugar",
            desc: "Build, Create & Win on the Road to Meridian. Proyecto: Retex",
        },
        {
            icon: <Globe className="w-8 h-8 text-blue-400" />,
            title: "Platanus Hack 25 ft Buk",
            place: "Participación",
            desc: "Santiago de Chile",
        },
        {
            icon: <Award className="w-8 h-8 text-purple-400" />,
            title: "Quantum Hackathon Latam",
            place: "Participación",
            desc: "Montevideo, Uruguay",
        },
    ];

    return (
        <section id="achievements" className="py-20 relative bg-white/5">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-coral-accent to-tech-turquoise">
                            No es casualidad
                        </span>
                    </h2>
                    <p className="text-soft-white">Nuestra trayectoria nos respalda</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            className="bg-navy-bg border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-tech-turquoise/30 transition-all"
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:from-tech-turquoise/20 transition-all" />

                            <div className="mb-4 bg-white/5 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-tech-turquoise/10 transition-colors">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                            <p className="text-tech-turquoise font-semibold text-sm mb-2">{item.place}</p>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
