import { useEffect, useRef, useState } from "react";
import { Send, Heart } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

interface Donor {
    id: string;
    name: string;
    message: string;
    timestamp: number;
}

const DonorNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [donors, setDonors] = useState<Donor[]>([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    // Google Sheets & Forms configuration
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTycw4IG_vxGrPB6ZePQXyz0SUVTE_RC4iwgYg6vl7X301-JveVLy0LdqJtwtH91lD1fhqNXaILLrcZ/pub?output=csv";
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfUArOaXOifEqZ4eRLwjaaaDKPZ_GYAwOHI7BDNn7dEiZJlQA/formResponse";

    // Initialize from Google Sheets
    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await fetch(CSV_URL);
                const csvText = await response.text();

                // Parse CSV rows
                const rows = csvText.split('\n');

                // Skip header (i=1 instead of 0) and filter empty rows
                const parsedDonors: Donor[] = [];
                for (let i = 1; i < rows.length; i++) {
                    // Very simple CSV parse (assuming no commas in the message natively, or keeping it robust)
                    // Better approach for simple forms: split by first 2 commas (Timestamp, Name, Message)
                    const row = rows[i].trim();
                    if (!row) continue;

                    // Regex to handle potential quotes in CSV
                    const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
                    if (matches && matches.length >= 3) {
                        const timestamp = matches[0].replace(/^"|"$/g, '');
                        const name = matches[1].replace(/^"|"$/g, '');
                        const message = row.substring(row.indexOf(name) + name.length + 1).replace(/^"|"$/g, '');

                        parsedDonors.push({
                            id: timestamp,
                            name: name,
                            message: message,
                            timestamp: Date.parse(timestamp) || Date.now()
                        });
                    }
                }

                if (parsedDonors.length > 0) {
                    setDonors(parsedDonors);
                    localStorage.setItem("cuyNotFoundDonors", JSON.stringify(parsedDonors));
                }
            } catch (error) {
                console.error("Error fetching from Google Sheets:", error);
                const stored = localStorage.getItem("cuyNotFoundDonors");
                if (stored) setDonors(JSON.parse(stored));
            }
        };

        fetchDonors();
    }, []);

    // Canvas Animation Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let nodes: any[] = [];
        let mouseX = -1000;
        let mouseY = -1000;

        // Load center logo image
        const centerImage = new Image();
        centerImage.src = logo;

        const resizeCanvas = () => {
            canvas.width = container.clientWidth;
            canvas.height = 500;
        };

        const initNodes = () => {
            nodes = donors.map((donor) => {
                // Determine a random orbital angle and distance
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 150 + 100; // Between 100 and 250 from center
                return {
                    ...donor,
                    angle,
                    distance,
                    speed: (Math.random() * 0.005) + 0.001 * (Math.random() > 0.5 ? 1 : -1),
                    x: 0,
                    y: 0,
                    radius: Math.random() * 4 + 4,
                    color: Math.random() > 0.5 ? "#00D1C7" : "#FF3B4A"
                };
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            const isMobile = window.innerWidth < 768;

            // Draw center logo
            if (centerImage.complete) {
                const imgSize = 80;
                ctx.save();
                // Add a glowing effect only on desktop
                if (!isMobile) {
                    ctx.shadowColor = "#00D1C7";
                    ctx.shadowBlur = 30;
                }
                ctx.drawImage(centerImage, centerX - imgSize / 2, centerY - imgSize / 2, imgSize, imgSize);
                ctx.restore();
            }

            // Draw connections from center to nodes and between close nodes
            ctx.lineWidth = 1;

            nodes.forEach((node, i) => {
                // Calculate current position based on orbit
                node.angle += node.speed;
                node.x = centerX + Math.cos(node.angle) * node.distance;
                node.y = centerY + Math.sin(node.angle) * node.distance;

                // Interactive hover effect
                const distToMouse = Math.hypot(node.x - mouseX, node.y - mouseY);
                if (distToMouse < 30) {
                    node.radius = 8;
                    if (!isMobile) {
                        ctx.shadowColor = node.color;
                        ctx.shadowBlur = 10;
                    }
                } else {
                    node.radius = 4;
                    ctx.shadowBlur = 0;
                }

                // Draw line to center
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(node.x, node.y);
                const gradient = ctx.createLinearGradient(centerX, centerY, node.x, node.y);
                gradient.addColorStop(0, "rgba(0, 209, 199, 0.2)");
                gradient.addColorStop(1, "rgba(255, 59, 74, 0.05)");
                ctx.strokeStyle = gradient;
                ctx.stroke();

                // Draw lines to nearby nodes (only on desktop to save mobile performance O(N^2))
                if (!isMobile) {
                    for (let j = i + 1; j < nodes.length; j++) {
                        const otherNode = nodes[j];
                        const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(otherNode.x, otherNode.y);
                            ctx.strokeStyle = `rgba(255,255,255, ${0.15 - (dist / 100) * 0.15})`;
                            ctx.stroke();
                        }
                    }
                }

                // Draw node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();

                // Draw text label
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.font = "12px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(node.name, node.x, node.y + 15);
            });

            // Find hovered node to trigger React state (for showing tooltip/message externally or drawing it)
            // To keep React out of the hot loop, we draw the tooltip on canvas if hovered
            const hovered = nodes.find(n => Math.hypot(n.x - mouseX, n.y - mouseY) < 30);
            if (hovered) {
                ctx.fillStyle = "rgba(10, 20, 30, 0.9)";
                ctx.strokeStyle = hovered.color;
                ctx.lineWidth = 1;

                const padding = 10;
                const textWidth = Math.max(ctx.measureText(hovered.name).width, ctx.measureText(hovered.message).width);
                const boxW = textWidth + padding * 2;
                const boxH = 50;

                ctx.fillRect(mouseX + 15, mouseY - 25, boxW, boxH);
                ctx.strokeRect(mouseX + 15, mouseY - 25, boxW, boxH);

                ctx.fillStyle = "white";
                ctx.textAlign = "left";
                ctx.font = "bold 12px sans-serif";
                ctx.fillText(hovered.name, mouseX + 15 + padding, mouseY - 10);

                ctx.font = "italic 11px sans-serif";
                ctx.fillStyle = "rgba(255,255,255,0.7)";
                ctx.fillText(`"${hovered.message}"`, mouseX + 15 + padding, mouseY + 10);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", resizeCanvas);

        resizeCanvas();
        initNodes();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [donors]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        // Create form data for Google Forms
        const formData = new FormData();
        formData.append('entry.908460344', name.trim()); // Corresponds to 'Nombre' field
        formData.append('entry.1355208972', message.trim()); // Corresponds to 'Mensaje' field

        // Save to Google Forms
        try {
            await fetch(FORM_URL, {
                method: 'POST',
                mode: 'no-cors', // Crucial to bypass CORS block on Google Forms
                body: formData
            });

            // Optimistically add to UI
            const newDonor: Donor = {
                id: Date.now().toString(),
                name: name.trim(),
                message: message.trim(),
                timestamp: Date.now()
            };

            const updatedDonors = [...donors, newDonor];
            setDonors(updatedDonors);
            localStorage.setItem("cuyNotFoundDonors", JSON.stringify(updatedDonors));

            setName("");
            setMessage("");
        } catch (error) {
            console.error("Error saving to Google Forms:", error);
            alert("Hubo un problema al enviar tu mensaje. Intenta de nuevo.");
        }
    };

    return (
        <section id="network" className="py-20 bg-navy-bg relative overflow-hidden text-center">
            {/* Background elements */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-coral-accent/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-tech-turquoise/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-tech-turquoise to-coral-accent">
                            COMUNIDAD CUY
                        </span>
                    </h2>
                    <p className="text-soft-white text-lg mb-8">
                        Cada persona que nos apoya se convierte en un nodo vital conectado a <strong>404 CuyNotFound</strong>.
                        Únete a nuestra constelación y deja tu mensaje.
                    </p>
                    <a
                        href="#payment"
                        className="inline-block px-8 py-3 bg-tech-turquoise text-black font-bold rounded-full shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] hover:scale-105 transition-all"
                    >
                        Apóyanos ahora y únete 🚀
                    </a>
                </motion.div>

                {/* Canvas Container */}
                <div
                    ref={containerRef}
                    className="w-full h-[500px] relative rounded-3xl border border-white/10 bg-[#111] md:bg-black/20 shadow-2xl overflow-hidden mb-16 md:backdrop-blur-sm"
                >
                    {donors.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center flex-col text-soft-white z-10 pointer-events-none">
                            <Heart className="w-12 h-12 text-white/30 mb-4 animate-pulse" />
                            <p className="text-xl">Sé la primera persona en unirte a la red.</p>
                        </div>
                    )}
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
                </div>

                {/* Form to join the network */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto bg-[#0b1221] md:bg-white/5 border border-white/10 p-8 rounded-2xl md:backdrop-blur-md"
                >
                    <h3 className="text-2xl font-bold mb-6 text-white text-left">Sumar mi nombre al grafo</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Tu Nombre o Empresa"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tech-turquoise transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Un mensaje de aliento para el equipo..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tech-turquoise transition-colors resize-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-tech-turquoise hover:bg-[#00e5da] text-black font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(0,209,199,0.3)] hover:shadow-[0_0_25px_rgba(0,209,199,0.5)] flex justify-center items-center gap-2"
                        >
                            Guardar en la Red <Send size={18} />
                        </button>
                    </form>
                </motion.div>

                {/* Wall of messages list */}
                {donors.length > 0 && (
                    <div className="mt-16 text-left max-w-4xl mx-auto">
                        <h4 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">Mensajes Recientes</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {donors.slice().reverse().map((d) => (
                                <div key={d.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="font-bold text-tech-turquoise mb-1">{d.name}</div>
                                    <div className="text-soft-white italic text-sm">"{d.message}"</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DonorNetwork;
