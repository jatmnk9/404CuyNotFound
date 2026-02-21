import { Heart } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-white/10 text-white relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="404 CuyNotFound Logo" className="w-12 h-12" />
                        <span className="text-2xl font-bold tracking-tight">404 CuyNotFound</span>
                    </div>

                    <div className="flex gap-6">
                        <a
                            href="https://www.tiktok.com/@404cuynotfound?_r=1&_t=ZS-947GRj9j9hn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 p-3 rounded-full hover:bg-tech-turquoise hover:text-black transition-all group flex items-center justify-center font-bold px-6"
                        >
                            TikTok
                        </a>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2025 404 CuyNotFound. Todos los derechos reservados.</p>
                    <p className="flex items-center gap-1">
                        Hecho con <Heart size={14} className="text-coral-accent fill-coral-accent" /> por el equipo
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
