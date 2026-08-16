import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, HardHat, CheckCircle2,
    Award, ShieldCheck, Users, Headphones,
    Lightbulb, Leaf, Play, Binoculars, Building2,
    Plus, Minus, X
} from 'lucide-react';

// Helper: convert YouTube URL to embed URL
function getYoutubeEmbedUrl(url) {
    if (!url) return null;
    // Already embed
    if (url.includes('youtube.com/embed/')) return url;
    // youtu.be short link
    const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
    // youtube.com/watch?v=
    const watchMatch = url.match(/[?&]v=([\w-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
    return url;
}

export default function TentangKami({ keunggulan = [], mitra = [], videos = [], tentang = null }) {
    const { pengaturan } = usePage().props;
    const [orgZoom, setOrgZoom] = useState(100);
    const [activeVideo, setActiveVideo] = useState(null);

    const safeParse = (data) => {
        if (!data) return [];
        if (typeof data === 'string') {
            try { return JSON.parse(data); } catch (e) { return []; }
        }
        return Array.isArray(data) ? data : [];
    };

    const sejarah = safeParse(tentang?.sejarah_perusahaan);
    const nilai = safeParse(tentang?.nilai_perusahaan);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <PublicLayout>
            <SeoHead 
                title="Tentang Kami" 
                description="Pelajari lebih lanjut tentang sejarah, nilai-nilai, dan struktur organisasi WMU Construction."
            />

            {/* Hero Section */}
            <section className="relative bg-wmu-dark text-white min-h-[70vh] flex flex-col justify-center overflow-hidden">
                {/* Full-screen Civil Engineering Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/civil_construction_hero.png"
                        alt="Konstruksi Sipil WMU"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark semi-transparent overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark/95 via-wmu-dark/75 to-wmu-dark/40"></div>
                    {/* Bottom fade for seamless section transition */}
                    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-wmu-dark to-transparent"></div>
                </div>

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
                            <motion.div variants={fadeInUp} className="text-gray-300 text-sm mb-6 flex items-center gap-2">
                                <Link href="/" className="hover:text-wmu-accent transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-gray-100 font-medium">Tentang Kami</span>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
                                {tentang?.judul_hero || 'Tentang Kami'}
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-12 max-w-xl leading-relaxed">
                                {tentang?.deskripsi_hero || 'Mengenal lebih dekat dedikasi dan perjalanan kami di industri konstruksi dengan standar kualitas terbaik.'}
                            </motion.p>

                            {/* Stats inline */}
                            <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-0 pt-8 max-w-4xl">
                                <div className="flex items-center gap-4 lg:border-r border-gray-600/50 pr-6">
                                    <Award size={36} className="text-wmu-accent shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <div className="font-extrabold text-2xl text-white leading-none mb-1.5">10+</div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Tahun Pengalaman</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 lg:border-r border-gray-600/50 lg:px-6">
                                    <ShieldCheck size={36} className="text-wmu-accent shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <div className="font-extrabold text-2xl text-white leading-none mb-1.5">150+</div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Proyek Selesai</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 lg:border-r border-gray-600/50 lg:px-6">
                                    <Users size={36} className="text-wmu-accent shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <div className="font-extrabold text-2xl text-white leading-none mb-1.5">50+</div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Klien Terpercaya</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 lg:px-6">
                                    <CheckCircle2 size={36} className="text-wmu-accent shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <div className="font-extrabold text-2xl text-white leading-none mb-1.5">98%</div>
                                        <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Kepuasan Klien</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Nilai-Nilai Perusahaan */}
            <section className="py-24 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-4 lg:sticky lg:top-24">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">NILAI-NILAI PERUSAHAAN</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Nilai-Nilai yang Menjadi Dasar Setiap Langkah Kami</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Nilai-nilai ini menjadi pondasi kami dalam bekerja, berinovasi, dan memberikan hasil terbaik bagi klien.
                            </p>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                                {nilai.length > 0 ? nilai.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300 group"
                                    >
                                        <div className="w-16 h-16 mx-auto bg-gray-50 border border-gray-100 rounded-[20px] flex items-center justify-center mb-5 group-hover:bg-wmu-accent/10 group-hover:border-wmu-accent/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                            <Award size={28} className="text-wmu-accent/70 group-hover:text-wmu-accent transition-colors" strokeWidth={1.5} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                )) : [
                                    { title: 'Integritas', desc: 'Menjunjung tinggi kejujuran, transparansi, dan etika dalam setiap pekerjaan.' },
                                    { title: 'Kualitas', desc: 'Berkomitmen menghasilkan kualitas terbaik di setiap detail.' },
                                    { title: 'Keselamatan', desc: 'Mengutamakan keselamatan kerja demi melindungi tim dan lingkungan.' },
                                    { title: 'Inovasi', desc: 'Terus berinovasi untuk menghadirkan solusi konstruksi yang lebih baik dan efisien.' },
                                    { title: 'Kolaborasi', desc: 'Bekerja sama dengan tim, mitra, dan klien demi mencapai hasil terbaik.' },
                                    { title: 'Keberlanjutan', desc: 'Membangun dengan memperhatikan dampak jangka panjang bagi masa depan.' }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300 group"
                                    >
                                        <div className="w-16 h-16 mx-auto bg-gray-50 border border-gray-100 rounded-[20px] flex items-center justify-center mb-5 group-hover:bg-wmu-accent/10 group-hover:border-wmu-accent/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                            <Award size={28} className="text-wmu-accent/70 group-hover:text-wmu-accent transition-colors" strokeWidth={1.5} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Perjalanan & Sejarah Perusahaan */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-5">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">PERJALANAN KAMI</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 leading-tight">Perjalanan & Sejarah Perusahaan</h3>

                            <div className="relative pl-8 md:pl-10 border-l border-gray-200 space-y-10">
                                {sejarah.length > 0 ? sejarah.map((item, idx) => (
                                    <div key={idx} className="relative group">
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[37px] md:-left-[45px] top-1 w-2.5 h-2.5 bg-gray-300 rounded-full group-hover:bg-wmu-accent transition-colors ring-4 ring-gray-50"></div>

                                        <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-6">
                                            <div className="font-bold text-wmu-accent text-lg md:w-16 shrink-0 leading-none mt-0.5">{item.year}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : [
                                    { year: '2014', title: 'Awal Berdiri', desc: `${pengaturan?.nama_perusahaan || 'WMU'} didirikan dengan visi menjadi perusahaan kontraktor profesional dan terpercaya.` },
                                    { year: '2016', title: 'Ekspansi Layanan', desc: 'Menambah layanan konstruksi terintegrasi meliputi design & build serta interior construction.' },
                                    { year: '2018', title: 'Peningkatan Kapasitas', desc: 'Meningkatkan sumber daya manusia, alat berat, dan sistem manajemen proyek.' },
                                    { year: '2020', title: 'Sertifikasi & Standar', desc: 'Memperoleh sertifikasi ISO dan SMK3 sebagai bukti komitmen terhadap kualitas dan keselamatan.' },
                                    { year: '2022', title: 'Proyek Skala Besar', desc: 'Menangani berbagai proyek skala besar di sektor komersial, industri, dan infrastruktur.' },
                                    { year: '2024', title: 'Terus Bertumbuh', desc: 'Tetap berinovasi, memperluas jaringan, dan menjadi mitra strategis bagi klien di seluruh Indonesia.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="relative group">
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[37px] md:-left-[45px] top-1 w-2.5 h-2.5 bg-gray-300 rounded-full group-hover:bg-wmu-accent transition-colors ring-4 ring-gray-50"></div>

                                        <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-6">
                                            <div className="font-bold text-wmu-accent text-lg md:w-16 shrink-0 leading-none mt-0.5">{item.year}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 relative mt-16 lg:mt-0">
                            <div className="rounded-3xl overflow-hidden shadow-2xl relative bg-gray-200 aspect-[4/3] lg:aspect-[16/10]">
                                <img src="/images/civil_construction_work.png" alt="Perjalanan Perusahaan WMU" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-wmu-dark/20 hover:bg-wmu-dark/10 transition-colors duration-500"></div>

                                {/* Construction badge overlay */}
                                <div className="absolute top-4 left-4 bg-wmu-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                                    <HardHat size={12} /> KONSTRUKSI SIPIL
                                </div>
                            </div>

                            {/* Floating Text Box */}
                            <div className="absolute -bottom-12 left-4 md:-bottom-10 md:left-10 bg-wmu-dark text-white p-6 md:p-8 rounded-2xl shadow-xl max-w-sm z-10 border border-gray-800">
                                <p className="text-sm md:text-base leading-relaxed font-medium">
                                    Perjalanan kami adalah bukti komitmen untuk terus tumbuh dan memberikan hasil terbaik di setiap proyek.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visi & Misi */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                        {/* Visi - Dark Side */}
                        <div className="md:w-1/3 bg-wmu-dark text-white p-10 md:p-14 relative flex flex-col justify-start overflow-hidden">
                            {/* Background Image at the bottom */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-bottom opacity-40 grayscale pointer-events-none"></div>
                            {/* Gradient to fade from solid dark blue at the top into the image at the bottom */}
                            <div className="absolute inset-0 bg-gradient-to-b from-wmu-dark via-wmu-dark/80 to-transparent pointer-events-none"></div>

                            <div className="relative z-10 pt-4">
                                <h3 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-6">VISI KAMI</h3>
                                <p className="text-2xl font-bold leading-relaxed text-white mb-6">
                                    {pengaturan?.visi || 'Menjadi perusahaan konstruksi terpercaya yang membangun nilai berkelanjutan bagi masyarakat dan lingkungan.'}
                                </p>
                                <div className="w-12 h-1 bg-wmu-accent"></div>
                            </div>
                        </div>

                        {/* Misi - Light Side */}
                        <div className="md:w-2/3 p-10 md:p-14 relative flex items-center">
                            {/* Background Image on the right side */}
                            <div className="absolute right-0 top-0 bottom-0 w-[60%] z-0 pointer-events-none">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071')] bg-cover bg-center opacity-[0.25] grayscale mix-blend-luminosity"></div>
                                {/* Gradient fade to white on the left side to blend seamlessly */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                            </div>

                            <div className="relative z-10 md:w-[80%]">
                                <h3 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-8">MISI KAMI</h3>
                                <ul className="space-y-5">
                                    {pengaturan?.misi ? (
                                        pengaturan.misi.split('\n').filter(line => line.trim()).map((line, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full border border-wmu-accent flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle2 size={14} className="text-wmu-accent" strokeWidth={2.5} />
                                                </div>
                                                <span className="text-gray-800 font-medium leading-relaxed text-sm">{line.replace(/^\d+\.\s*/, '')}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            {[
                                                'Memberikan hasil terbaik dengan standar kualitas tertinggi.',
                                                'Mengutamakan keselamatan dan kesehatan kerja.',
                                                'Menyelesaikan proyek tepat waktu dan efisien.',
                                                'Menggunakan teknologi dan material terbaik.',
                                                'Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan.'
                                            ].map((text, idx) => (
                                                <li key={idx} className="flex items-start gap-4">
                                                    <div className="w-6 h-6 rounded-full border border-wmu-accent flex items-center justify-center shrink-0 mt-0.5">
                                                        <CheckCircle2 size={14} className="text-wmu-accent" strokeWidth={3} />
                                                    </div>
                                                    <span className="text-gray-800 font-medium leading-relaxed text-sm">{text}</span>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Struktur Organisasi Perusahaan */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="lg:w-1/4 shrink-0 lg:sticky lg:top-24">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">STRUKTUR ORGANISASI</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Struktur Organisasi Perusahaan</h3>
                            <p className="text-gray-600 leading-relaxed text-sm mb-8">
                                Kami memiliki struktur organisasi yang jelas dengan pembagian peran dan tanggung jawab yang tepat untuk menghasilkan kinerja terbaik dalam setiap proyek.
                            </p>
                            <a href="#" className="inline-flex items-center justify-center bg-wmu-dark text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-wmu-dark/20">
                                Lihat Detail <ArrowRight size={16} className="ml-2" />
                            </a>
                        </div>

                        <div className="lg:w-3/4 w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
                            {/* Toolbar */}
                            <div className="flex justify-end items-center gap-4 text-xs font-medium text-gray-500 mb-8 border-b border-gray-50 pb-4">
                                <span className="mr-auto text-gray-400">Struktur Organisasi ({orgZoom}%)</span>
                                <button onClick={() => setOrgZoom(z => Math.max(z - 10, 50))} className="hover:text-wmu-accent transition-colors flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                    <Minus size={14} /> Zoom Out
                                </button>
                                <button onClick={() => setOrgZoom(z => Math.min(z + 10, 150))} className="hover:text-wmu-accent transition-colors flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                    <Plus size={14} /> Zoom In
                                </button>
                                <div className="w-px h-4 bg-gray-200"></div>
                                <button onClick={() => setOrgZoom(100)} className="hover:text-wmu-accent transition-colors flex items-center gap-1">
                                    <Users size={14} /> Reset
                                </button>
                            </div>

                            {/* Org Chart Container */}
                            <div className="overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-200 flex justify-center">
                            {tentang?.struktur_organisasi_image ? (
                                <div className="flex justify-center w-full">
                                    <img 
                                        src={`/storage/${tentang.struktur_organisasi_image}`} 
                                        alt="Struktur Organisasi" 
                                        className="w-full h-auto max-w-4xl object-contain transition-transform duration-300 origin-top"
                                        style={{ transform: `scale(${orgZoom / 100})` }}
                                    />
                                </div>
                            ) : (
                                <div 
                                    className="min-w-[800px] flex flex-col items-center select-none pt-4 transition-transform duration-300 origin-top"
                                    style={{ transform: `scale(${orgZoom / 100})` }}
                                >
                                    {/* Komisaris & Direktur Utama */}
                                    <div className="bg-wmu-dark text-white font-bold py-2.5 px-6 rounded shadow flex items-center gap-2 z-10 text-xs w-48 justify-center">
                                        <Users size={14} className="text-wmu-accent" /> KOMISARIS UTAMA
                                    </div>

                                    <div className="w-px h-6 bg-gray-300"></div>

                                    <div className="bg-wmu-dark text-white font-bold py-2.5 px-6 rounded shadow flex items-center gap-2 z-10 text-xs w-48 justify-center">
                                        <Users size={14} className="text-wmu-accent" /> DIREKTUR UTAMA
                                    </div>

                                    <div className="w-px h-8 bg-gray-300"></div>
                                    <div className="w-[600px] h-px bg-gray-300"></div>

                                    <div className="flex justify-between w-[600px]">
                                        <div className="w-px h-6 bg-gray-300"></div>
                                        <div className="w-px h-6 bg-gray-300 relative">
                                            {/* Center branch down */}
                                            <div className="absolute top-0 left-0 w-px h-24 bg-gray-300 -z-10"></div>
                                        </div>
                                        <div className="w-px h-6 bg-gray-300"></div>
                                    </div>

                                    <div className="flex justify-between w-[700px] -mt-0">
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2 z-10 text-[10px] w-40 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> MANAGER MARKETING
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2 z-10 text-[10px] w-40 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> PROJECT COORDINATOR
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2 z-10 text-[10px] w-40 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> ADM. KEUANGAN
                                        </div>
                                    </div>

                                    <div className="flex justify-between w-[700px] mt-4">
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2 z-10 text-[10px] w-32 justify-center ml-4">
                                            <Users size={12} className="text-gray-400" /> STAFF
                                        </div>
                                        <div className="bg-wmu-dark text-white font-bold py-2.5 px-6 rounded shadow flex items-center gap-2 z-10 text-xs w-48 justify-center mt-2">
                                            <Users size={14} className="text-wmu-accent" /> PROJECT MANAGER
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2 z-10 text-[10px] w-36 justify-center mr-2">
                                            <Users size={12} className="text-gray-400" /> PURCHASING / STAFF
                                        </div>
                                    </div>

                                    <div className="w-px h-8 bg-gray-300"></div>
                                    <div className="w-[600px] h-px bg-gray-300"></div>

                                    <div className="flex justify-between w-[600px]">
                                        <div className="w-px h-6 bg-gray-300"></div>
                                        <div className="w-px h-6 bg-gray-300"></div>
                                        <div className="w-px h-6 bg-gray-300 relative">
                                            <div className="absolute top-0 left-0 w-px h-24 bg-gray-300 -z-10"></div>
                                        </div>
                                        <div className="w-px h-6 bg-gray-300"></div>
                                        <div className="w-px h-6 bg-gray-300"></div>
                                    </div>

                                    <div className="flex justify-between w-[680px]">
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-28 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> ESTIMATOR
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-28 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> ENGINEERING
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-32 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> SITE MANAGER
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-28 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> HSE K3
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-28 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> LOGISTIC
                                        </div>
                                    </div>

                                    <div className="flex justify-between w-[430px] mt-4 ml-[-250px]">
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-32 justify-center">
                                            <Users size={12} className="text-gray-400" /> QUALITY SURVEYOR
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-28 justify-center">
                                            <Users size={12} className="text-gray-400" /> DRAFTER
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-32 justify-center mt-2">
                                            <Users size={12} className="text-wmu-accent" /> QUALITY CONTROL
                                        </div>
                                    </div>

                                    <div className="w-px h-8 bg-gray-300 ml-12"></div>
                                    <div className="w-[150px] h-px bg-gray-300 ml-12"></div>

                                    <div className="flex justify-between w-[150px] ml-12">
                                        <div className="w-px h-6 bg-gray-300"></div>
                                        <div className="w-px h-6 bg-gray-300"></div>
                                    </div>

                                    <div className="flex justify-between w-[220px] ml-12">
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-24 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> SUPERVISOR
                                        </div>
                                        <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-24 justify-center">
                                            <Users size={12} className="text-wmu-accent" /> SURVIVOR
                                        </div>
                                    </div>

                                    <div className="w-px h-4 bg-gray-300 ml-[-70px]"></div>
                                    <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-24 justify-center ml-[-70px]">
                                        <Users size={12} className="text-gray-400" /> MANDOR
                                    </div>
                                    <div className="w-px h-4 bg-gray-300 ml-[-70px]"></div>
                                    <div className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-3 rounded shadow-sm flex items-center gap-1.5 z-10 text-[10px] w-24 justify-center ml-[-70px]">
                                        <Users size={12} className="text-gray-400" /> TUKANG
                                    </div>

                                </div>
                            )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-50 text-right text-[10px] text-gray-400">
                                * Data struktur organisasi dapat dikelola melalui sistem admin.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Kegiatan Kami */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="lg:w-1/4 shrink-0 lg:sticky lg:top-24">
                            <h2 className="text-wmu-accent font-bold tracking-widest text-xs uppercase mb-3">VIDEO KAMI</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Lihat Lebih Dekat Kegiatan Kami</h3>
                            <p className="text-gray-600 leading-relaxed text-sm mb-8">
                                Kami berkomitmen memberikan hasil terbaik di setiap proses pembangunan.
                            </p>
                        </div>

                        <div className="lg:w-3/4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {videos.length > 0 ? videos.map((video) => {
                                    const embedUrl = getYoutubeEmbedUrl(video.url_video);
                                    return (
                                        <motion.div
                                            key={video.id_video}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                            onClick={() => setActiveVideo(video)}
                                        >
                                            <div className="relative aspect-video bg-gray-200">
                                                <img 
                                                    src={video.gambar ? `/storage/${video.gambar}` : '/images/civil_construction_hero.png'} 
                                                    alt={video.judul_video} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                                />
                                                <div className="absolute inset-0 bg-wmu-dark/30 group-hover:bg-wmu-dark/50 transition-colors"></div>

                                                {/* Play Button */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                    <div className="w-14 h-14 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/60 group-hover:scale-110 group-hover:bg-wmu-accent/80 transition-all duration-300 shadow-xl">
                                                        <Play size={22} fill="currentColor" className="ml-1" />
                                                    </div>
                                                </div>

                                                {video.durasi && (
                                                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                                        <Play size={9} fill="currentColor" /> {video.durasi}
                                                    </div>
                                                )}

                                                {/* YouTube badge */}
                                                {video.url_video && video.url_video.includes('youtube') && (
                                                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                                        ▶ YouTube
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex-grow">
                                                <h4 className="font-bold text-sm text-gray-900 group-hover:text-wmu-accent transition-colors line-clamp-2 leading-snug">{video.judul_video}</h4>
                                            </div>
                                        </motion.div>
                                    );
                                }) : (
                                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 text-gray-400">
                                        <Play size={48} className="mx-auto mb-4 opacity-20" />
                                        <p className="font-medium">Belum ada video kegiatan saat ini.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
                        onClick={() => setActiveVideo(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="relative z-10 w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setActiveVideo(null)}
                                className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                            >
                                <X size={18} />
                            </button>

                            {/* Video player */}
                            <div className="relative aspect-video bg-black">
                                {activeVideo.sumber === 'Upload' && activeVideo.file_video ? (
                                    <video 
                                        src={`/storage/${activeVideo.file_video}`} 
                                        controls 
                                        autoPlay 
                                        className="w-full h-full"
                                        poster={activeVideo.gambar ? `/storage/${activeVideo.gambar}` : undefined}
                                    />
                                ) : activeVideo.sumber === 'Youtube' && getYoutubeEmbedUrl(activeVideo.url_video) ? (
                                    <iframe
                                        src={getYoutubeEmbedUrl(activeVideo.url_video)}
                                        title={activeVideo.judul_video}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img 
                                            src={activeVideo.gambar ? `/storage/${activeVideo.gambar}` : '/images/civil_construction_hero.png'} 
                                            alt={activeVideo.judul_video}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
                                            <p className="text-white text-sm font-medium">Video tidak tersedia</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Video title */}
                            <div className="bg-wmu-dark p-4">
                                <h4 className="text-white font-bold text-sm">{activeVideo.judul_video}</h4>
                                {activeVideo.durasi && (
                                    <span className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                                        <Play size={10} fill="currentColor" /> Durasi: {activeVideo.durasi}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </PublicLayout>
    );
}
