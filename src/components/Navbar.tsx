import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Misión", href: "#mission" },
        { name: "Equipo", href: "#team" },
        { name: "Logros", href: "#achievements" },
        { name: "Meta", href: "#goal" },
        { name: "Apoyar", href: "#support" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-navy-bg/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-3 group">
                    <img src={logo} alt="404 CuyNotFound Logo" className="h-20 w-auto group-hover:animate-pulse" />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-turquoise to-coral-accent">
                        404 CuyNotFound
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-soft-white hover:text-tech-turquoise transition-colors text-sm uppercase tracking-wider font-medium relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tech-turquoise transition-all group-hover:w-full" />
                        </a>
                    ))}
                    <a
                        href="#support"
                        className="px-6 py-2 bg-gradient-to-r from-tech-turquoise to-coral-accent text-white font-bold rounded-full shadow-[0_0_15px_rgba(0,245,255,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] transition-all transform hover:scale-105"
                    >
                        Donar 🚀
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white hover:text-tech-turquoise"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full bg-navy-bg/95 backdrop-blur-lg border-b border-white/10"
                    >
                        <div className="flex flex-col items-center py-8 gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl text-white hover:text-tech-turquoise"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#support"
                                className="px-8 py-3 bg-tech-turquoise text-black font-bold rounded-full shadow-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Donar Ahora
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
