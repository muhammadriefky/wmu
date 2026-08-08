import { useState, useRef, useEffect } from 'react';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, CheckCircle2, Star, Play,
    Award, ShieldCheck, Users, Clock, Tag, Package, HardHat, Headphones,
    ChevronRight, ChevronLeft, MapPin, Building2, Plus,
    FileText, PenTool, ClipboardList, Activity, FileCheck, PhoneCall,
    Eye, Target, ChevronDown, MessageCircle, TrendingUp, Zap
} from 'lucide-react';

export default function Welcome({ layanan, keunggulan, klien, ulasan, proyek, blog, faq }) {
    const { pengaturan } = usePage().props;
    const [openFaq, setOpenFaq] = useState(null);
    const [currentUlasanIndex, setCurrentUlasanIndex] = useState(0);

    useEffect(() => {
        if (!ulasan || ulasan.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentUlasanIndex((prevIndex) =>
                prevIndex === ulasan.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [ulasan]);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_pemberi: '',
        isi_ulasan: '',
        rating_bintang: 5,
    });

    const submitUlasan = (e) => {
        e.preventDefault();
        post(route('ulasan.storePublic'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                alert('Terima kasih! Ulasan Anda telah dikirim dan menunggu persetujuan admin.');
            }
        });
    };

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef();
    const keunggulanRef = useRef();
    const layananRef = useRef();

    const scrollKeunggulan = (direction) => {
        if (keunggulanRef.current) {
            const scrollAmount = 300;
            keunggulanRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollLayanan = (direction) => {
        if (layananRef.current) {
            const scrollAmount = 320;
            layananRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const proyekRef = useRef();

    const scrollProyek = (direction) => {
        if (proyekRef.current) {
            const scrollAmount = 400;
            proyekRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };
    // -------------------------------------------------

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`Beranda - ${pengaturan?.nama_perusahaan || 'WMU'}`}</title>
            </Head>

            {/* Hero Section */}
            <section className="relative bg-wmu-dark text-white overflow-hidden min-h-[90vh] flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 bg-wmu-dark">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />

                    {/* Top gradient for navbar readability */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-wmu-dark/90 via-wmu-dark/50 to-transparent"></div>

                    {/* Mobile dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/80 to-wmu-dark/40 lg:hidden backdrop-blur-sm"></div>

                    {/* Desktop shape: pointing to the right, semi-transparent to see building */}
                    <div
                        className="hidden lg:block absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/80 to-wmu-dark/30 backdrop-blur-sm"
                        style={{ clipPath: 'polygon(0 0, 45% 0, 65% 50%, 45% 100%, 0 100%)' }}
                    >
                    </div>

                    {/* Desktop subtle accent line on the edge */}
                    <div
                        className="hidden lg:block absolute inset-0 bg-wmu-accent/80"
                        style={{ clipPath: 'polygon(45% 0, 45.5% 0, 65.5% 50%, 45.5% 100%, 45% 100%, 65% 50%)' }}
                    >
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-32 lg:py-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                        }}>
                            <motion.div variants={fadeInUp} className="text-wmu-accent font-bold tracking-widest text-sm uppercase mb-4">
                                BUILDING A BETTER FUTURE
                            </motion.div>
                            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                                Membangun Kualitas, Mewujudkan <span className="text-wmu-accent">Masa Depan</span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                                {pengaturan?.nama_perusahaan || 'WMU'} adalah perusahaan kontraktor berpengalaman yang siap mewujudkan proyek konstruksi berkualitas tinggi dengan standar terbaik.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-10">
                                <a href="#layanan" className="bg-wmu-accent hover:bg-green-600 text-white px-8 py-4 rounded-md font-bold transition-all flex items-center shadow-lg shadow-wmu-accent/30 hover:-translate-y-1">
                                    Konsultasi Gratis <ArrowRight size={20} className="ml-2" />
                                </a>
                                <a href="/proyek" className="bg-transparent border border-white/50 hover:bg-white/10 text-white px-8 py-4 rounded-md font-bold transition-all flex items-center">
                                    Lihat Proyek <Play size={20} className="ml-2" />
                                </a>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="flex items-center gap-6">
                                <div className="flex -space-x-4">
                                    <img className="w-12 h-12 rounded-full border-2 border-wmu-dark" src="https://i.pravatar.cc/100?img=1" alt="Client" />
                                    <img className="w-12 h-12 rounded-full border-2 border-wmu-dark" src="https://i.pravatar.cc/100?img=2" alt="Client" />
                                    <img className="w-12 h-12 rounded-full border-2 border-wmu-dark" src="https://i.pravatar.cc/100?img=3" alt="Client" />
                                </div>
                                <div>
                                    <p className="font-bold text-white text-lg">150+ <span className="text-sm font-normal text-gray-400">Client</span></p>
                                </div>
                                <div className="h-8 border-l border-gray-600"></div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-white text-lg">4.9</p>
                                    <div className="flex text-wmu-accent">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>


                    </div>
                </div>
            </section>

            {/* Floating Stats */}
            <section className="bg-white py-6 md:py-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative z-20 -mt-16 mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-2xl flex items-center justify-between px-6 md:px-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row w-full justify-between items-center gap-y-8 lg:gap-0 lg:divide-x divide-gray-200">
                    {/* Stat 1 */}
                    <div className="flex items-center gap-3 lg:px-6 first:pl-0 last:pr-0 w-full justify-start lg:justify-center">
                        <Award size={40} className="text-wmu-dark" strokeWidth={1.2} />
                        <div>
                            <div className="font-extrabold text-xl text-gray-900">10+</div>
                            <div className="text-[11px] md:text-xs text-gray-500 font-semibold leading-tight mt-0.5 uppercase tracking-wide">Tahun<br />Pengalaman</div>
                        </div>
                    </div>
                    {/* Stat 2 */}
                    <div className="flex items-center gap-3 lg:px-6 first:pl-0 last:pr-0 w-full justify-start lg:justify-center">
                        <ShieldCheck size={40} className="text-wmu-dark" strokeWidth={1.2} />
                        <div>
                            <div className="font-extrabold text-xl text-gray-900">150+</div>
                            <div className="text-[11px] md:text-xs text-gray-500 font-semibold leading-tight mt-0.5 uppercase tracking-wide">Proyek<br />Selesai</div>
                        </div>
                    </div>
                    {/* Stat 3 */}
                    <div className="flex items-center gap-3 lg:px-6 first:pl-0 last:pr-0 w-full justify-start lg:justify-center">
                        <HardHat size={40} className="text-wmu-dark" strokeWidth={1.2} />
                        <div>
                            <div className="font-extrabold text-xl text-gray-900">50+</div>
                            <div className="text-[11px] md:text-xs text-gray-500 font-semibold leading-tight mt-0.5 uppercase tracking-wide">Client<br />Terpercaya</div>
                        </div>
                    </div>
                    {/* Stat 4 */}
                    <div className="flex items-center gap-3 lg:px-6 first:pl-0 last:pr-0 w-full justify-start lg:justify-center">
                        <Headphones size={40} className="text-wmu-dark" strokeWidth={1.2} />
                        <div>
                            <div className="font-extrabold text-xl text-gray-900">98%</div>
                            <div className="text-[11px] md:text-xs text-gray-500 font-semibold leading-tight mt-0.5 uppercase tracking-wide">Kepuasan<br />Client</div>
                        </div>
                    </div>
                    {/* Stat 5 */}
                    <div className="flex items-center gap-3 lg:px-6 first:pl-0 last:pr-0 w-full justify-start lg:justify-center">
                        <Users size={40} className="text-wmu-dark" strokeWidth={1.2} />
                        <div>
                            <div className="font-extrabold text-base md:text-lg text-gray-900 leading-tight">Professional</div>
                            <div className="text-[11px] md:text-xs text-gray-500 font-semibold leading-tight mt-0.5 uppercase tracking-wide">Tim<br />Bersertifikat</div>
                        </div>
                    </div>
                    {/* Stat 6 */}
                    <div className="flex items-center gap-3 lg:px-6 first:pl-0 last:pr-0 w-full justify-start lg:justify-center">
                        <CheckCircle2 size={40} className="text-wmu-dark" strokeWidth={1.2} />
                        <div>
                            <div className="font-extrabold text-base md:text-lg text-gray-900 leading-tight">Bergaransi</div>
                            <div className="text-[11px] md:text-xs text-gray-500 font-semibold leading-tight mt-0.5 uppercase tracking-wide">Setiap<br />Proyek</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Keunggulan Kami */}
            <section className="py-20 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-2"
                        >
                            KEUNGGULAN KAMI
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
                        >
                            Mengapa Memilih {pengaturan?.nama_perusahaan || 'WMU'}?
                        </motion.h3>
                        {/* Decorative Line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="w-12 h-1 bg-wmu-accent mx-auto rounded-full"
                        ></motion.div>
                    </div>

                    {/* Simple Carousel */}
                    <div className="relative group/carousel">
                        {/* Gradient Fades for Carousel edges */}
                        <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-gray-50/50 via-gray-50/50 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-gray-50/50 via-gray-50/50 to-transparent z-10 pointer-events-none"></div>

                        {/* Navigation Buttons */}
                        <button onClick={() => scrollKeunggulan('left')} className="absolute left-2 md:-left-6 top-[45%] -translate-y-1/2 z-20 bg-white p-2 md:p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-wmu-accent md:opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-wmu-accent hover:text-white hover:scale-110">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => scrollKeunggulan('right')} className="absolute right-2 md:-right-6 top-[45%] -translate-y-1/2 z-20 bg-white p-2 md:p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-wmu-accent md:opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-wmu-accent hover:text-white hover:scale-110">
                            <ChevronRight size={24} />
                        </button>

                        <div ref={keunggulanRef} className="flex overflow-x-auto gap-4 pb-8 pt-4 snap-x snap-mandatory scroll-smooth hide-scrollbar relative z-0 -mx-4 px-4 sm:mx-0 sm:px-1">
                            {keunggulan && keunggulan.map((item, i) => {
                                // Dinamis Icon
                                const getIcon = (judul) => {
                                    if (!judul) return <Award size={36} strokeWidth={1.5} />;
                                    const j = judul.toLowerCase();
                                    if (j.includes('pengalaman')) return <Award size={36} strokeWidth={1.5} />;
                                    if (j.includes('profesional') || j.includes('tim')) return <Users size={36} strokeWidth={1.5} />;
                                    if (j.includes('waktu') || j.includes('cepat')) return <Clock size={36} strokeWidth={1.5} />;
                                    if (j.includes('harga') || j.includes('kompetitif')) return <Tag size={36} strokeWidth={1.5} />;
                                    if (j.includes('material') || j.includes('kualitas')) return <Package size={36} strokeWidth={1.5} />;
                                    if (j.includes('keselamatan') || j.includes('kerja')) return <HardHat size={36} strokeWidth={1.5} />;
                                    if (j.includes('pelayanan') || j.includes('responsif')) return <Headphones size={36} strokeWidth={1.5} />;
                                    if (j.includes('garansi')) return <ShieldCheck size={36} strokeWidth={1.5} />;
                                    return <Award size={36} strokeWidth={1.5} />;
                                };

                                return (
                                    <motion.div
                                        key={item.id_keunggulan || i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="w-[200px] md:w-[220px] shrink-0 snap-center bg-white p-6 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_25px_rgba(0,191,98,0.15)] transition-all duration-300 flex flex-col items-center text-center group cursor-default"
                                    >
                                        <div className="text-wmu-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                                            {getIcon(item.judul)}
                                        </div>
                                        <h4 className="font-bold text-sm text-gray-900 mb-2 group-hover:text-wmu-accent transition-colors duration-300">
                                            {item.judul}
                                        </h4>
                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                                            {item.deskripsi}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Carousel Indicators (Mockup Decorative) */}
                        <div className="flex justify-center gap-2 mt-2">
                            <div className="w-8 h-1 rounded-full bg-gray-200"></div>
                            <div className="w-8 h-1 rounded-full bg-wmu-accent"></div>
                            <div className="w-8 h-1 rounded-full bg-gray-200"></div>
                            <div className="w-8 h-1 rounded-full bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Proses Kerja & Visi Misi */}
            <section className="relative py-20 bg-wmu-dark text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=2070&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover opacity-[0.07]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/95 to-wmu-dark/90"></div>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8 items-start">

                        {/* Kiri: Proses Kerja */}
                        <div className="xl:col-span-7">
                            <div className="mb-10 text-center xl:text-left">
                                <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-2">PROSES KERJA KAMI</h2>
                                <h3 className="text-3xl md:text-4xl font-bold">Terstruktur, Transparan,<br className="hidden xl:block" /> Hasil Maksimal</h3>
                            </div>

                            <div className="flex justify-between items-start gap-2 relative mt-12 overflow-x-auto pb-4 hide-scrollbar">
                                {/* Connecting Dashed Line */}
                                <div className="hidden md:block absolute top-6 left-12 right-12 h-[1px] border-t border-dashed border-gray-600 z-0"></div>

                                {[
                                    { title: 'Konsultasi', desc: 'Memahami kebutuhan dan tujuan proyek Anda', icon: Headphones },
                                    { title: 'Perencanaan', desc: 'Analisa, desain, dan perencanaan matang', icon: PenTool },
                                    { title: 'Penawaran', desc: 'Penawaran transparan dan kompetitif', icon: FileText },
                                    { title: 'Pelaksanaan', desc: 'Pengerjaan oleh tim profesional', icon: HardHat },
                                    { title: 'Pengawasan', desc: 'Monitoring kualitas secara berkala', icon: Activity },
                                    { title: 'Serah Terima', desc: 'Proyek selesai tepat waktu & bergaransi', icon: ShieldCheck }
                                ].map((step, i) => (
                                    <div key={i} className="relative z-10 flex flex-col items-center text-center w-[120px] shrink-0 group">
                                        <div className="w-14 h-14 bg-wmu-dark rounded-xl border border-gray-600 flex items-center justify-center text-wmu-accent mb-5 relative shadow-lg group-hover:scale-110 group-hover:border-wmu-accent transition-all">
                                            <step.icon size={26} strokeWidth={1.5} />
                                            {/* Number Badge */}
                                            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-5 bg-wmu-dark text-white rounded-full flex items-center justify-center text-[10px] font-bold border border-gray-600 group-hover:border-wmu-accent transition-colors">
                                                0{i + 1}
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-xs text-gray-100 mb-2">{step.title}</h4>
                                        <p className="text-[10px] text-gray-400 leading-relaxed px-1">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kanan: Visi & Misi */}
                        <div className="xl:col-span-5 flex flex-col gap-6 xl:pl-6 xl:border-l border-white/10 mt-10 xl:mt-0">
                            <div className="mb-2 text-center xl:text-left">
                                <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-2">VISI & MISI KAMI</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                                {/* Visi */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm sm:col-span-2 flex flex-col">
                                    <h4 className="text-lg font-bold mb-6 text-white w-full text-left">VISI</h4>
                                    <div className="mb-6 flex justify-center xl:justify-start">
                                        <div className="w-16 h-16 rounded-full border-2 border-wmu-accent flex items-center justify-center bg-white/5">
                                            <Eye size={32} className="text-wmu-accent" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-xs leading-relaxed text-left w-full mt-auto">
                                        {pengaturan?.visi || 'Menjadi perusahaan konstruksi terdepan yang membangun nilai berkelanjutan bagi masyarakat.'}
                                    </p>
                                </div>

                                {/* Misi */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm sm:col-span-3 flex flex-col">
                                    <h4 className="text-lg font-bold mb-4 text-wmu-accent">MISI</h4>
                                    {pengaturan?.misi ? (
                                        <ul className="space-y-3">
                                            {pengaturan.misi.split('\n').filter(line => line.trim()).map((line, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 size={14} className="text-wmu-accent mt-0.5 shrink-0" />
                                                    <span className="text-[11px] xl:text-xs text-gray-300">{line.replace(/^\d+\.\s*/, '')}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3"><CheckCircle2 size={14} className="text-wmu-accent mt-0.5 shrink-0" /><span className="text-[11px] xl:text-xs text-gray-300">Memberikan hasil terbaik dengan standar kualitas tertinggi</span></li>
                                            <li className="flex items-start gap-3"><CheckCircle2 size={14} className="text-wmu-accent mt-0.5 shrink-0" /><span className="text-[11px] xl:text-xs text-gray-300">Mengutamakan keselamatan dan kesehatan kerja</span></li>
                                            <li className="flex items-start gap-3"><CheckCircle2 size={14} className="text-wmu-accent mt-0.5 shrink-0" /><span className="text-[11px] xl:text-xs text-gray-300">Menyelesaikan proyek tepat waktu dan efisien</span></li>
                                            <li className="flex items-start gap-3"><CheckCircle2 size={14} className="text-wmu-accent mt-0.5 shrink-0" /><span className="text-[11px] xl:text-xs text-gray-300">Menggunakan teknologi dan material terbaik</span></li>
                                            <li className="flex items-start gap-3"><CheckCircle2 size={14} className="text-wmu-accent mt-0.5 shrink-0" /><span className="text-[11px] xl:text-xs text-gray-300">Membangun hubungan jangka panjang dengan klien</span></li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tentang Kami (Bagian yang ada Video) */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* Bagian Video */}
                        <div className="relative lg:col-span-7">
                            {/* Video Element */}
                            <video
                                ref={videoRef}
                                src="/videos/videokonstruksi.mp4"
                                className="rounded-2xl shadow-xl w-full aspect-video object-cover bg-gray-100"
                                controls={isPlaying}
                                poster="https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=2070&auto=format&fit=crop"
                                onPause={() => setIsPlaying(false)}
                                onPlay={() => setIsPlaying(true)}
                            />

                            {/* Badge Floating 10+ Tahun */}
                            <div className="absolute -bottom-10 -left-4 md:-left-10 bg-wmu-dark text-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-xs z-10">
                                <p className="text-sm text-gray-300 mb-4">
                                    Kami berkomitmen memberikan hasil terbaik dengan mengutamakan kualitas, keselamatan, dan kepuasan klien.
                                </p>
                                <div className="font-bold text-5xl mb-1">10+</div>
                                <div className="text-sm text-wmu-accent font-semibold uppercase tracking-wider">Tahun Pengalaman</div>
                            </div>

                            {/* Tombol Play Custom */}
                            {!isPlaying && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    <button
                                        onClick={handlePlayVideo}
                                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/50 hover:scale-110 transition-transform"
                                    >
                                        <Play size={28} fill="currentColor" className="ml-1" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Bagian Teks */}
                        <div className="lg:col-span-5 lg:pl-6 mt-16 lg:mt-0 flex flex-col justify-center">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-sm uppercase mb-2">TENTANG KAMI</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Solusi Konstruksi Terpercaya Sejak 2014</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {pengaturan?.deskripsi_perusahaan || `${pengaturan?.nama_perusahaan || 'WMU'} hadir dengan komitmen kuat untuk memberikan layanan konstruksi yang inovatif, efisien, dan berkualitas tinggi. Kami siap menjadi mitra terbaik dalam mewujudkan setiap proyek Anda.`}
                            </p>

                            {/* List Keunggulan Tambahan untuk mengisi space kosong */}
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-start group">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-wmu-accent/10 flex items-center justify-center mt-0.5 mr-4 group-hover:bg-wmu-accent group-hover:text-white transition-colors">
                                        <CheckCircle2 size={14} className="text-wmu-accent group-hover:text-white" />
                                    </div>
                                    <span className="text-gray-700 font-medium group-hover:text-wmu-dark transition-colors">Tim Ahli & Profesional Tersertifikasi</span>
                                </li>
                                <li className="flex items-start group">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-wmu-accent/10 flex items-center justify-center mt-0.5 mr-4 group-hover:bg-wmu-accent group-hover:text-white transition-colors">
                                        <CheckCircle2 size={14} className="text-wmu-accent group-hover:text-white" />
                                    </div>
                                    <span className="text-gray-700 font-medium group-hover:text-wmu-dark transition-colors">Penggunaan Material Berkualitas Tinggi</span>
                                </li>
                                <li className="flex items-start group">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-wmu-accent/10 flex items-center justify-center mt-0.5 mr-4 group-hover:bg-wmu-accent group-hover:text-white transition-colors">
                                        <CheckCircle2 size={14} className="text-wmu-accent group-hover:text-white" />
                                    </div>
                                    <span className="text-gray-700 font-medium group-hover:text-wmu-dark transition-colors">Transparansi Harga & Ketepatan Waktu</span>
                                </li>
                            </ul>

                            <div>
                                <Link href="/tentang-kami" className="inline-flex items-center justify-center bg-wmu-dark hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    Selengkapnya Tentang Kami <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Layanan Section */}
            <section id="layanan" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header with Centered Title and Right Arrows */}
                    <div className="relative flex flex-col md:flex-row items-center justify-center mb-12">
                        <div className="text-center md:absolute md:left-1/2 md:-translate-x-1/2">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs md:text-sm uppercase mb-3">LAYANAN KAMI</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-wmu-dark mb-4">Layanan Konstruksi Terintegrasi</h3>
                            <div className="w-12 h-1 bg-wmu-accent mx-auto rounded-full"></div>
                        </div>

                        {/* Navigation Arrows (Right aligned on Desktop) */}
                        <div className="hidden md:flex gap-3 ml-auto z-10 absolute right-0">
                            <button onClick={() => scrollLayanan('left')} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:bg-wmu-dark hover:text-white hover:border-wmu-dark transition-all">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => scrollLayanan('right')} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:bg-wmu-dark hover:text-white hover:border-wmu-dark transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="relative group/layanan">
                        {/* Mobile Arrows */}
                        <div className="flex md:hidden justify-end gap-2 mb-6">
                            <button onClick={() => scrollLayanan('left')} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 active:bg-wmu-dark active:text-white transition-all">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => scrollLayanan('right')} className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 active:bg-wmu-dark active:text-white transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div ref={layananRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-1">
                            {layanan && layanan.map((item, index) => (
                                <motion.div
                                    key={item.id_layanan}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="w-[280px] md:w-[320px] shrink-0 snap-start bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group relative flex flex-col hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
                                >
                                    <div className="h-48 relative overflow-visible shrink-0">
                                        <div className="w-full h-full overflow-hidden">
                                            <img
                                                src={item.prk_gambar ? `/storage/${item.prk_gambar}` : `https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop`}
                                                alt={item.judul_layanan}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => { e.target.onerror = null; e.target.src = `https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop`; }}
                                            />
                                        </div>

                                        {/* Icon overlapping the bottom edge */}
                                        <div className="absolute -bottom-6 left-6 bg-wmu-dark text-wmu-accent p-3 rounded-xl shadow-lg z-10 group-hover:-translate-y-1 transition-transform duration-300 border border-white/10">
                                            <Building2 size={28} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div className="p-6 pt-10 flex flex-col flex-grow">
                                        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-wmu-accent transition-colors">{item.judul_layanan}</h4>
                                        <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">{item.deskripsi}</p>
                                        <Link href={`/layanan`} className="text-wmu-accent font-semibold text-sm flex items-center group-hover:text-wmu-dark transition-colors">
                                            Selengkapnya <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Proyek Unggulan */}
            <section className="py-16 bg-wmu-dark text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative">
                        <div>
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs md:text-sm uppercase mb-2">PROYEK KAMI!</h2>
                            <h3 className="text-3xl md:text-4xl font-bold">Proyek Unggulan</h3>
                        </div>
                        <Link href="/proyek" className="text-sm font-medium hover:text-wmu-accent transition-colors flex items-center group hidden md:flex">
                            Lihat Semua Proyek <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="relative group/proyek">
                        <div ref={proyekRef} className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-1">
                            {proyek && proyek.map((item, index) => (
                                <motion.div
                                    key={item.prk_id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="w-[220px] md:w-[230px] lg:w-[240px] shrink-0 snap-start group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="aspect-[4/5] md:aspect-square relative">
                                        <img
                                            src={item.prk_gambar ? `/storage/${item.prk_gambar}` : [
                                                "https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=2070&auto=format&fit=crop",
                                                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
                                                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
                                                "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1974&auto=format&fit=crop",
                                                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                                            ][index % 5]}
                                            alt={item.prk_judul}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = [
                                                    "https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=2070&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1974&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                                                ][index % 5];
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-wmu-dark via-wmu-dark/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Optional Watermark icon like in mockup */}
                                        <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-20 group-hover:opacity-30 transition-opacity">
                                            <Building2 size={48} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 flex justify-between items-end">
                                        <div className="flex-1 pr-2">
                                            <h4 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 group-hover:text-wmu-accent transition-colors line-clamp-1">{item.prk_judul}</h4>
                                            <p className="text-gray-300 text-xs flex items-center mb-3 md:mb-4"><MapPin size={12} className="mr-1 text-wmu-accent" /> <span className="line-clamp-1">{item.prk_klien}</span></p>

                                            <span className="inline-block text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1 bg-wmu-dark/50 text-wmu-accent rounded-md border border-wmu-accent/50 backdrop-blur-sm">
                                                {item.prk_kategori || 'Konstruksi'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end gap-3 shrink-0">
                                            <div className="text-xs md:text-sm font-bold text-gray-200">{item.prk_tahun}</div>
                                            <button className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center group-hover:bg-wmu-accent group-hover:border-wmu-accent group-hover:text-wmu-dark transition-colors bg-wmu-dark/50 backdrop-blur-sm">
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Custom Navigation (visible on hover) */}
                        <button onClick={() => scrollProyek('left')} className="absolute left-2 md:-left-6 top-[45%] -translate-y-1/2 z-20 bg-wmu-dark border border-gray-600 p-2 md:p-3 rounded-full shadow-lg text-white md:opacity-0 group-hover/proyek:opacity-100 transition-all duration-300 hover:bg-wmu-accent hover:border-wmu-accent hover:text-wmu-dark hover:scale-110">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => scrollProyek('right')} className="absolute right-2 md:-right-6 top-[45%] -translate-y-1/2 z-20 bg-wmu-dark border border-gray-600 p-2 md:p-3 rounded-full shadow-lg text-white md:opacity-0 group-hover/proyek:opacity-100 transition-all duration-300 hover:bg-wmu-accent hover:border-wmu-accent hover:text-wmu-dark hover:scale-110">
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Mobile View All Link */}
                    <div className="mt-8 flex md:hidden justify-center">
                        <Link href="/proyek" className="text-sm font-medium hover:text-wmu-accent transition-colors flex items-center group">
                            Lihat Semua Proyek <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Client Marquee (Moved from top to replace old static section) */}
            {/* Client dan Partnership */}
            <section className="py-16 md:py-20 bg-white border-b border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* Client Row (Marquee) */}
                    <div className="flex flex-col gap-8">
                        <div className="w-full font-bold text-gray-900 uppercase tracking-widest text-sm text-center">
                            CLIENT KAMI
                        </div>
                        <div className="w-full overflow-hidden relative flex mask-image-fade -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                            {/* Gradients for smooth fading edges */}
                            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                            <div className="flex flex-nowrap">
                                <div className="flex animate-marquee min-w-max items-center gap-6 md:gap-8 px-4 md:px-8">
                                    {klien && klien.length > 0 ? (
                                        klien.map((k, i) => {
                                            const fallbackLogos = [
                                                'https://www.google.com/s2/favicons?domain=bca.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=bri.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=pln.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=pertamina.com&sz=128',
                                                'https://www.google.com/s2/favicons?domain=wika.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=astra.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=jll.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=sinarmasland.com&sz=128'
                                            ];
                                            return (
                                                <div key={k.id_klien || i} className="flex flex-col items-center justify-center shrink-0 w-28 md:w-36 gap-3">
                                                    <div className="h-12 md:h-16 w-full flex items-center justify-center">
                                                        <img
                                                            src={k.logo ? `/storage/${k.logo}` : fallbackLogos[i % fallbackLogos.length]}
                                                            alt={k.prk_klien}
                                                            className="max-h-full max-w-full object-contain filter hover:brightness-110 transition-all duration-300"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = fallbackLogos[i % fallbackLogos.length]; }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">{k.prk_klien || 'Client'}</span>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        [
                                            { name: 'BCA', url: 'https://www.google.com/s2/favicons?domain=bca.co.id&sz=128' },
                                            { name: 'BRI', url: 'https://www.google.com/s2/favicons?domain=bri.co.id&sz=128' },
                                            { name: 'PLN', url: 'https://www.google.com/s2/favicons?domain=pln.co.id&sz=128' },
                                            { name: 'Pertamina', url: 'https://www.google.com/s2/favicons?domain=pertamina.com&sz=128' },
                                            { name: 'WIKA', url: 'https://www.google.com/s2/favicons?domain=wika.co.id&sz=128' },
                                            { name: 'Astra', url: 'https://www.google.com/s2/favicons?domain=astra.co.id&sz=128' },
                                            { name: 'JLL', url: 'https://www.google.com/s2/favicons?domain=jll.co.id&sz=128' },
                                            { name: 'Sinarmas', url: 'https://www.google.com/s2/favicons?domain=sinarmasland.com&sz=128' }
                                        ].map((client, i) => (
                                            <div key={`client-${i}`} className="flex flex-col items-center justify-center shrink-0 w-28 md:w-36 gap-3">
                                                <div className="h-12 md:h-16 w-full flex items-center justify-center">
                                                    <img src={client.url} alt={client.name} className="max-h-full max-w-full object-contain filter hover:brightness-110 transition-all duration-300" />
                                                </div>
                                                <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">{client.name}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="flex animate-marquee min-w-max items-center gap-6 md:gap-8 px-4 md:px-8" aria-hidden="true">
                                    {klien && klien.length > 0 ? (
                                        klien.map((k, i) => {
                                            const fallbackLogos = [
                                                'https://www.google.com/s2/favicons?domain=bca.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=bri.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=pln.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=pertamina.com&sz=128',
                                                'https://www.google.com/s2/favicons?domain=wika.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=astra.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=jll.co.id&sz=128',
                                                'https://www.google.com/s2/favicons?domain=sinarmasland.com&sz=128'
                                            ];
                                            return (
                                                <div key={`dup-${k.id_klien || i}`} className="flex flex-col items-center justify-center shrink-0 w-28 md:w-36 gap-3">
                                                    <div className="h-12 md:h-16 w-full flex items-center justify-center">
                                                        <img
                                                            src={k.logo ? `/storage/${k.logo}` : fallbackLogos[i % fallbackLogos.length]}
                                                            alt={k.prk_klien}
                                                            className="max-h-full max-w-full object-contain filter hover:brightness-110 transition-all duration-300"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = fallbackLogos[i % fallbackLogos.length]; }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">{k.prk_klien || 'Client'}</span>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        [
                                            { name: 'BCA', url: 'https://www.google.com/s2/favicons?domain=bca.co.id&sz=128' },
                                            { name: 'BRI', url: 'https://www.google.com/s2/favicons?domain=bri.co.id&sz=128' },
                                            { name: 'PLN', url: 'https://www.google.com/s2/favicons?domain=pln.co.id&sz=128' },
                                            { name: 'Pertamina', url: 'https://www.google.com/s2/favicons?domain=pertamina.com&sz=128' },
                                            { name: 'WIKA', url: 'https://www.google.com/s2/favicons?domain=wika.co.id&sz=128' },
                                            { name: 'Astra', url: 'https://www.google.com/s2/favicons?domain=astra.co.id&sz=128' },
                                            { name: 'JLL', url: 'https://www.google.com/s2/favicons?domain=jll.co.id&sz=128' },
                                            { name: 'Sinarmas', url: 'https://www.google.com/s2/favicons?domain=sinarmasland.com&sz=128' }
                                        ].map((client, i) => (
                                            <div key={`client-dup-${i}`} className="flex flex-col items-center justify-center shrink-0 w-28 md:w-36 gap-3">
                                                <div className="h-12 md:h-16 w-full flex items-center justify-center">
                                                    <img src={client.url} alt={client.name} className="max-h-full max-w-full object-contain filter hover:brightness-110 transition-all duration-300" />
                                                </div>
                                                <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">{client.name}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Partner Row (Grid 3 rows approx) */}
                    <div className="flex flex-col gap-8 pt-8 border-t border-gray-100">
                        <div className="w-full font-bold text-gray-900 uppercase tracking-widest text-sm text-center">
                            PARTNER KAMI
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 w-full px-4 md:px-0">
                            {[
                                { name: 'Schneider', url: 'https://www.google.com/s2/favicons?domain=se.com&sz=128' },
                                { name: 'BOSCH', url: 'https://www.google.com/s2/favicons?domain=bosch.com&sz=128' },
                                { name: 'HILTI', url: 'https://www.google.com/s2/favicons?domain=hilti.com&sz=128' },
                                { name: 'Dulux', url: 'https://www.google.com/s2/favicons?domain=dulux.co.id&sz=128' },
                                { name: 'DAIKIN', url: 'https://www.google.com/s2/favicons?domain=daikin.co.id&sz=128' },
                                { name: 'TOTO', url: 'https://www.google.com/s2/favicons?domain=toto.com&sz=128' },
                                { name: 'Legrand', url: 'https://www.google.com/s2/favicons?domain=legrand.com&sz=128' },
                                { name: '3M', url: 'https://www.google.com/s2/favicons?domain=3m.com&sz=128' }
                            ].map((partner, i) => (
                                <div key={`partner-${i}`} className="flex flex-col items-center justify-center w-[120px] md:w-40 gap-3 bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md hover:border-gray-200 hover:-translate-y-1 transition-all duration-300">
                                    <div className="h-10 md:h-14 w-full flex items-center justify-center">
                                        <img src={partner.url} alt={partner.name} className="max-h-full max-w-full object-contain filter transition-all duration-300" />
                                    </div>
                                    <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">{partner.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Proses Kerja Kami & 3-Column Features */}
            <section className="py-16 md:py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">




                    {/* Mengapa Memilih WMU */}
                    <div className="mt-2">
                        <div className="text-center mb-10">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-sm uppercase mb-2">MENGAPA KAMI</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Dipercaya untuk Hasil Terbaik</h3>
                            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Pengalaman, profesionalisme, dan komitmen kami menjadi alasan klien terus mempercayakan proyek mereka kepada kami.</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {[
                                { icon: TrendingUp, value: '15+', label: 'Tahun Pengalaman' },
                                { icon: Users, value: '100+', label: 'Proyek Selesai' },
                                { icon: Zap, value: '50+', label: 'Klien Puas' },
                                { icon: Award, value: 'ISO', label: 'Tersertifikasi' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center bg-wmu-dark/5 group-hover:bg-wmu-accent/10 transition-colors duration-300">
                                        <stat.icon size={22} className="text-wmu-accent" />
                                    </div>
                                    <div className="text-3xl font-bold text-wmu-dark mb-1">{stat.value}</div>
                                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimoni, Input Ulasan, & Artikel */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                        {/* Testimoni Klien */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 flex flex-col relative">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">APA KATA CLIENT KAMI</h2>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">Testimoni Klien</h3>

                            {ulasan && ulasan.length > 0 ? (
                                <div className="flex flex-col flex-1 min-h-[250px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentUlasanIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col flex-1 h-full"
                                        >
                                            <div className="text-4xl text-wmu-accent font-serif mb-2 leading-none">"</div>
                                            <p className="text-gray-600 text-sm mb-8 italic leading-relaxed flex-1">{ulasan[currentUlasanIndex].isi_ulasan}</p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-wmu-dark text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                                                        {ulasan[currentUlasanIndex].nama_pemberi.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-gray-900 text-sm">{ulasan[currentUlasanIndex].nama_pemberi}</h5>
                                                        <p className="text-[11px] text-gray-500">Client</p>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400 gap-0.5 shrink-0">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < ulasan[currentUlasanIndex].rating_bintang ? "currentColor" : "none"} className={i >= ulasan[currentUlasanIndex].rating_bintang ? "text-gray-300" : ""} />
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm flex-1">Belum ada testimoni.</p>
                            )}

                            {/* Pagination Dots */}
                            {ulasan && ulasan.length > 0 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    {ulasan.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setCurrentUlasanIndex(idx)}
                                            className={`w-2 h-2 rounded-full transition-colors ${currentUlasanIndex === idx ? 'bg-wmu-dark' : 'bg-gray-200 hover:bg-gray-400'}`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Insight & Artikel */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 flex flex-col">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">ARTIKEL TERBARU</h2>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">Insight & Artikel</h3>

                            <div className="flex flex-col gap-5 flex-1">
                                {blog && blog.slice(0, 3).map((b, idx) => (
                                    <Link key={b.id_blog || idx} href={`/blog/${b.prk_slug}`} className="flex gap-4 group items-center">
                                        <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-50">
                                            <img
                                                src={b.gambar_sampul ? `/storage/${b.gambar_sampul}` : "https://via.placeholder.com/150"}
                                                alt={b.judul}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900 group-hover:text-wmu-accent transition-colors line-clamp-2 leading-snug mb-1">{b.judul}</h4>
                                            <p className="text-[11px] text-gray-500">{new Date(b.tanggal_terbit).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                    </Link>
                                ))}
                                {(!blog || blog.length === 0) && (
                                    <p className="text-gray-500 text-sm">Belum ada artikel.</p>
                                )}
                            </div>
                        </div>

                        {/* Form Input Testimoni */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 flex flex-col relative">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">BERIKAN ULASAN</h2>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">Pengalaman Anda</h3>

                            <form onSubmit={submitUlasan} className="flex flex-col flex-1 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nama Lengkap / Instansi"
                                        value={data.nama_pemberi}
                                        onChange={e => setData('nama_pemberi', e.target.value)}
                                        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-wmu-accent/20 focus:border-wmu-accent transition-colors"
                                        required
                                    />
                                    {errors.nama_pemberi && <span className="text-red-500 text-xs mt-1 block">{errors.nama_pemberi}</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs text-gray-500 font-medium">Rating Anda</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setData('rating_bintang', star)}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={24}
                                                    fill={star <= data.rating_bintang ? "#FFD700" : "none"}
                                                    className={star <= data.rating_bintang ? "text-yellow-400" : "text-gray-300"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {errors.rating_bintang && <span className="text-red-500 text-xs block">{errors.rating_bintang}</span>}
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        placeholder="Bagikan pengalaman Anda bekerja sama dengan kami..."
                                        value={data.isi_ulasan}
                                        onChange={e => setData('isi_ulasan', e.target.value)}
                                        className="w-full h-full min-h-[100px] text-sm border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-wmu-accent/20 focus:border-wmu-accent transition-colors resize-none"
                                        required
                                    ></textarea>
                                    {errors.isi_ulasan && <span className="text-red-500 text-xs mt-1 block">{errors.isi_ulasan}</span>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-wmu-dark hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-sm transition-colors mt-auto flex items-center justify-center gap-2"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Ulasan'}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-gray-50/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-2">
                        <h2 className="text-wmu-accent font-bold tracking-widest text-sm uppercase mb-2">FAQ</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Pertanyaan yang Sering Diajukan</h3>
                        <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">Temukan jawaban atas pertanyaan umum seputar layanan dan proses kerja kami.</p>
                    </div>

                    <div className="space-y-3">
                        {faq && faq.length > 0 ? faq.map((item, idx) => (
                            <div key={item.id_faq || idx} className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-md">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                >
                                    <span className="font-semibold text-gray-900 text-sm md:text-base pr-4 group-hover:text-wmu-accent transition-colors">
                                        {item.pertanyaan}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-gray-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-wmu-accent' : ''
                                            }`}
                                    />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                                        {item.jawaban}
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                                <MessageCircle size={40} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-400 text-sm">FAQ akan segera tersedia.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>


        </PublicLayout>
    );
}