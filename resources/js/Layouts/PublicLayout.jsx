import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Phone, Mail, MapPin, ChevronRight,
    MessageCircle, ArrowRight, Globe, Send
} from 'lucide-react';

export default function PublicLayout({ children, hideCTA = false }) {
    const { pengaturan } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Track scroll for navbar glass effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const waNumber = pengaturan?.no_telepon || '';
    // Format WA Number for link (remove leading 0 and replace with 62)
    const formattedWa = waNumber.startsWith('0') ? '62' + waNumber.substring(1) : waNumber;

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang Kami', href: '/tentang-kami' },
        { name: 'Layanan', href: '/layanan' },
        { name: 'Proyek', href: '/proyek' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-wmu-dark/95 backdrop-blur-md shadow-lg py-2' : 'bg-gradient-to-b from-black/60 to-transparent py-4'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-12">
                        {/* Logo */}
                        <Link href="/" className="block group relative h-full w-32 md:w-40">
                            <img
                                src="/images/logonobg.png"
                                alt="WMU Logo"
                                className="absolute top-1/2 -translate-y-1/2 left-0 h-40 md:h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105 origin-left z-50"
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] hover:text-gray-200 transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wmu-accent transition-all duration-300 group-hover:w-full shadow-sm"></span>
                                </Link>
                            ))}
                            <a
                                href={`https://wa.me/${formattedWa}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-wmu-accent hover:bg-yellow-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-wmu-accent/30 hover:shadow-wmu-accent/50 transform hover:-translate-y-1"
                            >
                                Hubungi Kami
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
                                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col shadow-inner">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-wmu-accent hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <a
                                    href={`https://wa.me/${formattedWa}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block text-center mt-4 bg-wmu-accent text-white px-3 py-3 rounded-md font-bold"
                                >
                                    Hubungi Kami
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-wmu-dark text-gray-300 relative mt-12">
                {/* CTA Banner Section */}
                {!hideCTA && (
                    <div className="bg-wmu-dark border-b border-gray-700/50 relative overflow-hidden">
                        {/* Top Shape Divider (Inverted Wave) */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-[60px] md:h-[100px] lg:h-[160px] block absolute top-0 left-0 z-10">
                            <path fill="#f9fafb" d="M0,0 L1440,0 L1440,160 C1200,160 1000,20 720,20 C440,20 200,160 0,80 Z"></path>
                        </svg>

                        {/* Background Images / Overlay */}
                        <div className="absolute right-0 top-0 w-full md:w-3/5 h-full opacity-70 z-0">
                            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1541888081622-671fa3e5c986?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center [mask-image:linear-gradient(to_right,transparent_10%,black_70%)] mix-blend-luminosity"></div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8 pt-24 md:pt-32 pb-16 md:pb-20">
                            <div className="text-center lg:text-left lg:w-3/5">
                                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">Punya Proyek Fasade?</h2>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-wmu-accent mb-6 tracking-tight">Mari Wujudkan Bersama {pengaturan?.nama_perusahaan || 'WMU'}</h2>
                                <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    Konsultasikan kebutuhan proyek Anda sekarang juga dan dapatkan solusi konstruksi fasade terbaik dari kami.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0 mt-8 lg:mt-0">
                                <a
                                    href={`https://wa.me/${formattedWa}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-wmu-accent hover:bg-yellow-600 text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg flex items-center justify-center shrink-0"
                                >
                                    Konsultasi Gratis <ArrowRight size={18} className="ml-2" />
                                </a>
                                <a
                                    href={`tel:${waNumber}`}
                                    className="border border-wmu-accent hover:bg-wmu-accent hover:text-white text-white px-8 py-3.5 rounded-lg font-bold transition-all flex items-center justify-center shrink-0 group"
                                >
                                    <Phone size={18} className="mr-2 text-wmu-accent group-hover:text-white transition-colors" /> {pengaturan?.no_telepon || '(021) 1234 5678'}
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                    {/* Footer Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
                        {/* Col 1: Logo & About (3/12) */}
                        <div className="lg:col-span-3">
                            <div className="mb-6">
                                <img src="/images/logonobg.png" alt="WMU Logo" className="h-10 w-auto object-contain" />
                            </div>
                            <p className="text-gray-400 text-xs leading-relaxed mb-4">
                                {pengaturan?.nama_perusahaan || 'PT. Win Mulya Utama'} adalah perusahaan kontraktor profesional yang siap mewujudkan proyek konstruksi berkualitas tinggi dengan standar terbaik.
                            </p>
                            {/* Legal Info */}
                            <div className="space-y-1.5 text-[11px] text-gray-500 border-t border-gray-700/50 pt-4">
                                <div className="flex gap-2"><span className="text-gray-600 w-14 shrink-0">NIB</span><span className="text-gray-400">1806250095772</span></div>
                                <div className="flex gap-2"><span className="text-gray-600 w-14 shrink-0">NPWP</span><span className="text-gray-400">1000.0000.0312.5557</span></div>
                            </div>
                            <div className="flex items-center gap-2 mt-5">
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:bg-wmu-accent hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:bg-wmu-accent hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:bg-wmu-accent hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:bg-wmu-accent hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Col 2: Menu (2/12) */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-sm mb-6">Menu</h3>
                            <ul className="space-y-3 text-xs text-gray-400">
                                <li><Link href="/" className="hover:text-wmu-accent transition-colors">Home</Link></li>
                                <li><Link href="/tentang-kami" className="hover:text-wmu-accent transition-colors">Tentang Kami</Link></li>
                                <li><Link href="/layanan" className="hover:text-wmu-accent transition-colors">Layanan</Link></li>
                                <li><Link href="/proyek" className="hover:text-wmu-accent transition-colors">Proyek</Link></li>
                                <li><Link href="/blog" className="hover:text-wmu-accent transition-colors">Blog</Link></li>
                                <li><Link href="#" className="hover:text-wmu-accent transition-colors">FAQ</Link></li>
                            </ul>
                        </div>

                        {/* Col 3: Layanan (2/12) */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-sm mb-6">Layanan</h3>
                            <ul className="space-y-3 text-xs text-gray-400">
                                <li><Link href="/layanan" className="hover:text-wmu-accent transition-colors">General Contractor</Link></li>
                                <li><Link href="/layanan" className="hover:text-wmu-accent transition-colors">Design & Build</Link></li>
                                <li><Link href="/layanan" className="hover:text-wmu-accent transition-colors">Interior Construction</Link></li>
                                <li><Link href="/layanan" className="hover:text-wmu-accent transition-colors">Renovasi Gedung</Link></li>
                                <li><Link href="/layanan" className="hover:text-wmu-accent transition-colors">Mechanical Electrical</Link></li>
                                <li><Link href="/layanan" className="hover:text-wmu-accent transition-colors">Project Management</Link></li>
                            </ul>
                        </div>

                        {/* Col 4: Info Perusahaan (2/12) */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-sm mb-6">Info Perusahaan</h3>
                            <div className="space-y-4 text-xs text-gray-400">
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Direktur Utama</p>
                                    <p className="text-gray-300 font-medium">Win Ali</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Domisili Office</p>
                                    <p className="leading-relaxed">Jl. Meruya Selatan No.12, RT.1/RW.8, Meruya Selatan, Kec. Kembangan, Jakarta Barat</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Workshop</p>
                                    <p className="leading-relaxed">Jl. H. Masim, RT.17/RW.4, Meruya Utara, Kec. Kembangan, Jakarta Barat 11620</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Akte Pendirian</p>
                                    <p className="leading-relaxed text-[10px]">AHU-0133197.AH.01.11 Tgl. 17 Juni 2025</p>
                                </div>
                            </div>
                        </div>

                        {/* Col 5: Kontak & Newsletter (3/12) */}
                        <div className="lg:col-span-3">
                            <h3 className="text-white font-bold text-sm mb-6">Kontak</h3>
                            <div className="space-y-3 text-xs text-gray-400 mb-6">
                                <div className="flex items-center gap-3">
                                    <Phone size={14} className="shrink-0 text-wmu-accent" />
                                    <span>{pengaturan?.no_telepon || '0852-6031-8481'}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail size={14} className="shrink-0 text-wmu-accent mt-0.5" />
                                    <div>
                                        <p>office@winmulyautama.com</p>
                                        <p className="mt-1">winmulyautama@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe size={14} className="shrink-0 text-wmu-accent" />
                                    <span>www.winmulyautama.com</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-700/50 pt-5">
                                <p className="text-gray-400 text-xs leading-relaxed mb-3">Dapatkan update proyek & tips konstruksi terbaru.</p>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Email Anda"
                                        className="w-full bg-transparent border border-gray-700 text-white text-xs rounded-md px-4 py-2.5 focus:outline-none focus:border-wmu-accent transition-colors pr-10"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-wmu-accent transition-colors">
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500">
                        <p>&copy; {new Date().getFullYear()} {pengaturan?.nama_perusahaan || 'WMU'}. All Rights Reserved.</p>
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-gray-300 transition-colors">Terms & Condition</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <a
                href={`https://wa.me/${formattedWa}`}
                target="_blank"
                rel="noreferrer"
                className="fixed bottom-8 right-8 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#1EBE57] transition-all transform hover:scale-110 z-50 flex items-center justify-center group"
                aria-label="Chat via WhatsApp"
            >
                <MessageCircle size={28} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    1
                </span>
                <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none whitespace-nowrap">
                    Butuh Bantuan?
                </span>
            </a>
        </div>
    );
}
