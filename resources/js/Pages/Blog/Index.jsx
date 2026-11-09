import { usePage, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { waLink, phoneNumber, companyName } from '@/utils/contact';
import SeoHead from '@/Components/SeoHead';
import { motion } from 'framer-motion';
import {
    ChevronRight, ChevronDown, LayoutGrid, Settings,
    Home, Briefcase, ShieldCheck, TrendingUp,
    Clock, ArrowRight, ChevronLeft, Phone, Tag
} from 'lucide-react';

export default function Index({ blog, kategoriList = [], popularBlogs = [], filters = {} }) {
    const { pengaturan } = usePage().props;

    // Filter kategori dijalankan di server agar berlaku di semua halaman pagination
    const activeCategory = filters?.kategori || 'Semua';
    const setActiveCategory = (kat) => {
        router.get(
            route('blog'),
            kat === 'Semua' ? {} : { kategori: kat },
            { preserveScroll: true, preserveState: true }
        );
    };

    const filteredBlogs = blog?.data ?? [];
    const defaultAuthor = companyName(pengaturan);
    return (
        <PublicLayout hideCTA={true}>
            <SeoHead 
                title="Blog & Insight" 
                description="Kumpulan artikel, berita, dan tips seputar dunia konstruksi dari pakarnya."
            />

            {/* Hero Section */}
            <section className="relative bg-wmu-dark text-white min-h-[500px] flex items-center overflow-hidden">
                {/* Full-screen civil construction background with low opacity */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/civil_construction_hero.png"
                        alt="Civil Construction Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-wmu-dark/95 via-wmu-dark/80 to-wmu-dark/60"></div>
                    {/* Subtle texture dots overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
                </div>

                {/* Decorative accent glow */}
                <div className="absolute top-20 right-20 w-80 h-80 bg-wmu-accent/10 rounded-full blur-3xl pointer-events-none z-0"></div>
                <div className="absolute bottom-10 left-10 w-60 h-60 bg-wmu-accent/5 rounded-full blur-2xl pointer-events-none z-0"></div>

                {/* Content Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-32 pb-32 md:pb-40 md:pt-40">
                    <div className="max-w-2xl">
                        {/* Breadcrumb */}
                        <div className="flex items-center text-xs text-gray-400 mb-6 tracking-wide">
                            <Link href="/" className="hover:text-wmu-accent transition-colors">Home</Link>
                            <ChevronRight size={14} className="mx-1 text-wmu-accent" />
                            <span className="text-gray-200">Blog</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white tracking-tight drop-shadow-md">
                            Artikel & Insight
                        </h1>

                        <h2 className="text-lg md:text-xl font-bold text-wmu-accent mb-6 drop-shadow-md">
                            Pengetahuan untuk Membangun Lebih Baik
                        </h2>

                        <p className="text-gray-300 leading-relaxed text-sm max-w-md">
                            Temukan berbagai artikel, tips, dan insight terbaru seputar konstruksi fasade, teknologi, project, dan inovasi industri.
                        </p>
                    </div>
                </div>

                {/* Wave SVG transition to white section below */}
                <div className="absolute bottom-0 left-0 right-0 z-10 leading-none">
                    <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20 lg:h-24" fill="white">
                        <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z" />
                    </svg>
                </div>
            </section>

            {/* Category Filter */}
            <section className="bg-white pb-12 pt-8 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        <button 
                            onClick={() => setActiveCategory('Semua')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold shadow-sm border transition-colors ${
                                activeCategory === 'Semua' 
                                    ? 'bg-wmu-dark text-white border-wmu-dark hover:bg-gray-800' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            <LayoutGrid size={16} className={activeCategory === 'Semua' ? 'text-wmu-accent' : 'text-gray-400'} /> Semua Artikel
                        </button>
                        
                        {(Array.isArray(kategoriList) ? kategoriList : Object.values(kategoriList || {})).map(kat => (
                            <button 
                                key={kat}
                                onClick={() => setActiveCategory(kat)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold shadow-sm border transition-colors ${
                                    activeCategory === kat 
                                        ? 'bg-wmu-dark text-white border-wmu-dark hover:bg-gray-800' 
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <Tag size={16} className={activeCategory === kat ? 'text-wmu-accent' : 'text-gray-400'} /> {kat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-white pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Left Column - Articles */}
                        <div className="lg:w-2/3">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900">Artikel Terbaru</h3>
                                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 font-medium">
                                    Urutan: Terbaru
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                {filteredBlogs.length > 0 ? (
                                    filteredBlogs.map((item) => (
                                        <div key={item.id_blog} className="flex flex-col md:flex-row gap-6 border border-gray-200 p-4 rounded-2xl hover:shadow-lg transition-all duration-300 group bg-white">
                                            {/* Image */}
                                            <div className="w-full md:w-[280px] h-[220px] shrink-0 rounded-xl overflow-hidden relative bg-gray-100">
                                                <img src={item.gambar ? `/storage/${item.gambar}` : 'https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=600'} alt={item.judul_blog} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute bottom-3 left-3 bg-wmu-dark/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded tracking-wide uppercase">
                                                    {item.kategori || 'Artikel'}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col flex-grow min-w-0 py-2 pr-2">
                                                <div className="text-xs text-gray-400 mb-2 font-medium">
                                                    {new Date(item.tanggal_terbit).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </div>
                                                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-wmu-dark transition-colors leading-snug line-clamp-2">
                                                    <Link href={`/blog/${item.slug}`}>{item.judul_blog}</Link>
                                                </h4>
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                                                    {item.meta_deskripsi || 'Baca selengkapnya untuk mengetahui informasi lebih lanjut mengenai artikel ini. Kami menyediakan insight dan pengetahuan terbaik seputar industri.'}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto mb-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.penulis || defaultAuthor)}&background=032F40&color=fff`} alt="Author" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-700">{item.penulis || defaultAuthor}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                                                        <Clock size={14} /> 5 menit baca
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-gray-100">
                                                    <Link href={`/blog/${item.slug}`} className="text-wmu-accent font-bold text-sm flex items-center group-hover:text-wmu-dark transition-colors">
                                                        Baca Selengkapnya <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                        Belum ada artikel yang dipublikasikan.
                                    </div>
                                )}
                            </div>

                            {/* Pagination (data dari paginator Laravel) */}
                            {blog?.last_page > 1 && (
                                <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                                    {blog.links.map((link, idx) => {
                                        const isPrev = idx === 0;
                                        const isNext = idx === blog.links.length - 1;
                                        const label = isPrev ? <ChevronLeft size={16} /> : isNext ? <ChevronRight size={16} /> : link.label;
                                        const base = 'min-w-8 h-8 px-2 flex items-center justify-center rounded-lg font-bold text-xs transition-colors';

                                        if (!link.url) {
                                            return (
                                                <span key={idx} className={`${base} text-gray-300`}>{label}</span>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={idx}
                                                href={link.url}
                                                preserveScroll
                                                className={`${base} ${link.active ? 'bg-wmu-dark text-white' : 'text-gray-500 hover:text-wmu-dark hover:bg-gray-100'}`}
                                            >
                                                {label}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:w-1/3 flex flex-col gap-10">
                            {/* Newsletter */}
                            <div className="bg-wmu-dark rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none"></div>
                                <h4 className="text-xl font-bold mb-3 relative z-10 tracking-tight">Newsletter</h4>
                                <p className="text-sm text-gray-300 mb-6 leading-relaxed relative z-10">
                                    Dapatkan update artikel terbaru seputar konstruksi fasade langsung di email Anda.
                                </p>
                                <form className="flex flex-col gap-3 relative z-10" onSubmit={(e) => e.preventDefault()}>
                                    <input type="email" placeholder="Email Anda" className="w-full bg-wmu-dark border border-gray-600 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-wmu-accent transition-colors placeholder:text-gray-500" />
                                    <button type="submit" className="w-full bg-wmu-accent hover:bg-wmu-accent/90 text-white rounded-lg px-4 py-3.5 font-bold text-sm transition-colors flex justify-center items-center gap-2">
                                        Berlangganan <ArrowRight size={16} />
                                    </button>
                                </form>
                                <div className="flex items-center gap-2 mt-5 text-[11px] text-gray-400 relative z-10 font-medium">
                                    <ShieldCheck size={14} className="shrink-0 text-gray-500" /> Kami tidak akan membagikan email Anda.
                                </div>
                            </div>

                            {/* Artikel Populer */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                                <h4 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Artikel Populer</h4>
                                <div className="flex flex-col gap-5">
                                    {popularBlogs.length > 0 ? popularBlogs.map((article, idx) => (
                                        <Link href={`/blog/${article.slug}`} key={article.id_blog} className="flex gap-4 group cursor-pointer items-center">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100 relative">
                                                <img src={article.gambar ? `/storage/${article.gambar}` : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200'} alt={article.judul_blog} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <div className="flex flex-col justify-center flex-grow">
                                                <span className="text-[10px] font-bold text-gray-400 mb-1">0{idx + 1}</span>
                                                <h5 className="font-bold text-sm text-gray-800 group-hover:text-wmu-dark transition-colors leading-snug line-clamp-2 mb-1.5">
                                                    {article.judul_blog}
                                                </h5>
                                                <span className="text-[10px] font-medium text-gray-500">
                                                    {new Date(article.tanggal_terbit).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </Link>
                                    )) : (
                                        <div className="text-sm text-gray-500 italic">Belum ada artikel.</div>
                                    )}
                                </div>
                            </div>

                            {/* Kategori */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                                <h4 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Kategori</h4>
                                <div className="flex flex-col gap-4">
                                    {(Array.isArray(kategoriList) ? kategoriList : Object.values(kategoriList || {})).map((kat, idx) => (
                                        <button 
                                            type="button"
                                            key={idx} 
                                            onClick={() => setActiveCategory(kat)}
                                            className="flex items-center justify-between group cursor-pointer text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Tag size={16} className="text-wmu-accent" />
                                                <span className={`text-sm transition-colors group-hover:text-wmu-dark ${activeCategory === kat ? 'font-bold text-wmu-dark' : 'font-medium text-gray-600'}`}>{kat}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Block for Blog Page */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 mt-16 -mb-8">
                    <div className="bg-wmu-dark rounded-2xl shadow-xl p-8 md:p-12 border border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-6 lg:w-2/3">
                            <div className="w-20 h-20 rounded-full border border-dashed border-wmu-accent/50 flex items-center justify-center shrink-0">
                                <div className="w-16 h-16 rounded-full border border-wmu-accent flex items-center justify-center text-wmu-accent">
                                    <Briefcase size={28} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Butuh Insight untuk Proyek Anda?</h3>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                    Konsultasikan kebutuhan proyek fasade Anda bersama tim ahli kami.{' '}<br className="hidden md:block" />
                                    Dapatkan solusi terbaik, tepat, dan efisien.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 shrink-0 lg:w-1/3 w-full sm:w-auto">
                            <a
                                href={waLink(pengaturan)}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-wmu-accent hover:bg-wmu-accent/90 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-lg flex items-center justify-center text-center w-full"
                            >
                                Konsultasi Gratis <ArrowRight size={18} className="ml-2" />
                            </a>
                            <a
                                href={`tel:${phoneNumber(pengaturan)}`}
                                className="text-gray-300 hover:text-white font-bold text-sm transition-colors flex items-center justify-center w-full"
                            >
                                <Phone size={16} className="mr-2 text-wmu-accent" /> {phoneNumber(pengaturan) || '(021) 1234 5678'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
