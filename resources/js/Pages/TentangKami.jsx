import { useState } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import {
    ArrowRight, HardHat, CheckCircle2,
    Award, ShieldCheck, Users, Headphones,
    Lightbulb, Leaf, Play, Binoculars, Building2,
    Plus, Minus
} from 'lucide-react';

export default function TentangKami() {
    const { pengaturan } = usePage().props;
    const [orgZoom, setOrgZoom] = useState(100);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <PublicLayout>
            <Head>
                <title>{`Tentang Kami - ${pengaturan?.nama_perusahaan || 'WMU'}`}</title>
                <meta name="description" content="Profil, sejarah, dan nilai-nilai perusahaan WMU." />
            </Head>

            {/* Hero Section */}
            <section className="relative bg-wmu-dark text-white min-h-[70vh] flex flex-col justify-center overflow-hidden">
                {/* Right side image */}
                <div className="absolute inset-0 z-0 flex justify-end">
                    <div className="w-full lg:w-[65%] h-full relative">
                        <img
                            src="https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=2070&auto=format&fit=crop"
                            alt="Hero Background"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark gradient for mobile */}
                        <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/90 to-transparent lg:hidden"></div>
                    </div>
                </div>

                {/* Diagonal dark shape for large screens */}
                <div
                    className="absolute inset-0 z-0 bg-wmu-dark hidden lg:block"
                    style={{ clipPath: 'polygon(0 0, 55% 0, 75% 100%, 0% 100%)' }}
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
                            <motion.div variants={fadeInUp} className="text-gray-300 text-sm mb-6 flex items-center gap-2">
                                <Link href="/" className="hover:text-wmu-accent transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-gray-100 font-medium">Tentang Kami</span>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
                                Tentang Kami
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-12 max-w-xl leading-relaxed">
                                Mengenal lebih dekat dedikasi dan perjalanan kami di industri konstruksi dengan standar kualitas terbaik.
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
                                {[
                                    { title: 'Integritas', desc: 'Menjunjung tinggi kejujuran, transparansi, dan etika dalam setiap pekerjaan.', icon: ShieldCheck },
                                    { title: 'Kualitas', desc: 'Berkomitmen menghasilkan kualitas terbaik di setiap detail.', icon: Award },
                                    { title: 'Keselamatan', desc: 'Mengutamakan keselamatan kerja demi melindungi tim dan lingkungan.', icon: HardHat },
                                    { title: 'Inovasi', desc: 'Terus berinovasi untuk menghadirkan solusi konstruksi yang lebih baik dan efisien.', icon: Lightbulb },
                                    { title: 'Kolaborasi', desc: 'Bekerja sama dengan tim, mitra, dan klien demi mencapai hasil terbaik.', icon: Users },
                                    { title: 'Keberlanjutan', desc: 'Membangun dengan memperhatikan dampak jangka panjang bagi masa depan.', icon: Leaf }
                                ].map((nilai, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300 group"
                                    >
                                        <div className="w-16 h-16 mx-auto bg-gray-50 border border-gray-100 rounded-[20px] flex items-center justify-center mb-5 group-hover:bg-wmu-accent/10 group-hover:border-wmu-accent/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                                            <nilai.icon size={28} className="text-wmu-accent/70 group-hover:text-wmu-accent transition-colors" strokeWidth={1.5} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{nilai.title}</h4>
                                        <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{nilai.desc}</p>
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
                                {[
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
                                <img src="https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=2070&auto=format&fit=crop" alt="Perjalanan Perusahaan" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-wmu-dark/20 hover:bg-wmu-dark/10 transition-colors duration-500"></div>

                                {/* Play Button Mock */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50 hover:scale-110 transition-transform">
                                        <Play size={32} fill="currentColor" className="ml-1.5" />
                                    </button>
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
                            <a href="#" className="inline-flex items-center justify-center bg-wmu-dark text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-wmu-dark/20">
                                Lihat Semua Video <ArrowRight size={16} className="ml-2" />
                            </a>
                        </div>

                        <div className="lg:w-3/4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { title: 'Proses Pembangunan Proyek Gedung Perkantoran', duration: '02:25', img: 'https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=2070' },
                                    { title: 'Manajemen Proyek Secara Profesional', duration: '01:45', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071' },
                                    { title: 'Komitmen Kami terhadap Keselamatan Kerja', duration: '02:12', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070' },
                                    { title: 'Hasil Konstruksi dengan Kualitas Terbaik', duration: '02:42', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070' }
                                ].map((video, idx) => (
                                    <div key={idx} className="group cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                                        <div className="relative aspect-[4/3] bg-gray-200">
                                            <img src={video.img} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-wmu-dark/20 group-hover:bg-wmu-dark/40 transition-colors"></div>

                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50 group-hover:scale-110 transition-transform">
                                                <Play size={16} fill="currentColor" className="ml-0.5" />
                                            </div>

                                            <div className="absolute bottom-2 left-2 bg-wmu-dark/80 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                                <Play size={10} fill="currentColor" /> {video.duration}
                                            </div>
                                        </div>
                                        <div className="p-4 flex-grow flex items-start">
                                            <h4 className="font-bold text-xs text-gray-900 group-hover:text-wmu-accent transition-colors line-clamp-3 leading-snug">{video.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </PublicLayout>
    );
}
