import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ParticlesBackground from "./ParticlesBackground";
import { MessageCircle } from "lucide-react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-navy-bg text-white font-sans relative overflow-hidden">
            <ParticlesBackground />
            <Navbar />
            <main className="relative z-0">
                {children}
            </main>
            <Footer />

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/51934984373"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:bg-[#20bd5a] hover:scale-110 transition-all animate-bounce"
                aria-label="Contactar por WhatsApp"
            >
                <MessageCircle size={28} fill="white" />
            </a>
        </div>
    );
};

export default Layout;
