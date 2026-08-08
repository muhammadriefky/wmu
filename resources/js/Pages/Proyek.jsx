import { useState, useRef } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Users, Map, ThumbsUp, Play, ChevronLeft, ChevronRight,
    LayoutGrid, Building, Factory, Home, ShieldCheck, MapPin, Calendar, CheckCircle2, ArrowRight,
    Quote, Star, Target, Clock
} from 'lucide-react';


const mockProyekData = [
    {
        id: 1,
        judul: "Grand City Office Tower",
        kategori: "Commercial Building",
        kategoriId: "commercial",
        deskripsi: "Pengerjaan fasade unitized curtain wall dengan sistem high performance untuk bangunan perkantoran 20 lantai.",
        lokasi: "Jakarta Selatan, DKI Jakarta",
        tahun: "2024",
        luas: "10.500 m²",
        tantangan: "Desain kompleks dengan tuntutan estetika tinggi dan efisiensi energi.",
        solusi: "Sistem unitized dengan kaca low-e dan sealant berkualitas tinggi.",
        hasil: "Fasad berperforma tinggi dengan tampilan modern dan presisi.",
        gambarMain: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1541881518018-97cce025fb2b?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=400&auto=format&fit=crop"
        ]
    }
];

const mockSemuaProyek = [
    { id: 101, judul: "Grand City Office Tower", kategori: "Commercial Building", lokasi: "Jakarta Selatan, DKI Jakarta", tahun: "2024", gambar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop" },
    { id: 102, judul: "Industrial Warehouse", kategori: "Industrial", lokasi: "Cikarang, Jawa Barat", tahun: "2024", gambar: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508c0?q=80&w=400&auto=format&fit=crop" },
    { id: 103, judul: "Mulia Resort & Hotel", kategori: "Hospitality", lokasi: "Bali, Indonesia", tahun: "2023", gambar: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=400&auto=format&fit=crop" },
    { id: 104, judul: "Airport Terminal Building", kategori: "Public Facility", lokasi: "Tangerang, Banten", tahun: "2023", gambar: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format&fit=crop" },
    { id: 105, judul: "Apartement Grand City", kategori: "Residential", lokasi: "Bandung, Jawa Barat", tahun: "2024", gambar: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop" }
];

const mockTestimoni = [
    { id: 1, klien: "WIKA", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/2/23/Wijaya_Karya_Logo.svg/320px-Wijaya_Karya_Logo.svg.png", rating: 5, ulasan: "Profesional, responsif, dan selalu mengutamakan kualitas. PT WMU adalah mitra terpercaya kami dalam setiap proyek.", nama: "Dewi Lestari", jabatan: "Construction Director" },
    { id: 2, klien: "Sinarmas Land", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sinarmas_Land_Logo.svg/320px-Sinarmas_Land_Logo.svg.png", rating: 5, ulasan: "Hasil pekerjaan rapi dan sesuai standar internasional, Tim WMU sangat berpengalaman dan kompeten.", nama: "Andi Setiawan", jabatan: "Head of Engineering" },
    { id: 3, klien: "Astra", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Astra_International_logo.svg/320px-Astra_International_logo.svg.png", rating: 5, ulasan: "WMU memberikan hasil fasade yang sangat memuaskan. Kualitas material dan ketepatan waktu menjadi nilai lebih bagi kami.", nama: "Budi Santoso", jabatan: "Project Manager" }
];

export default function Proyek() {
    const { pengaturan } = usePage().props;
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const project = mockProyekData[0]; // Currently showing one featured project as per design

    const projectSliderRef = useRef(null);
    const testiSliderRef = useRef(null);

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % project.thumbnails.length);
    };

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + project.thumbnails.length) % project.thumbnails.length);
    };

    const scrollSlider = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`Portofolio Proyek - ${pengaturan?.nama_perusahaan || 'WMU'}`}</title>
                <meta name="description" content="Kumpulan karya dan portofolio proyek konstruksi dari PT Winmulyautama." />
            </Head>

            {/* Hero Section */}
            <section className="bg-wmu-dark text-white pt-32 pb-32 md:pb-48 relative overflow-hidden">
                {/* Background Image (Right Side) */}
                <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full opacity-30 lg:opacity-100 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        alt="Proyek Background"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Gradient Overlay to blend seamlessly with the left dark background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-wmu-dark via-transparent to-transparent"></div>
                </div>

                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none z-0"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center">
                    <div className="lg:w-3/4 lg:pr-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-sm font-bold tracking-wider text-gray-400 mb-4 uppercase flex items-center gap-2"
                        >
                            Home <ChevronRight size={14} className="text-[#DFA639]" /> <span className="text-white">Proyek</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
                        >
                            Proyek Kami,<br />
                            Hasil Nyata <span className="text-wmu-accent">Komitmen Kami</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-300 max-w-xl text-lg mb-12 leading-relaxed drop-shadow-md"
                        >
                            Kami telah menyelesaikan berbagai proyek konstruksi fasade dengan standar kualitas tertinggi untuk berbagai sektor industri.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap md:flex-nowrap gap-y-8 gap-x-2 w-full max-w-4xl"
                        >
                            {/* Stat 1 */}
                            <div className="flex items-start gap-3 w-1/2 md:w-1/4 relative pr-4">
                                <Building2 className="text-wmu-accent shrink-0 mt-1" size={28} strokeWidth={1.5} />
                                <div>
                                    <div className="text-xl md:text-2xl font-bold leading-none mb-1">150+</div>
                                    <div className="text-xs text-gray-400">Proyek Selesai</div>
                                </div>
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/10"></div>
                            </div>

                            {/* Stat 2 */}
                            <div className="flex items-start gap-3 w-1/2 md:w-1/4 relative md:pl-6 pr-4">
                                <Users className="text-wmu-accent shrink-0 mt-1" size={28} strokeWidth={1.5} />
                                <div>
                                    <div className="text-xl md:text-2xl font-bold leading-none mb-1">50+</div>
                                    <div className="text-xs text-gray-400">Klien</div>
                                </div>
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/10"></div>
                            </div>

                            {/* Stat 3 */}
                            <div className="flex items-start gap-3 w-1/2 md:w-1/4 relative md:pl-6 pr-4">
                                <Building className="text-wmu-accent shrink-0 mt-1" size={28} strokeWidth={1.5} />
                                <div>
                                    <div className="text-xl md:text-2xl font-bold leading-none mb-1">1.000.000+ m²</div>
                                    <div className="text-xs text-gray-400">Area Fasad Terpasang</div>
                                </div>
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/10"></div>
                            </div>

                            {/* Stat 4 */}
                            <div className="flex items-start gap-3 w-1/2 md:w-1/4 relative md:pl-6">
                                <CheckCircle2 className="text-wmu-accent shrink-0 mt-1" size={28} strokeWidth={1.5} />
                                <div>
                                    <div className="text-xl md:text-2xl font-bold leading-none mb-1">98%</div>
                                    <div className="text-xs text-gray-400">Kepuasan Klien</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Wave Divider placed absolutely at the bottom of hero - Actually wait, let me just keep it outside but fix margin */}
            <div className="relative -mt-16 md:-mt-24 lg:-mt-32 z-20 overflow-hidden leading-[0]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-16 md:h-24 lg:h-32">
                    <path fill="#f9fafb" fillOpacity="1" d="M0,256L60,234.7C120,213,240,171,360,138.7C480,107,600,85,720,101.3C840,117,960,171,1080,181.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>

            {/* Main Content Area */}
            <section className="bg-gray-50 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-4 md:-mt-8 lg:-mt-12">

                    {/* Featured Project Showcase */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-0 mb-16"
                    >
                        {/* Left Column: Details */}
                        <div className="lg:w-[30%] lg:pr-8 flex flex-col justify-between">
                            <div>
                                <div className="text-wmu-accent text-xs font-bold tracking-widest uppercase mb-4">PROYEK UNGGULAN</div>
                                <h3 className="text-3xl lg:text-4xl font-extrabold text-wmu-dark mb-4 leading-tight">{project.judul}</h3>
                                <div className="inline-block border border-wmu-accent text-wmu-accent text-xs font-semibold px-3 py-1 rounded-md mb-6">
                                    {project.prk_kategori}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                    {project.deskripsi}
                                </p>

                                <div className="space-y-5 mb-8">
                                    <div className="flex gap-4">
                                        <div className="mt-1"><MapPin size={20} className="text-wmu-accent" /></div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Lokasi</div>
                                            <div className="text-sm font-semibold text-wmu-dark">{project.lokasi}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1"><Calendar size={20} className="text-wmu-accent" /></div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Tahun</div>
                                            <div className="text-sm font-semibold text-wmu-dark">{project.tahun}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1"><Building2 size={20} className="text-wmu-accent" /></div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Luas Fasade</div>
                                            <div className="text-sm font-semibold text-wmu-dark">{project.luas}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="bg-wmu-dark hover:bg-[#021f2b] text-white px-6 py-4 rounded-xl font-bold transition-colors w-full flex items-center justify-between group mt-auto">
                                Lihat Detail Proyek
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Middle Column: Images */}
                        <div className="lg:w-[45%] relative">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 group cursor-pointer shadow-lg">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImageIndex}
                                        src={project.thumbnails[activeImageIndex]}
                                        alt={project.judul}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-wmu-accent shadow-xl group-hover:scale-110 transition-transform">
                                        <Play size={24} className="ml-1" fill="currentColor" />
                                    </div>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-wmu-dark/80 hover:bg-wmu-dark text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-wmu-dark/80 hover:bg-wmu-dark text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10">
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 lg:gap-3 justify-between">
                                {project.thumbnails.map((thumb, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative w-1/5 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === idx ? 'border-[#DFA639] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Key Points */}
                        <div className="lg:w-[25%] bg-wmu-dark rounded-[1.5rem] p-6 lg:p-8 text-white lg:ml-6 flex flex-col justify-center space-y-8 relative overflow-hidden mt-8 lg:mt-0">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#DFA639]/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00BF62]/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <div className="flex items-start gap-4 mb-3">
                                    <div className="mt-1"><ShieldCheck size={24} className="text-wmu-accent" /></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Tantangan</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">{project.tantangan}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-start gap-4 mb-3">
                                    <div className="mt-1"><CheckCircle2 size={24} className="text-wmu-accent" /></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Solusi</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">{project.solusi}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1"><ThumbsUp size={24} className="text-wmu-accent" /></div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Hasil</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">{project.hasil}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dots indicator for Featured Project section */}
                    <div className="flex justify-center items-center gap-2 mb-16">
                        <div className="w-8 h-2 rounded-full bg-wmu-accent"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>

                    {/* Stats Banner Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-wmu-dark rounded-[1.5rem] p-8 md:p-10 mb-24 relative overflow-hidden shadow-2xl"
                    >
                        {/* Wavy line pattern background */}
                        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMCAxMDBDMjAwIDAgNDAwIDIwMCA2MDAgMTAwUzEwMDAgMCAxMjAwIDEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTAgMTIwaDIwMGMwLTEwMCAyMDAtMTAwIDIwMCAwUzgwMCAyMjAgMTAwMCAxMjBoMjAwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] bg-repeat-x bg-center" style={{ backgroundSize: '400px auto' }}></div>

                        <div className="flex flex-wrap md:flex-nowrap justify-between gap-8 md:gap-4 relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
                            {/* Stat 1 */}
                            <div className="w-full md:w-1/5 flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                                <LayoutGrid className="text-wmu-accent mb-3" size={36} strokeWidth={1.5} />
                                <div className="text-3xl font-bold text-white mb-1">150+</div>
                                <div className="text-sm text-gray-400">Proyek Selesai</div>
                            </div>

                            {/* Stat 2 */}
                            <div className="w-full md:w-1/5 flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                                <Building2 className="text-wmu-accent mb-3" size={36} strokeWidth={1.5} />
                                <div className="text-3xl font-bold text-white mb-1">1.000.000+ m²</div>
                                <div className="text-sm text-gray-400">Total Area Fasade</div>
                            </div>

                            {/* Stat 3 */}
                            <div className="w-full md:w-1/5 flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                                <Users className="text-wmu-accent mb-3" size={36} strokeWidth={1.5} />
                                <div className="text-3xl font-bold text-white mb-1">50+</div>
                                <div className="text-sm text-gray-400">Klien Korporasi</div>
                            </div>

                            {/* Stat 4 */}
                            <div className="w-full md:w-1/5 flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                                <Target className="text-wmu-accent mb-3" size={36} strokeWidth={1.5} />
                                <div className="text-3xl font-bold text-white mb-1">100%</div>
                                <div className="text-sm text-gray-400">On Time Project</div>
                            </div>

                            {/* Stat 5 */}
                            <div className="w-full md:w-1/5 flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                                <ShieldCheck className="text-wmu-accent mb-3" size={36} strokeWidth={1.5} />
                                <div className="text-3xl font-bold text-white mb-1">98%</div>
                                <div className="text-sm text-gray-400">Kepuasan Klien</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Portofolio Proyek Section */}
                    <div className="mb-24 relative">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                            <div>
                                <div className="text-wmu-accent text-xs font-bold tracking-widest uppercase mb-2">SEMUA PROYEK</div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-wmu-dark">Portofolio Proyek Kami</h2>
                            </div>
                            <button className="bg-wmu-dark hover:bg-[#021f2b] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-auto">
                                Lihat Semua Proyek <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* Slider Controls */}
                        <button
                            onClick={() => scrollSlider(projectSliderRef, 'left')}
                            className="hidden md:flex absolute left-[-24px] top-[55%] -translate-y-1/2 w-12 h-12 bg-wmu-dark hover:bg-wmu-dark text-white rounded-full items-center justify-center shadow-lg transition-colors z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={() => scrollSlider(projectSliderRef, 'right')}
                            className="hidden md:flex absolute right-[-24px] top-[55%] -translate-y-1/2 w-12 h-12 bg-wmu-dark hover:bg-[#021f2b] text-white rounded-full items-center justify-center shadow-lg transition-colors z-10"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Slider Container */}
                        <div
                            ref={projectSliderRef}
                            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {mockSemuaProyek.map((item) => (
                                <div key={item.id} className="min-w-[280px] md:min-w-[300px] bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 snap-start border border-gray-100 group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={item.prk_gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-wmu-dark/90 to-transparent flex items-end p-4">
                                            <span className="text-white text-xs font-semibold px-2 py-1 bg-wmu-dark/80 backdrop-blur-sm rounded">
                                                {item.prk_kategori}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-wmu-dark mb-4 line-clamp-1 group-hover:text-wmu-accent transition-colors">{item.judul}</h3>

                                        <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={14} className="text-wmu-accent" />
                                                <span className="line-clamp-1 max-w-[120px]">{item.lokasi}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                {item.tahun}
                                            </div>
                                        </div>

                                        <button className="text-wmu-accent font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                                            Lihat Detail <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dots indicator for Portfolio slider */}
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <div className="w-8 h-2 rounded-full bg-wmu-accent"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        </div>
                    </div>

                    {/* Testimonials Section */}
                    <div className="relative">
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

                            {/* Left Text */}
                            <div className="lg:w-1/3 w-full">
                                <div className="text-wmu-accent text-xs font-bold tracking-widest uppercase mb-2">TESTIMONI KLIEN</div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-wmu-dark mb-6">Apa Kata Klien Kami</h2>
                                <Quote size={64} className="text-wmu-accent opacity-40 fill-current" />
                            </div>

                            {/* Right Slider */}
                            <div className="lg:w-2/3 w-full relative">

                                <button
                                    onClick={() => scrollSlider(testiSliderRef, 'right')}
                                    className="hidden md:flex absolute right-[-24px] top-1/2 -translate-y-1/2 w-10 h-10 border border-gray-300 hover:border-wmu-dark text-gray-500 hover:text-wmu-dark bg-white rounded-full items-center justify-center shadow-sm transition-colors z-10"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                <div
                                    ref={testiSliderRef}
                                    className="flex overflow-x-auto gap-6 snap-x snap-mandatory hide-scrollbar pb-4"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {mockTestimoni.map((item) => (
                                        <div key={item.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex-shrink-0 snap-start flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <img src={item.logo} alt={item.klien} className="h-8 object-contain max-w-[120px]" />
                                                    <div className="flex gap-0.5">
                                                        {[...Array(item.rating)].map((_, i) => (
                                                            <Star key={i} size={14} className="text-[#DFA639] fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                                    "{item.ulasan}"
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-wmu-dark text-sm">{item.nama}</h4>
                                                <p className="text-xs text-gray-500">{item.jabatan}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </PublicLayout>
    );
}
