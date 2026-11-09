import { usePage, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { waLink } from '@/utils/contact';
import SeoHead from '@/Components/SeoHead';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, CheckCircle2, ArrowRight, Wrench, 
    MessageSquare, ShieldCheck, Settings, CheckCircle, 
    Layers, Briefcase, Zap
} from 'lucide-react';

export default function LayananDetail({ layanan, layananLain }) {
    const { pengaturan } = usePage().props;

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const waHref = waLink(
        pengaturan,
        `Halo WMU, saya tertarik dan ingin konsultasi mengenai layanan ${layanan.judul_layanan}.`
    );

    // Default icon helper if none specified in DB
    const getIconForFeature = (index) => {
        const icons = [CheckCircle2, ShieldCheck, Zap, Settings, Layers, Briefcase];
        return icons[index % icons.length];
    };

    return (
        <PublicLayout>
            <SeoHead 
                title={layanan.judul_layanan} 
                description={layanan.deskripsi || layanan.judul_layanan}
                image={layanan.gambar ? `/storage/${layanan.gambar}` : null}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-wmu-dark">
                <div className="absolute inset-0 z-0">
                    <img
                        src={layanan.gambar_detail ? `/storage/${layanan.gambar_detail}` : (layanan.gambar ? `/storage/${layanan.gambar}` : 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071')}
                        alt={layanan.judul_layanan}
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
                            <Link href={route('layanan')} className="inline-flex items-center text-gray-300 hover:text-wmu-accent transition-colors text-sm font-medium">
                                <ArrowLeft size={16} className="mr-2" />
                                Kembali ke Layanan
                            </Link>
                            
                            {layanan.kategori && (
                                <div className="bg-wmu-accent/20 border border-wmu-accent text-wmu-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {layanan.kategori}
                                </div>
                            )}
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                            {layanan.judul_layanan}
                        </h1>
                        
                        <p className="text-xl text-gray-300 max-w-3xl mb-8 leading-relaxed font-light">
                            {layanan.deskripsi}
                        </p>
                        
                        <a 
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-wmu-dark bg-wmu-accent rounded-xl hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,191,98,0.4)]"
                        >
                            Konsultasi Sekarang
                            <MessageSquare size={20} className="ml-2" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16">
                        
                        {/* Main Detail */}
                        <div className="w-full lg:w-2/3">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="mb-12"
                            >
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Deskripsi Layanan</h2>
                                <div className="text-gray-600 text-lg leading-relaxed max-w-none [&_p]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_a]:text-wmu-accent [&_a]:underline [&_strong]:text-gray-900">
                                    {layanan.deskripsi_lengkap ? (
                                        <div dangerouslySetInnerHTML={{ __html: layanan.deskripsi_lengkap.replace(/\n/g, '<br/>') }} />
                                    ) : (
                                        <p>{layanan.deskripsi}</p>
                                    )}
                                </div>
                            </motion.div>

                            {/* Fitur / Apa yang Anda Dapatkan */}
                            {layanan.fitur_layanan && layanan.fitur_layanan.length > 0 && (
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    className="mb-16"
                                >
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Apa yang Anda Dapatkan</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {layanan.fitur_layanan.map((fitur, index) => {
                                            const Icon = getIconForFeature(index);
                                            return (
                                                <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-wmu-accent hover:shadow-md transition-all duration-300">
                                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-wmu-accent mb-4">
                                                        <Icon size={24} />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{fitur.judul}</h3>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{fitur.deskripsi}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                            
                            {/* Proses Kerja */}
                            {layanan.proses_kerja && layanan.proses_kerja.length > 0 && (
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                >
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Tahapan Proses Kerja</h2>
                                    <div className="space-y-6">
                                        {layanan.proses_kerja.map((proses, index) => (
                                            <div key={index} className="flex gap-6 items-start relative group">
                                                {/* Connecting line */}
                                                {index !== layanan.proses_kerja.length - 1 && (
                                                    <div className="absolute left-6 top-14 bottom-[-1.5rem] w-px bg-gray-200 group-hover:bg-wmu-accent/30 transition-colors"></div>
                                                )}
                                                
                                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-extrabold text-gray-400 group-hover:bg-wmu-accent group-hover:text-wmu-dark transition-all duration-300 shrink-0 relative z-10 border-[3px] border-white shadow-sm">
                                                    {index + 1}
                                                </div>
                                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex-grow group-hover:border-wmu-accent/30 group-hover:shadow-md transition-all duration-300">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{proses.langkah}</h3>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{proses.deskripsi}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="w-full lg:w-1/3">
                            <div className="lg:sticky lg:top-32 space-y-8">
                                {/* Keunggulan Layanan */}
                                {layanan.keunggulan_layanan && layanan.keunggulan_layanan.length > 0 && (
                                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                        <h3 className="text-xl font-extrabold text-gray-900 mb-6">Mengapa Memilih Kami?</h3>
                                        <ul className="space-y-4">
                                            {layanan.keunggulan_layanan.map((keunggulan, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <CheckCircle size={20} className="text-wmu-accent shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 text-sm font-medium leading-relaxed">{keunggulan}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* CTA Card */}
                                <div className="bg-wmu-dark rounded-2xl p-8 text-center border-b-4 border-wmu-accent relative overflow-hidden">
                                    {/* Abstract background shape */}
                                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-wmu-accent/10 rounded-full blur-2xl"></div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-3 relative z-10">Mulai Proyek Anda!</h3>
                                    <p className="text-gray-400 text-sm mb-6 relative z-10">
                                        Diskusikan kebutuhan {layanan.judul_layanan} Anda dengan tim ahli kami untuk solusi terbaik.
                                    </p>
                                    <a 
                                        href={waHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-wmu-dark bg-wmu-accent rounded-xl hover:bg-white transition-all duration-300 relative z-10"
                                    >
                                        Hubungi Kami <ArrowRight size={16} className="ml-2" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {layananLain && layananLain.length > 0 && (
                <section className="py-20 bg-gray-50 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Layanan Lainnya</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Kami juga menyediakan berbagai layanan konstruksi profesional lainnya untuk memenuhi kebutuhan proyek Anda.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {layananLain.map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={route('layanan.detail', item.slug)}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100 flex flex-col h-full"
                                >
                                    <div className="h-40 overflow-hidden relative">
                                        <img 
                                            src={item.gambar ? `/storage/${item.gambar}` : 'https://images.unsplash.com/photo-1541888087405-eb10d061f558?q=80&w=2070'} 
                                            alt={item.judul_layanan}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg leading-tight group-hover:text-wmu-accent transition-colors">
                                            {item.judul_layanan}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <p className="text-gray-500 text-xs line-clamp-3 mb-4 flex-grow">{item.deskripsi}</p>
                                        <div className="text-wmu-accent font-bold text-xs uppercase tracking-wider flex items-center group-hover:text-wmu-dark transition-colors">
                                            Lihat Detail <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
