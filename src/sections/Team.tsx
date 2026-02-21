import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import camilaLopezImg from "../assets/camila_lopez.jpeg";
import jatzirySanchezImg from "../assets/jatziry_Sanchez.jpeg";
import joseQuispeImg from "../assets/jose_quispe.png";

const Team = () => {
    const members = [
        {
            name: "Ariana Lopez Julcarima",
            role: "Participante seleccionado START Hack 2026",
            uni: "Universidad Nacional de Ingeniería",
            career: "Ciencias de la computación",
            image: camilaLopezImg,
            linkedin: "https://www.linkedin.com/in/arianalopezj/"
        },
        {
            name: "Jatziry Sanchez Wong",
            role: "Participante seleccionado START Hack 2026",
            uni: "Universidad Nacional Mayor de San Marcos",
            career: "Ingeniería de Software",
            image: jatzirySanchezImg,
            linkedin: "https://www.linkedin.com/in/jatziry-sanchez-wong-651a30390/"
        },
        {
            name: "Jose Quispe Cabello",
            role: "Participante seleccionado START Hack 2026",
            uni: "Universidad Nacional Mayor de San Marcos",
            career: "Ingeniería de Software",
            image: joseQuispeImg,
            linkedin: "https://www.linkedin.com/in/joseaquispe/"
        },
    ];

    return (
        <section id="team" className="py-20 relative">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-tech-turquoise to-coral-accent">
                        El Equipo de Élite
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-[#0b1221] md:bg-navy-bg/50 md:backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center group md:hover:border-coral-accent/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] md:hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] md:hover:-translate-y-2 transform"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-tech-turquoise to-coral-accent rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 object-cover object-top rounded-full border-2 border-white/20 group-hover:border-tech-turquoise transition-colors relative z-10 bg-navy-bg"
                                />
                            </div>

                            <h3 className="text-2xl font-bold mb-1 group-hover:text-tech-turquoise transition-colors">{member.name}</h3>
                            <p className="text-coral-accent font-medium mb-4">{member.role}</p>

                            <div className="text-sm text-soft-white space-y-2 mb-6">
                                <p className="font-semibold text-tech-turquoise">{member.uni}</p>
                                <p>{member.career}</p>
                            </div>

                            <div className="flex justify-center gap-4">
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-tech-turquoise/20 hover:text-tech-turquoise transition-colors">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
