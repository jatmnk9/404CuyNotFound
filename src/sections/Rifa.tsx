import { motion } from "framer-motion";
import { MessageCircle, Gift, CreditCard, Sparkles, Plus, Minus } from "lucide-react";
import { useState } from "react";
import rifaParlante from "../assets/rifa_premio_parlante.png";
import rifaDesayuno from "../assets/rifa_premio_desayuno.jpeg";
import rifaRamo from "../assets/rifa_premio_ramo.jpeg";

const Rifa = () => {
    const [ticketCount, setTicketCount] = useState(1);
    const pricePerTicket = 7;
    const total = ticketCount * pricePerTicket;

    const handleWhatsAppClick = () => {
        const plural = ticketCount > 1 ? "s" : "";
        const message = encodeURIComponent(`¡Hola! Acabo de yapear S/${total} por ${ticketCount} rifa${plural} para START Hack Suiza 2026. Aquí está mi comprobante: `);
        window.open(`https://wa.me/51934984373?text=${message}`, '_blank');
    };

    const prizes = [
        {
            title: "Parlante Espectacular",
            image: rifaParlante,
            delay: 0.1,
            color: "from-blue-500 to-cyan-400"
        },
        {
            title: "Box Desayuno",
            image: rifaDesayuno,
            delay: 0.2,
            color: "from-orange-400 to-rose-400"
        },
        {
            title: "Ramito Tejido + Cuadro",
            image: rifaRamo,
            delay: 0.3,
            color: "from-purple-500 to-pink-400"
        }
    ];

    return (
        <section className="py-24 bg-black relative overflow-hidden" id="rifa">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral-accent/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tech-turquoise/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tech-turquoise/10 border border-tech-turquoise/20 text-tech-turquoise font-medium mb-6">
                        <Sparkles size={18} />
                        <span>Evento Especial Activo</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        <span className="text-white">GRAN RIFA </span>
                        <br className="md:hidden" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-tech-turquoise via-coral-accent to-tech-turquoise animate-gradient-x">
                            START HACK 2026
                        </span>
                    </h2>

                    <p className="text-xl text-soft-white md:text-2xl font-light mb-8">
                        Recaudamos fondos para representar al Perú en la competencia de innovación y tecnología más grande de Europa, en Suiza. ¡Ayúdanos a llegar y gana premios increíbles!
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md inline-flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        {/* Selector de cantidad */}
                        <div className="flex flex-col items-center">
                            <span className="text-soft-white font-medium mb-4 uppercase tracking-wider text-sm">¿Cuántas rifas deseas?</span>
                            <div className="flex items-center gap-4 bg-black/40 p-2 rounded-full border border-white/10">
                                <button
                                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-coral-accent transition-colors disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:text-white"
                                    disabled={ticketCount <= 1}
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="text-3xl font-bold w-12 text-center text-white">{ticketCount}</span>
                                <button
                                    onClick={() => setTicketCount(Math.min(50, ticketCount + 1))}
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-tech-turquoise transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-24 bg-white/10" />

                        {/* Total */}
                        <div className="flex flex-col items-center">
                            <div className="text-soft-white font-medium mb-2 uppercase tracking-wider text-sm">Total a pagar</div>
                            <div className="text-6xl md:text-8xl font-black text-tech-turquoise drop-shadow-[0_0_25px_rgba(0,245,255,0.4)]">
                                S/ {total}
                            </div>
                            {ticketCount > 1 && (
                                <div className="text-tech-turquoise/60 text-sm mt-2 font-medium">
                                    (S/ 7 cada una)
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Prizes Grid */}
                <div className="mb-16 text-center">
                    <h3 className="text-3xl font-bold text-white mb-10 flex items-center justify-center gap-3">
                        <Gift className="text-coral-accent" size={32} />
                        Premios a Sortear
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {prizes.map((prize, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: prize.delay }}
                                className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-b ${prize.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="h-64 w-full relative overflow-hidden bg-black/50">
                                    <img
                                        src={prize.image}
                                        alt={prize.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                                </div>

                                <div className="p-6 relative z-10 -mt-16 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black border border-white/20 mb-4 shadow-xl">
                                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                            #{index + 1}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">{prize.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Payment & CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto bg-gradient-to-br from-navy-bg to-black border border-tech-turquoise/30 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_50px_rgba(0,245,255,0.1)] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 text-tech-turquoise/5">
                        <CreditCard size={200} className="-mr-10 -mt-10" />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-6 relative z-10">¿Cómo participar?</h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10 relative z-10 w-full">
                        <div className="bg-white/10 p-6 rounded-2xl w-full md:w-1/2 text-left">
                            <p className="text-sm text-soft-white mb-1 uppercase tracking-wider font-semibold">1. Yapea el total (S/ {total}):</p>
                            <p className="text-3xl md:text-4xl font-bold text-tech-turquoise mb-1">934 984 373</p>
                            <p className="text-white/80">Jatziry Sanchez</p>
                        </div>
                        <div className="hidden md:block w-px h-24 bg-white/10" />
                        <div className="bg-white/10 p-6 rounded-2xl w-full md:w-1/2 text-left">
                            <p className="text-sm text-soft-white mb-1 uppercase tracking-wider font-semibold">2. Reclama tu ticket:</p>
                            <p className="text-lg text-white/90">Envíanos el comprobante <br />por WhatsApp y ¡listo!</p>
                        </div>
                    </div>

                    <button
                        onClick={handleWhatsAppClick}
                        className="relative z-10 inline-flex items-center gap-3 bg-gradient-to-r from-coral-accent to-[#ff1e32] text-white font-bold text-xl px-8 py-5 rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,59,74,0.4)] group w-full md:w-auto justify-center"
                    >
                        <MessageCircle size={28} className="group-hover:animate-bounce" />
                        Enviar Voucher por WhatsApp
                    </button>

                    <p className="mt-6 text-sm text-soft-white relative z-10">
                        * Puedes revisar el avance de fondos en la sección interactiva más abajo.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Rifa;
