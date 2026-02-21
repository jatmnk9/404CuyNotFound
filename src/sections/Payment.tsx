import { motion } from "framer-motion";
import { CreditCard, Copy, Check } from "lucide-react";
import qrYapeImg from "../assets/qr_yape.jpeg";
import { useState } from "react";

const Payment = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const methods = [
        {
            id: "bcp",
            title: "BCP Soles",
            name: "Jatziry Sanchez",
            account: "19404497854085",
            cci: "00219410449785408591",
            color: "bg-[#002A8D]",
        },
        {
            id: "interbank",
            title: "Interbank Dólares",
            name: "Jatziry Sanchez",
            account: "8983416853518",
            cci: "00389801341685351842",
            color: "bg-[#009E35]",
        },
    ];

    return (
        <section id="payment" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-coral-accent to-tech-turquoise">
                            Métodos de Pago
                        </span>
                    </h2>
                    <p className="text-soft-white">Seguro, rápido y transparente.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Yape */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#742384] rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-transform"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                        <h3 className="text-2xl font-bold text-white mb-6">Yape</h3>
                        <div className="bg-white p-4 rounded-xl mb-6 w-48 h-48 mx-auto flex items-center justify-center">
                            <img src={qrYapeImg} alt="QR Yape" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-center">
                            <p className="text-white/80 mb-1">Número</p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl font-bold text-white">934 984 373</span>
                                <button
                                    onClick={() => handleCopy("934984373", "yape")}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    {copied === "yape" ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bank Cards */}
                    <div className="space-y-6">
                        {methods.map((method) => (
                            <motion.div
                                key={method.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`${method.color} p-6 rounded-2xl relative overflow-hidden shadow-lg hover:shadow-2xl transition-all`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold">{method.title}</h3>
                                    <CreditCard className="opacity-50" />
                                </div>
                                <p className="text-sm opacity-80 mb-4">{method.name}</p>
                                <div className="space-y-3">
                                    <div className="bg-black/20 p-3 rounded-lg flex justify-between items-center">
                                        <span className="font-mono text-sm">{method.account}</span>
                                        <button
                                            onClick={() => handleCopy(method.account, method.id + "acc")}
                                            className="hover:text-tech-turquoise transition-colors"
                                        >
                                            {copied === method.id + "acc" ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                    <div className="bg-black/20 p-3 rounded-lg flex justify-between items-center">
                                        <span className="font-mono text-xs text-soft-white">CCI: {method.cci}</span>
                                        <button
                                            onClick={() => handleCopy(method.cci, method.id + "cci")}
                                            className="hover:text-tech-turquoise transition-colors"
                                        >
                                            {copied === method.id + "cci" ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* PayPal */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#003087] rounded-2xl p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#009cde]/30 rounded-full blur-3xl" />
                        <div>
                            <h3 className="text-3xl font-bold mb-4 font-italic">PayPal</h3>
                            <p className="text-blue-100 mb-8">
                                Aceptamos tarjetas de crédito y débito internacionales de forma segura.
                            </p>
                        </div>

                        <a
                            href="https://paypal.me/JatzirySW9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-[#009cde] text-white font-bold rounded-xl text-center hover:bg-[#008cbd] transition-colors shadow-lg"
                        >
                            Donar con PayPal
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
