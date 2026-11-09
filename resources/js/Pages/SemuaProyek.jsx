import { useState, useMemo } from 'react';
import { usePage, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { companyName } from '@/utils/contact';
import { storageUrl } from '@/utils/storage';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Calendar, ArrowRight, Search, Filter, FolderOpen, ArrowLeft
} from 'lucide-react';

export default function SemuaProyek() {
    const { pengaturan, proyek, kategoriList = [] } = usePage().props;
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Semua');

    // Filter projects based on search query and category
    const filteredProjects = useMemo(() => {
        if (!proyek) return [];
        return proyek.filter(item => {
            const matchesSearch = item.prk_judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  (item.prk_klien && item.prk_klien.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = activeCategory === 'Semua' || item.prk_kategori === activeCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [proyek, searchQuery, activeCategory]);

    return (
        <PublicLayout pengaturan={pengaturan}>
            <SeoHead 
                title="Semua Proyek" 
                description={`Lihat daftar lengkap portofolio proyek konstruksi dari ${companyName(pengaturan)}.`}
            />

            {/* Header Section */}
            <section className="pt-32 pb-16 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-wmu-dark/5 rounded-bl-full transform translate-x-1/3 -translate-y-1/4 blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-6">
                        <Link href="/proyek" className="inline-flex items-center text-wmu-dark hover:text-wmu-accent font-semibold transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Kembali ke Portofolio
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-wmu-dark mb-4">Semua Proyek Kami</h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Jelajahi seluruh rekam jejak pekerjaan dan portofolio proyek {companyName(pengaturan)} dari berbagai kategori dan skala.
                    </p>
                </div>
            </section>

            {/* Filter and Search Section */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
                        
                        {/* Categories List */}
                        <div className="w-full lg:w-2/3 overflow-x-auto hide-scrollbar pb-2 lg:pb-0 -mb-2 lg:mb-0">
                            <div className="flex gap-2 min-w-max">
                                <button
                                    onClick={() => setActiveCategory('Semua')}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                        activeCategory === 'Semua' 
                                        ? 'bg-wmu-dark text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Semua
                                </button>
                                { (Array.isArray(kategoriList) ? kategoriList : Object.values(kategoriList || {})).map((kat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveCategory(kat)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                            activeCategory === kat 
                                            ? 'bg-wmu-accent text-white shadow-md' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {kat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full lg:w-1/3 relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-wmu-accent transition-colors">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama proyek atau klien..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-wmu-accent/20 focus:border-wmu-accent transition-all"
                            />
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* Project Grid */}
            <section className="py-16 bg-gray-50 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {filteredProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <FolderOpen size={48} className="text-gray-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Proyek Tidak Ditemukan</h3>
                            <p className="text-gray-500 max-w-md">
                                Kami tidak dapat menemukan proyek yang cocok dengan kata kunci "{searchQuery}" pada kategori {activeCategory}.
                            </p>
                            <button 
                                onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
                                className="mt-6 text-wmu-accent font-semibold hover:underline"
                            >
                                Reset Filter Pencarian
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredProjects.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        key={item.prk_id} 
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full"
                                    >
                                        <div className="relative h-56 overflow-hidden bg-gray-200">
                                            <img 
                                                src={storageUrl(item.prk_gambar, '/images/civil_construction_work.png')} 
                                                alt={item.prk_judul} 
                                                loading="lazy" 
                                                decoding="async" 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                            
                                            {item.prk_kategori && (
                                                <div className="absolute bottom-4 left-4">
                                                    <span className="bg-wmu-dark/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                                        {item.prk_kategori}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-6 md:p-8 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-wmu-dark mb-4 group-hover:text-wmu-accent transition-colors line-clamp-2">
                                                {item.prk_judul}
                                            </h3>
                                            
                                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                                                <div className="flex items-center text-gray-500 text-sm min-w-0 mr-4">
                                                    <MapPin size={16} className="mr-1.5 text-wmu-accent shrink-0" />
                                                    <span className="truncate">{item.prk_klien || 'Client'}</span>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-sm font-semibold shrink-0">
                                                    {item.prk_tahun}
                                                </div>
                                            </div>
                                            
                                            <Link 
                                                href={`/proyek/${item.prk_slug}`} 
                                                className="mt-6 flex items-center justify-between text-sm font-bold text-wmu-accent hover:text-wmu-dark transition-colors"
                                            >
                                                Lihat Detail
                                                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
