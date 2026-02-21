import { motion } from "framer-motion";
import { Code, ShoppingBag, Globe, MessageCircle } from "lucide-react";

const Support = () => {
    const services = [
        {
            icon: <Code className="w-12 h-12 text-tech-turquoise" />,
            title: "Portafolio Web",
            price: " Desde $15 USD",
            desc: "Ideal para estudiantes y profesionales.",
            features: ["Diseño Responsive", "Hosting incluido", "Dominio .vercel.app"],
        },
        {
            icon: <Globe className="w-12 h-12 text-coral-accent" />,
            title: "Landing Page",
            price: "Desde $20 USD",
            desc: "Para tu negocio o startup.",
            features: ["Secciones personalizadas", "Formulario de contacto", "Optimización SEO"],
        },
        {
            icon: <ShoppingBag className="w-12 h-12 text-yellow-400" />,
            title: "E-commerce",
            price: "Desde $50 USD",
            desc: "Vende tus productos online.",
            features: ["Catálogo de productos", "Integración WhatsApp"],
        },
    ];

    return (
        <section id="support" className="py-20 bg-navy-bg/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        ¿Cómo Apoyarnos?
                    </h2>
                    <p className="text-soft-white text-lg max-w-2xl mx-auto">
                        Cualquier aporte, por pequeño que sea, nos acerca más a Suiza. Serás parte de nuestra historia y aparecerás en nuestro grafo de donantes.
                    </p>
                </motion.div>

                {/* Direct Donation CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#0b1221] md:bg-gradient-to-r md:from-coral-accent/20 md:to-tech-turquoise/20 border border-tech-turquoise/30 rounded-3xl p-10 text-center max-w-4xl mx-auto md:backdrop-blur-md mb-24"
                >
                    <h3 className="text-3xl font-bold mb-4">Apoyo Directo</h3>
                    <p className="text-soft-white mb-8 text-lg">
                        Haz tu donación directamente a nuestras cuentas.
                    </p>
                    <a
                        href="#payment"
                        className="inline-block px-10 py-4 bg-tech-turquoise text-black font-bold text-xl rounded-full shadow-[0_0_20px_rgba(0,245,255,0.5)] hover:shadow-[0_0_40px_rgba(0,245,255,0.7)] hover:scale-105 transition-all"
                    >
                        Ver Métodos de Pago 👇
                    </a>
                </motion.div>

                {/* Services Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="text-3xl font-bold mb-4">Servicios Digitales</h3>
                    <p className="text-soft-white text-lg max-w-2xl mx-auto">
                        También ofrecemos desarrollo web profesional. ¡Invierte en tu negocio y apoya al talento peruano!
                    </p>
                </motion.div>

                {/* Roulette/Marquee Container */}
                <div className="relative w-full overflow-hidden max-w-7xl mx-auto py-10">
                    {/* Gradient masks for fading edges */}
                    <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-navy-bg to-transparent z-10 hidden md:block" pointer-events="none" />
                    <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-navy-bg to-transparent z-10 hidden md:block" pointer-events="none" />

                    <motion.div
                        className="flex gap-8 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                    >
                        {/* Duplicate the services mapping twice to create an infinite loop */}
                        {[...services, ...services].map((service, index) => (
                            <div
                                key={index}
                                className="w-[350px] flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-tech-turquoise/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-all relative overflow-hidden group hover:-translate-y-2"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    {service.icon}
                                </div>

                                <div className="mb-6">{service.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <div className="text-3xl font-bold text-tech-turquoise mb-2">{service.price}</div>
                                <p className="text-soft-white mb-6 text-sm">{service.desc}</p>

                                <ul className="mb-8 space-y-2">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-xs text-soft-white">
                                            <span className="w-1.5 h-1.5 bg-coral-accent rounded-full mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="https://wa.me/51934984373"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-3 bg-white/10 hover:bg-tech-turquoise hover:text-black font-bold rounded-xl text-center transition-all flex items-center justify-center gap-2"
                                >
                                    Solicitar <MessageCircle size={18} />
                                </a>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Support;
