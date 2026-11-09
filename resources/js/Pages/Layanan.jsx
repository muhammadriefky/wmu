import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { waLink } from '@/utils/contact';
import SeoHead from '@/Components/SeoHead';
import { storageUrl } from '@/utils/storage';
import { motion } from 'framer-motion';
import {
    ArrowRight, HardHat, CheckCircle2,
    Building2, Briefcase, Users, Clock,
    ChevronRight, ChevronLeft, CheckCircle,
    ShieldCheck, Layers, Settings, MessageSquare,
    Map, PenTool, Calculator, Wrench, Search, Award, Shield, FileText, Zap
} from 'lucide-react';

export default function Layanan({ layanan, klien, layananTambahan }) {
    const { pengaturan } = usePage().props;
    const [activeKategoriKlien, setActiveKategoriKlien] = useState('Semua');

    // Dapatkan kategori unik dari data klien (abaikan yang kosong)
    const uniqueKategori = klien ? [...new Set(klien.filter(k => k.kategori).map(k => k.kategori))] : [];
    
    // Filter klien berdasarkan kategori yang dipilih
    const filteredKlien = activeKategoriKlien === 'Semua' 
        ? klien 
        : klien.filter(k => k.kategori === activeKategoriKlien);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <PublicLayout>
            <SeoHead 
                title="Layanan Kami" 
                description="Berbagai layanan konstruksi profesional dari WMU Construction untuk mewujudkan proyek impian Anda."
            />

            {/* Hero Section */}
            <section className="relative bg-wmu-dark text-white min-h-[70vh] flex flex-col justify-center overflow-hidden">
                {/* Right side image */}
                <div className="absolute inset-0 z-0 flex justify-end">
                    <div className="w-full lg:w-[65%] h-full relative">
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
                            alt="Hero Background"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark gradient for mobile */}
                        <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/90 to-wmu-dark/60 lg:hidden"></div>
                    </div>
                </div>

                {/* Diagonal dark shape for large screens */}
                <div
                    className="absolute inset-0 z-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/80 to-wmu-dark/30 hidden lg:block backdrop-blur-sm"
                    style={{ clipPath: 'polygon(0 0, 50% 0, 75% 100%, 0% 100%)' }}
                ></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-24">
                    <div className="lg:w-3/4">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                            }}
                        >
                            {/* Breadcrumb */}
                            <motion.div variants={fadeInUp} className="text-gray-300 text-sm mb-6 flex items-center gap-2">
                                <Link href="/" className="hover:text-wmu-accent transition-colors">Home</Link>
                                <ChevronRight size={14} className="text-wmu-accent" />
                                <span className="text-gray-100 font-medium">Layanan Kami</span>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
                                Layanan Kami
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-12 max-w-xl leading-relaxed">
                                Kami menyediakan layanan konstruksi secara menyeluruh mulai dari perencanaan, perhitungan, hingga instalasi dengan standar kualitas tertinggi dan teknologi terkini.
                            </motion.p>

                            {/* Stats Row */}
                            <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-0 pt-8 max-w-4xl">
                                <div className="flex items-center gap-3 sm:gap-4 lg:border-r border-gray-600/50 pr-4 lg:pr-6">
                                    <Clock size={36} className="text-wmu-accent shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <div className="font-extrabold text-2xl text-wmu-accent leading-none mb-1.5">10+</div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Tahun Pengalaman</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-4 lg:border-r border-gray-600/50 lg:px-6">
                                    <Briefcase size={36} className="text-wmu-accent shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <div className="font-extrabold text-2xl text-wmu-accent leading-none mb-1.5">150+</div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Proyek Selesai</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-4 lg:border-r border-gray-600/50 lg:px-6">
                                    <Users size={36} className="text-wmu-accent shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <div className="font-extrabold text-2xl text-wmu-accent leading-none mb-1.5">50+</div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Klien Terpercaya</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-4 lg:px-6">
                                    <CheckCircle2 size={36} className="text-wmu-accent shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <div className="font-extrabold text-2xl text-wmu-accent leading-none mb-1.5">98%</div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Kepuasan Klien</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                    <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">LAYANAN KAMI</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Layanan Konstruksi Terintegrasi</h3>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
                        Kami menghadirkan layanan end-to-end dengan dukungan tim ahli dan teknologi modern untuk memastikan hasil yang aman, presisi, dan berkualitas tinggi.
                    </p>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {layanan && layanan.length > 0 ? (
                            layanan.map((item, index) => (
                                <motion.div
                                    key={item.id_layanan}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }
                                    }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group h-full"
                                >
                                    <div className="h-48 relative overflow-hidden bg-gray-100 shrink-0">
                                        {item.gambar ? (
                                            <img src={`/storage/${item.gambar}`} alt={item.judul_layanan} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <HardHat size={40} className="text-gray-300" />
                                            </div>
                                        )}
                                        {/* Icon Box overlapping */}
                                        <div className="absolute -bottom-1 left-6 bg-wmu-dark text-wmu-accent w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:-translate-y-2 transition-transform duration-300 z-10 border-2 border-white">
                                            <Building2 size={20} />
                                        </div>
                                    </div>

                                    <div className="pt-8 px-6 pb-6 flex-grow flex flex-col">
                                        {/* Number */}
                                        <div className="text-gray-300 font-bold text-lg mb-2 group-hover:text-wmu-accent transition-colors">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-wmu-accent transition-colors leading-snug">{item.judul_layanan}</h3>

                                        <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow">{item.deskripsi}</p>

                                        {/* Mock Features List based on description length or just standard layout */}
                                        <div className="space-y-2 mb-6 hidden">
                                            {/* We hide this part unless we have real features, to match the mockup we could parse lines, but keeping it simple */}
                                            <div className="flex items-start gap-2 text-[11px] text-gray-500">
                                                <CheckCircle size={12} className="text-wmu-accent mt-0.5 shrink-0" />
                                                <span>Detail Engineering</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-50 mt-auto">
                                            <Link
                                                href={route('layanan.detail', item.slug)}
                                                className="text-wmu-accent font-bold text-[11px] uppercase tracking-wider flex items-center group-hover:text-wmu-dark transition-colors"
                                            >
                                                Selengkapnya <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                Belum ada layanan yang ditambahkan. Silakan tambahkan dari panel admin.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats Banner Section */}
            <section className="bg-white pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-wmu-dark rounded-2xl p-6 md:p-8 flex flex-wrap justify-between items-center text-white gap-8 md:gap-4 shadow-xl border border-gray-800">
                        <div className="flex items-center gap-3">
                            <Briefcase size={28} className="text-wmu-accent" />
                            <div>
                                <div className="font-bold text-xl md:text-2xl leading-none">500+</div>
                                <div className="text-[11px] text-gray-400 mt-1">Proyek Selesai</div>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-gray-700"></div>
                        <div className="flex items-center gap-3">
                            <Users size={28} className="text-wmu-accent" />
                            <div>
                                <div className="font-bold text-xl md:text-2xl leading-none">50+</div>
                                <div className="text-[11px] text-gray-400 mt-1">Klien Korporasi</div>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-gray-700"></div>
                        <div className="flex items-center gap-3">
                            <Layers size={28} className="text-wmu-accent" />
                            <div>
                                <div className="font-bold text-xl md:text-2xl leading-none">1.000.000+ m²</div>
                                <div className="text-[11px] text-gray-400 mt-1">Area Terbangun</div>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-gray-700"></div>
                        <div className="flex items-center gap-3">
                            <Shield size={28} className="text-wmu-accent" />
                            <div>
                                <div className="font-bold text-xl md:text-2xl leading-none">0</div>
                                <div className="text-[11px] text-gray-400 mt-1">Kecelakaan Kerja</div>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-gray-700"></div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={28} className="text-wmu-accent" />
                            <div>
                                <div className="font-bold text-xl md:text-2xl leading-none">100%</div>
                                <div className="text-[11px] text-gray-400 mt-1">Quality Assurance</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Klien Kami Section */}
            <section className="bg-white pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-2">KLIEN KAMI</h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Dipercaya oleh Berbagai Industri</h3>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm mb-8">
                        Kami telah bekerja sama dengan berbagai perusahaan dan industri untuk menghadirkan solusi konstruksi terbaik.
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        <button 
                            onClick={() => setActiveKategoriKlien('Semua')}
                            className={`${activeKategoriKlien === 'Semua' ? 'bg-wmu-dark text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'} px-5 py-2 rounded-full text-xs font-semibold transition-colors`}
                        >
                            Semua
                        </button>
                        {uniqueKategori.map((kategori, index) => (
                            <button 
                                key={index}
                                onClick={() => setActiveKategoriKlien(kategori)}
                                className={`${activeKategoriKlien === kategori ? 'bg-wmu-dark text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'} px-5 py-2 rounded-full text-xs font-semibold transition-colors`}
                            >
                                {kategori}
                            </button>
                        ))}
                    </div>

                    {/* Logos Carousel Mock */}
                    <div className="flex items-center justify-center gap-4">
                        <button type="button" aria-hidden="true" tabIndex={-1} className="hidden md:flex w-10 h-10 shrink-0 rounded-full border border-gray-200 items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-wmu-dark transition-colors shadow-sm">
                            <ChevronLeft size={18} />
                        </button>

                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 flex-grow">
                            {filteredKlien && filteredKlien.length > 0 ? filteredKlien.slice(0, 6).map((k) => (
                                <div key={k.id_klien} className="w-[calc(50%-0.375rem)] sm:w-[150px] h-[80px] bg-white border border-gray-100 rounded-lg flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-gray-300 hover:shadow-md transition-all grayscale hover:grayscale-0 cursor-pointer overflow-hidden p-2">
                                    <img src={storageUrl(k.logo)} alt={k.nama_klien} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain" />
                                </div>
                            )) : (
                                /* Fallback mock klien */
                                [1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="w-[calc(50%-0.375rem)] sm:w-[150px] h-[80px] bg-white border border-gray-100 rounded-lg flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-gray-300 hover:shadow-md transition-all grayscale hover:grayscale-0 cursor-pointer">
                                        <Building2 size={32} className="text-gray-300" />
                                    </div>
                                ))
                            )}
                        </div>

                        <button type="button" aria-hidden="true" tabIndex={-1} className="hidden md:flex w-10 h-10 shrink-0 rounded-full border border-gray-200 items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-wmu-dark transition-colors shadow-sm">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Bottom Content: Mengapa Memilih Kami & Additional Layout */}
            <section className="bg-white pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* Left Side (1/3) - Mengapa Memilih Kami */}
                        <div className="lg:w-[35%]">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">MENGAPA MEMILIH KAMI?</h2>
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-5 leading-tight">Komitmen pada Kualitas, Presisi dan Keamanan</h3>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                Kami berkomitmen memberikan solusi terbaik dengan standar internasional dan inovasi berkelanjutan.
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="flex gap-4">
                                    <div className="mt-1 shrink-0 bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center border border-orange-100">
                                        <Award className="text-orange-500" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">Tim Ahli Bersertifikasi</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">Didukung profesional berpengalaman di bidang konstruksi.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 shrink-0 bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center border border-blue-100">
                                        <Zap className="text-blue-500" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">Teknologi Modern</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">Menggunakan software dan metode terkini.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 shrink-0 bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center border border-green-100">
                                        <ShieldCheck className="text-green-500" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">Standar Internasional</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">Mengacu pada standar mutu ISO dan SNI.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 shrink-0 bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center border border-red-100">
                                        <HardHat className="text-red-500" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">Keselamatan Kerja</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">Mengutamakan keselamatan (K3) pada setiap proses kerja.</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={waLink(pengaturan, 'Halo WMU, saya ingin konsultasi.')}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center bg-wmu-accent text-white px-8 py-3.5 rounded font-bold text-sm hover:bg-wmu-dark transition-colors shadow-md"
                            >
                                Konsultasi Gratis <ArrowRight size={16} className="ml-2" />
                            </a>
                        </div>

                        {/* Right Side (2/3) - Layanan Tambahan & Proses Kerja */}
                        <div className="lg:w-[65%] flex flex-col gap-14">

                            {/* Layanan Tambahan */}
                            <div>
                                <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">LAYANAN TAMBAHAN</h2>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Solusi Pendukung untuk Hasil Maksimal</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {(!layananTambahan || layananTambahan.length === 0) ? (
                                        <>
                                            <div className="bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-xl p-6 hover:shadow-lg transition-shadow group">
                                                <Layers className="text-wmu-accent mb-5 group-hover:scale-110 transition-transform" size={28} />
                                                <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-wmu-accent transition-colors">Material Supply</h4>
                                                <p className="text-gray-500 text-xs leading-relaxed">Penyediaan material konstruksi berkualitas dari brand terkemuka.</p>
                                            </div>
                                            <div className="bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-xl p-6 hover:shadow-lg transition-shadow group">
                                                <Settings className="text-wmu-accent mb-5 group-hover:scale-110 transition-transform" size={28} />
                                                <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-wmu-accent transition-colors">Mock Up Testing</h4>
                                                <p className="text-gray-500 text-xs leading-relaxed">Pembuatan mock up untuk memastikan desain dan performa.</p>
                                            </div>
                                            <div className="bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-xl p-6 hover:shadow-lg transition-shadow group">
                                                <Wrench className="text-wmu-accent mb-5 group-hover:scale-110 transition-transform" size={28} />
                                                <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-wmu-accent transition-colors">Maintenance</h4>
                                                <p className="text-gray-500 text-xs leading-relaxed">Perawatan berkala untuk menjaga performa bangunan tetap optimal.</p>
                                            </div>
                                            <div className="bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-xl p-6 hover:shadow-lg transition-shadow group">
                                                <MessageSquare className="text-wmu-accent mb-5 group-hover:scale-110 transition-transform" size={28} />
                                                <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-wmu-accent transition-colors">Consultation</h4>
                                                <p className="text-gray-500 text-xs leading-relaxed">Konsultasi teknis oleh tim ahli sesuai kebutuhan proyek Anda.</p>
                                            </div>
                                        </>
                                    ) : (
                                        layananTambahan.map((lt, idx) => (
                                            <div key={idx} className="bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-xl p-6 hover:shadow-lg transition-shadow group">
                                                <Layers className="text-wmu-accent mb-5 group-hover:scale-110 transition-transform" size={28} />
                                                <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-wmu-accent transition-colors">{lt.judul}</h4>
                                                <p className="text-gray-500 text-xs leading-relaxed">{lt.deskripsi}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Proses Kerja Kami */}
                            <div className="mt-4">
                                <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">PROSES KERJA KAMI</h2>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Alur Kerja yang Terstruktur dan Terintegrasi</h3>

                                <div className="relative pt-6">
                                    {/* Connecting line (dashed) */}
                                    <div className="hidden md:block absolute top-[38px] left-[5%] right-[5%] h-[2px] border-t-2 border-dashed border-gray-200 z-0"></div>

                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative z-10">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-10 h-10 rounded-full bg-wmu-dark text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg ring-4 ring-white">01</div>
                                            <h4 className="font-bold text-gray-900 text-xs mb-2 leading-tight">Konsultasi &<br />Brief</h4>
                                            <p className="text-gray-500 text-[10px] leading-relaxed px-1">Memahami kebutuhan dan tujuan proyek Anda.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center mt-12 md:mt-0">
                                            <div className="w-10 h-10 rounded-full bg-wmu-dark text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg ring-4 ring-white">02</div>
                                            <h4 className="font-bold text-gray-900 text-xs mb-2 leading-tight">Perencanaan</h4>
                                            <p className="text-gray-500 text-[10px] leading-relaxed px-1">Analisis, desain, dan perhitungan teknis.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-10 h-10 rounded-full bg-wmu-dark text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg ring-4 ring-white">03</div>
                                            <h4 className="font-bold text-gray-900 text-xs mb-2 leading-tight">Estimasi &<br />Budgeting</h4>
                                            <p className="text-gray-500 text-[10px] leading-relaxed px-1">Penyusunan estimasi biaya yang akurat.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center mt-12 md:mt-0">
                                            <div className="w-10 h-10 rounded-full bg-wmu-dark text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg ring-4 ring-white">04</div>
                                            <h4 className="font-bold text-gray-900 text-xs mb-2 leading-tight">Pelaksanaan</h4>
                                            <p className="text-gray-500 text-[10px] leading-relaxed px-1">Instalasi oleh tim ahli di lapangan.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-10 h-10 rounded-full bg-wmu-dark text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg ring-4 ring-white">05</div>
                                            <h4 className="font-bold text-gray-900 text-xs mb-2 leading-tight">Pengujian</h4>
                                            <p className="text-gray-500 text-[10px] leading-relaxed px-1">Quality Control untuk memastikan kualitas.</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center mt-12 md:mt-0">
                                            <div className="w-10 h-10 rounded-full bg-wmu-dark text-white flex items-center justify-center font-bold text-sm mb-4 shadow-lg ring-4 ring-white">06</div>
                                            <h4 className="font-bold text-gray-900 text-xs mb-2 leading-tight">Serah Terima</h4>
                                            <p className="text-gray-500 text-[10px] leading-relaxed px-1">Dokumentasi & garansi pasca proyek.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
