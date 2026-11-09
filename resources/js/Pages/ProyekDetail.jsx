import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, MapPin, Calendar, CheckCircle, Target, Trophy, Scaling } from 'lucide-react';

export default function ProyekDetail({ proyek, galeri }) {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <PublicLayout>
            <SeoHead 
                title={proyek.prk_judul} 
                description={proyek.prk_deskripsi?.substring(0, 160).replace(/(<([^>]+)>)/gi, "")}
                image={proyek.prk_gambar ? `/storage/${proyek.prk_gambar}` : null}
                url={route('proyek.detail', proyek.prk_slug)}
                type="article"
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-wmu-dark">
                <div className="absolute inset-0 z-0">
                    <img
                        src={proyek.prk_gambar ? `/storage/${proyek.prk_gambar}` : '/images/civil_construction_hero.png'}
                        alt={proyek.prk_judul}
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wmu-dark via-wmu-dark/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Link href={route('proyek')} className="inline-flex items-center text-gray-300 hover:text-wmu-accent transition-colors text-sm font-medium">
                                <ArrowLeft size={16} className="mr-2" />
                                Kembali ke Daftar Proyek
                            </Link>
                            
                            {proyek.prk_kategori && (
                                <div className="bg-wmu-accent/20 border border-wmu-accent text-wmu-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {proyek.prk_kategori}
                                </div>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg max-w-4xl">
                            {proyek.prk_judul}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <Building2 size={18} className="text-wmu-accent" />
                                <span>{proyek.prk_klien}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-wmu-accent" />
                                <span>{proyek.prk_tahun}</span>
                            </div>
                            {proyek.prk_luas && (
                                <div className="flex items-center gap-2">
                                    <Scaling size={18} className="text-wmu-accent" />
                                    <span>{proyek.prk_luas}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Wave Divider */}
            <div className="relative -mt-16 md:-mt-24 lg:-mt-32 z-20 overflow-hidden leading-[0]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-16 md:h-24 lg:h-32">
                    <path fill="#f9fafb" fillOpacity="1" d="M0,256L60,234.7C120,213,240,171,360,138.7C480,107,600,85,720,101.3C840,117,960,171,1080,181.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </div>

            {/* Content Section */}
            <section className="bg-gray-50 pb-24 relative z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Info */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8"
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-wmu-accent shrink-0">
                                        <CheckCircle size={16} />
                                    </div>
                                    Deskripsi Proyek
                                </h3>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
                                    {proyek.prk_deskripsi || "Detail deskripsi proyek belum ditambahkan."}
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                                            <Target size={16} />
                                        </div>
                                        Tantangan
                                    </h3>
                                    <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                                        {proyek.prk_tantangan || "Tantangan proyek belum dideskripsikan."}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                                            <Trophy size={16} />
                                        </div>
                                        Solusi & Hasil
                                    </h3>
                                    <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap mb-4">
                                        <span className="font-semibold block mb-1">Solusi:</span>
                                        {proyek.prk_solusi || "-"}
                                    </div>
                                    <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                                        <span className="font-semibold block mb-1">Hasil:</span>
                                        {proyek.prk_hasil || "-"}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-wmu-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <Building2 size={120} />
                                </div>
                                <h3 className="text-xl font-bold mb-6 relative z-10">Informasi Proyek</h3>
                                
                                <ul className="space-y-4 relative z-10">
                                    <li className="flex flex-col border-b border-white/10 pb-4">
                                        <span className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Klien</span>
                                        <span className="font-semibold text-lg">{proyek.prk_klien}</span>
                                    </li>
                                    <li className="flex flex-col border-b border-white/10 pb-4">
                                        <span className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Kategori</span>
                                        <span className="font-semibold">{proyek.prk_kategori}</span>
                                    </li>
                                    <li className="flex flex-col border-b border-white/10 pb-4">
                                        <span className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Tahun Selesai</span>
                                        <span className="font-semibold">{proyek.prk_tahun}</span>
                                    </li>
                                    {proyek.prk_luas && (
                                        <li className="flex flex-col pb-2">
                                            <span className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Luas Fasade</span>
                                            <span className="font-semibold text-wmu-accent">{proyek.prk_luas}</span>
                                        </li>
                                    )}
                                </ul>
                            </motion.div>
                        </div>
                    </div>

                    {/* Gallery Section */}
                    {galeri?.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Galeri Proyek</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {galeri.map((img, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="rounded-2xl overflow-hidden aspect-video shadow-sm hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 group relative"
                                    >
                                        <img src={`/storage/${img}`} alt={`Galeri ${index+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-wmu-dark/0 group-hover:bg-wmu-dark/20 transition-colors"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </PublicLayout>
    );
}
