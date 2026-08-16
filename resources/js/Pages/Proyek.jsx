import { useState, useRef, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Users, Map, ThumbsUp, Play, ChevronLeft, ChevronRight,
    LayoutGrid, Building, Factory, Home, ShieldCheck, MapPin, Calendar, CheckCircle2, ArrowRight,
    Quote, Star, Target, Clock
} from 'lucide-react';


export default function Proyek() {
    const { pengaturan, proyek, klien = [] } = usePage().props;
    const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const genericReviews = [
        "Profesional, responsif, dan selalu mengutamakan kualitas. PT WMU adalah mitra terpercaya kami dalam setiap proyek.",
        "Hasil pekerjaan rapi dan sesuai standar internasional. Tim WMU sangat berpengalaman dan kompeten di bidangnya.",
        "Memberikan hasil fasade yang sangat memuaskan. Kualitas material dan ketepatan waktu menjadi nilai lebih bagi kami.",
        "Kerja sama yang luar biasa. Manajemen proyek yang tertata dengan baik membuat pekerjaan selesai tepat waktu.",
        "Sangat direkomendasikan untuk proyek skala besar. Inovasi dan solusi yang ditawarkan sangat membantu kelancaran proyek."
    ];

    // Get featured projects (unggulan)
    const featuredProjects = (proyek && proyek.length > 0) 
        ? proyek.filter(p => p.prk_is_unggulan === 1 || p.prk_is_unggulan === true) 
        : [];
        
    // Fallback if none are marked as unggulan
    const displayFeatured = featuredProjects.length > 0 ? featuredProjects : (proyek && proyek.length > 0 ? [proyek[0]] : []);

    // Auto-slide effect for featured projects
    useEffect(() => {
        if (displayFeatured.length > 1) {
            const timer = setInterval(() => {
                setCurrentFeaturedIndex((prev) => (prev + 1) % displayFeatured.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [displayFeatured.length]);

    // Auto-slide for Testimonials/Klien
    useEffect(() => {
        if (klien && klien.length > 1) {
            const testiTimer = setInterval(() => {
                if (testiSliderRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = testiSliderRef.current;
                    if (scrollLeft + clientWidth >= scrollWidth - 10) {
                        testiSliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollSlider(testiSliderRef, 'right');
                    }
                }
            }, 3000);
            return () => clearInterval(testiTimer);
        }
    }, [klien]);

    const project = displayFeatured.length > 0 ? displayFeatured[currentFeaturedIndex] : null;

    const projectSliderRef = useRef(null);
    const testiSliderRef = useRef(null);

    const galeri = project && project.prk_galeri ? JSON.parse(project.prk_galeri) : [];
    const thumbnails = project ? [project.prk_gambar, ...galeri].filter(Boolean).map(t => `/storage/${t}`) : [];

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % (thumbnails.length || 1));
    };

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + (thumbnails.length || 1)) % (thumbnails.length || 1));
    };

    const scrollSlider = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <PublicLayout>
            <SeoHead 
                title="Proyek Pilihan" 
                description="Eksplorasi portofolio proyek konstruksi terbaik kami yang telah diselesaikan dengan standar kualitas tertinggi."
            />

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
                    {project ? (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={project.prk_id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-0 mb-16"
                            >
                                {/* Left Column: Details */}
                                <div className="lg:w-[30%] lg:pr-8 flex flex-col justify-between">
                                    <div>
                                        <div className="text-wmu-accent text-xs font-bold tracking-widest uppercase mb-4">PROYEK UNGGULAN</div>
                                        <h3 className="text-3xl lg:text-4xl font-extrabold text-wmu-dark mb-4 leading-tight">{project.prk_judul}</h3>
                                        <div className="inline-block border border-wmu-accent text-wmu-accent text-xs font-semibold px-3 py-1 rounded-md mb-6">
                                            {project.prk_kategori}
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                            {project.prk_deskripsi || "Proyek unggulan dari PT Winmulyautama yang mewakili standar kualitas dan profesionalisme tinggi."}
                                        </p>

                                        <div className="space-y-5 mb-8">
                                            <div className="flex gap-4">
                                                <div className="mt-1"><MapPin size={20} className="text-wmu-accent" /></div>
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Klien</div>
                                                    <div className="text-sm font-semibold text-wmu-dark">{project.prk_klien}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="mt-1"><Calendar size={20} className="text-wmu-accent" /></div>
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Tahun</div>
                                                    <div className="text-sm font-semibold text-wmu-dark">{project.prk_tahun}</div>
                                                </div>
                                            </div>
                                            {project.prk_luas && (
                                                <div className="flex gap-4">
                                                    <div className="mt-1"><Building2 size={20} className="text-wmu-accent" /></div>
                                                    <div>
                                                        <div className="text-xs text-gray-500 mb-1">Area / Fasade</div>
                                                        <div className="text-sm font-semibold text-wmu-dark">{project.prk_luas}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <Link href={route('proyek.detail', project.prk_slug)} className="bg-wmu-dark hover:bg-[#021f2b] text-white px-6 py-4 rounded-xl font-bold transition-colors w-full flex items-center justify-between group mt-auto">
                                        Lihat Detail Proyek
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Middle Column: Images */}
                                <div className="lg:w-[45%] relative">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 group cursor-pointer shadow-lg">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={activeImageIndex}
                                                src={thumbnails[activeImageIndex] || (project.prk_gambar ? `/storage/${project.prk_gambar}` : 'https://placehold.co/800x600?text=No+Image')}
                                                alt={project.prk_judul}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-full h-full object-cover"
                                            />
                                        </AnimatePresence>
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-wmu-accent shadow-xl group-hover:scale-110 transition-transform">
                                                <Link href={route('proyek.detail', project.prk_slug)} className="flex items-center justify-center w-full h-full text-wmu-accent">
                                                    <Play size={24} className="ml-1" fill="currentColor" />
                                                </Link>
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
                                        {thumbnails.map((thumb, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImageIndex(idx)}
                                                className={`relative w-1/5 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === idx ? 'border-[#DFA639] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                            >
                                                <img src={thumb} alt={`Thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
                                                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{project.prk_tantangan || "Mengutamakan keselamatan kerja dan spesifikasi."}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="mt-1"><CheckCircle2 size={24} className="text-wmu-accent" /></div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1">Solusi</h4>
                                                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{project.prk_solusi || "Pengerjaan sesuai dengan standar dan arahan profesional."}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1"><ThumbsUp size={24} className="text-wmu-accent" /></div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1">Hasil</h4>
                                                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{project.prk_hasil || "Memuaskan dengan penyelesaian yang tepat waktu."}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ) : null}

                    {/* Dots indicator for Featured Project section */}
                    {displayFeatured.length > 1 && (
                        <div className="flex justify-center items-center gap-2 mb-16">
                            {displayFeatured.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentFeaturedIndex(idx)}
                                    className={`h-2 rounded-full transition-all ${idx === currentFeaturedIndex ? 'w-8 bg-wmu-accent' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                                    aria-label={`Slide ke ${idx + 1}`}
                                ></button>
                            ))}
                        </div>
                    )}

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
                            <Link href="/semua-proyek" className="bg-wmu-dark hover:bg-[#021f2b] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-auto">
                                Lihat Semua Proyek <ArrowRight size={18} />
                            </Link>
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
                            {proyek.map((item) => (
                                <div key={item.prk_id} className="min-w-[280px] md:min-w-[300px] bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 snap-start border border-gray-100 group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={`/storage/${item.prk_gambar}`} alt={item.prk_judul} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-wmu-dark/90 to-transparent flex items-end p-4">
                                            <span className="text-white text-xs font-semibold px-2 py-1 bg-wmu-dark/80 backdrop-blur-sm rounded">
                                                {item.prk_kategori}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-wmu-dark mb-4 line-clamp-1 group-hover:text-wmu-accent transition-colors">{item.prk_judul}</h3>

                                        <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={14} className="text-wmu-accent" />
                                                <span className="line-clamp-1 max-w-[120px]">{item.prk_klien}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                {item.prk_tahun}
                                            </div>
                                        </div>

                                        <Link href={route('proyek.detail', item.prk_slug)} className="text-wmu-accent font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all w-fit">
                                            Lihat Detail <ArrowRight size={14} />
                                        </Link>
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

                                {/* Left Button */}
                                <button
                                    onClick={() => scrollSlider(testiSliderRef, 'left')}
                                    className="hidden md:flex absolute left-[-10px] lg:left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 border border-gray-200 hover:border-wmu-dark text-gray-500 hover:text-wmu-dark bg-white rounded-full items-center justify-center shadow-md hover:shadow-lg transition-all z-10"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                
                                {/* Right Button */}
                                <button
                                    onClick={() => scrollSlider(testiSliderRef, 'right')}
                                    className="hidden md:flex absolute right-[-10px] lg:right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 border border-gray-200 hover:border-wmu-dark text-gray-500 hover:text-wmu-dark bg-white rounded-full items-center justify-center shadow-md hover:shadow-lg transition-all z-10"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                <div
                                    ref={testiSliderRef}
                                    className="flex overflow-x-auto gap-6 snap-x snap-mandatory hide-scrollbar pb-6 px-4 -mx-4"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {klien.map((item, idx) => (
                                        <div key={item.id_klien || idx} className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6 md:p-8 flex-shrink-0 snap-center flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <img src={`/storage/${item.logo}`} alt={item.nama_klien} loading="lazy" decoding="async" className="h-12 md:h-16 object-contain max-w-[120px] md:max-w-[150px]" />
                                                    <div className="flex gap-0.5 mt-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={14} className="text-[#DFA639] fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-8 italic">
                                                    "{genericReviews[idx % genericReviews.length]}"
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-wmu-dark text-sm">{item.nama_klien}</h4>
                                                <p className="text-xs text-gray-500">Mitra Klien</p>
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
