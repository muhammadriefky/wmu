import { usePage } from '@inertiajs/react';
import { companyName } from '@/utils/contact';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, ChevronRight, FileText, Send } from 'lucide-react';

export default function Karir({ karir = [] }) {
    const { pengaturan } = usePage().props;
    const hrdEmail = pengaturan?.email || 'hrd@wmu.com';
    const mailtoHref = (posisi) => `mailto:${hrdEmail}?subject=${encodeURIComponent(`Lamaran Pekerjaan: ${posisi}`)}`;

    return (
        <PublicLayout>
            <SeoHead 
                title="Karir" 
                description="Bergabunglah bersama WMU Construction. Temukan peluang karir terbaik di industri konstruksi."
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-wmu-dark">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/civil_construction_hero.png"
                        alt="Karir WMU"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/95 to-wmu-dark/80"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                                Bergabunglah Bersama <span className="text-wmu-accent">Tim Kami</span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                                Kami selalu mencari talenta-talenta terbaik yang memiliki semangat, dedikasi, dan profesionalisme untuk berkembang bersama {companyName(pengaturan)}.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* List Karir Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-wmu-accent font-bold tracking-widest text-sm uppercase mb-2">LOWONGAN TERSEDIA</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Peluang Karir Saat Ini</h3>
                    </div>

                    <div className="space-y-6">
                        {karir.length === 0 && (
                            <div className="py-16 px-6 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                                <Briefcase size={40} className="mx-auto mb-4 text-gray-300" />
                                <p className="font-medium text-gray-700 mb-1">Belum ada lowongan yang dibuka saat ini.</p>
                                <p className="text-sm">
                                    Kirimkan CV Anda ke{' '}
                                    <a href={`mailto:${hrdEmail}`} className="text-wmu-accent font-semibold hover:underline break-all">{hrdEmail}</a>
                                    {' '}untuk kesempatan berikutnya.
                                </p>
                            </div>
                        )}
                        {karir.map((item, index) => (
                            <motion.div
                                key={item.id_karir}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                                <Briefcase size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-wmu-accent transition-colors break-words">
                                                    {item.posisi}
                                                </h4>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold border border-green-100 mt-2">
                                                    <CheckCircle2 size={12} /> Buka (Full-time)
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                                <FileText size={16} className="text-wmu-accent" /> Persyaratan & Deskripsi
                                            </h5>
                                            <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap pl-6 border-l-2 border-gray-100">
                                                {item.persyaratan}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="md:w-64 shrink-0 flex flex-col justify-center">
                                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-3 font-medium text-center">Tertarik dengan posisi ini?</p>
                                            <a 
                                                href={mailtoHref(item.posisi)}
                                                className="w-full bg-wmu-dark text-white text-sm font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group-hover:bg-wmu-accent"
                                            >
                                                Kirim CV <Send size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
