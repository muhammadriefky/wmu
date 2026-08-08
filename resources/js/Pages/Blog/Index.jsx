import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { motion } from 'framer-motion';
import {
    ChevronRight, ChevronDown, LayoutGrid, Settings,
    Home, Briefcase, ShieldCheck, TrendingUp,
    Clock, ArrowRight, ChevronLeft, Phone
} from 'lucide-react';

export default function Index({ blog }) {
    const { pengaturan } = usePage().props;

    const popularArticles = [
        { id: 1, title: 'Jenis-Jenis Sistem Fasade pada Bangunan Modern', date: '12 Mei 2024', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200' },
        { id: 2, title: 'Perbedaan Curtain Wall dan Window Wall', date: '10 Mei 2024', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=200' },
        { id: 3, title: 'Cara Merawat Fasade Agar Tahan Lama dan Optimal', date: '8 Mei 2024', img: 'https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=200' },
        { id: 4, title: 'Keunggulan Aluminium Composite Panel (ACP)', date: '5 Mei 2024', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=200' },
        { id: 5, title: 'Proses Pengerjaan Fasade dari Awal Hingga Akhir', date: '2 Mei 2024', img: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=200' },
    ];

    const categories = [
        { name: 'Teknologi & Material', count: 18, icon: Settings },
        { name: 'Desain & Arsitektur', count: 15, icon: Home },
        { name: 'Proyek & Studi Kasus', count: 22, icon: Briefcase },
        { name: 'Tips & Panduan', count: 17, icon: ShieldCheck },
        { name: 'Industri & Tren', count: 12, icon: TrendingUp },
    ];

    return (
        <PublicLayout hideCTA={true}>
            <Head>
                <title>{`Blog & Insight - ${pengaturan?.nama_perusahaan || 'WMU'}`}</title>
                <meta name="description" content="Kumpulan artikel, berita, dan tips seputar dunia konstruksi dari pakarnya." />
            </Head>

            {/* Hero Section */}
            <section className="relative bg-wmu-dark text-white min-h-[500px] flex items-center overflow-hidden">
                {/* Right side image */}
                <div className="absolute inset-0 z-0 flex justify-end">
                    <div className="w-full lg:w-[65%] h-full relative">
                        <img
                            src="https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=2070"
                            alt="Blog Hero"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark gradient for mobile */}
                        <div className="absolute inset-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/90 to-transparent lg:hidden"></div>
                    </div>
                </div>

                {/* Diagonal dark shape for large screens */}
                <div
                    className="absolute inset-0 z-0 bg-gradient-to-r from-wmu-dark via-wmu-dark/80 to-wmu-dark/30 hidden lg:block backdrop-blur-sm"
                    style={{ clipPath: 'polygon(0 0, 50% 0, 75% 100%, 0% 100%)' }}
                ></div>

                {/* Content Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-32 pb-24 md:pb-32 md:pt-40">
                    <div className="max-w-2xl">
                        {/* Breadcrumb */}
                        <div className="flex items-center text-xs text-gray-400 mb-6 tracking-wide">
                            <Link href="/" className="hover:text-wmu-accent transition-colors">Home</Link>
                            <ChevronRight size={14} className="mx-1 text-[#DFA639]" />
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
            </section>

            {/* Category Filter */}
            <section className="bg-white pb-12 pt-8 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        <button className="flex items-center gap-2 bg-wmu-dark text-white px-6 py-3 rounded-lg text-xs font-semibold shadow-md border border-wmu-dark hover:bg-gray-800 transition-colors">
                            <LayoutGrid size={16} className="text-wmu-accent" /> Semua Artikel
                        </button>
                        <button className="flex items-center gap-2 bg-white text-gray-600 px-6 py-3 rounded-lg text-xs font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                            <Settings size={16} className="text-wmu-accent" /> Teknologi & Material
                        </button>
                        <button className="flex items-center gap-2 bg-white text-gray-600 px-6 py-3 rounded-lg text-xs font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                            <Home size={16} className="text-wmu-accent" /> Desain & Arsitektur
                        </button>
                        <button className="flex items-center gap-2 bg-white text-gray-600 px-6 py-3 rounded-lg text-xs font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                            <Briefcase size={16} className="text-wmu-accent" /> Proyek & Studi Kasus
                        </button>
                        <button className="flex items-center gap-2 bg-white text-gray-600 px-6 py-3 rounded-lg text-xs font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                            <ShieldCheck size={16} className="text-wmu-accent" /> Tips & Panduan
                        </button>
                        <button className="flex items-center gap-2 bg-white text-gray-600 px-6 py-3 rounded-lg text-xs font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                            <TrendingUp size={16} className="text-wmu-accent" /> Industri & Tren
                        </button>
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
                                <div className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors font-medium">
                                    Urutkan: Terbaru <ChevronDown size={16} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                {blog.data && blog.data.length > 0 ? (
                                    blog.data.map((item) => (
                                        <div key={item.id_blog} className="flex flex-col md:flex-row gap-6 border border-gray-200 p-4 rounded-2xl hover:shadow-lg transition-all duration-300 group bg-white">
                                            {/* Image */}
                                            <div className="w-full md:w-[280px] h-[220px] shrink-0 rounded-xl overflow-hidden relative bg-gray-100">
                                                <img src={item.gambar ? `/storage/${item.gambar}` : 'https://images.unsplash.com/photo-1541888081688-6627a834f826?q=80&w=600'} alt={item.judul_blog} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute bottom-3 left-3 bg-wmu-dark/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded tracking-wide uppercase">
                                                    {item.kategori?.nama_kategori || 'Artikel'}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col flex-grow py-2 pr-2">
                                                <div className="text-xs text-gray-400 mb-2 font-medium">
                                                    {new Date(item.tanggal_terbit).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </div>
                                                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-wmu-dark transition-colors leading-snug line-clamp-2">
                                                    <Link href={`/blog/${item.slug}`}>{item.judul_blog}</Link>
                                                </h4>
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                                                    {item.meta_deskripsi || 'Baca selengkapnya untuk mengetahui informasi lebih lanjut mengenai artikel ini. Kami menyediakan insight dan pengetahuan terbaik seputar industri.'}
                                                </p>

                                                <div className="flex items-center gap-5 mt-auto mb-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                                            <img src={`https://ui-avatars.com/api/?name=${item.penulis || 'BuildPro+Team'}&background=032F40&color=fff`} alt="Author" className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-700">{item.penulis || 'BuildPro Team'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                                                        <Clock size={14} /> 5 menit baca
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-gray-100">
                                                    <Link href={`/blog/${item.slug}`} className="text-[#DFA639] font-bold text-sm flex items-center group-hover:text-yellow-600 transition-colors">
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

                            {/* Pagination */}
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-wmu-dark hover:bg-gray-100 transition-colors">
                                    <ChevronLeft size={16} />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-wmu-dark text-white font-bold text-xs transition-colors">
                                    1
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-wmu-dark hover:bg-gray-100 font-bold text-xs transition-colors">
                                    2
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-wmu-dark hover:bg-gray-100 font-bold text-xs transition-colors">
                                    3
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-wmu-dark hover:bg-gray-100 font-bold text-xs transition-colors">
                                    4
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-wmu-dark hover:bg-gray-100 font-bold text-xs transition-colors">
                                    5
                                </button>
                                <span className="px-1 text-gray-400">...</span>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-wmu-dark hover:bg-gray-100 font-bold text-xs transition-colors">
                                    12
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-wmu-dark hover:bg-gray-100 transition-colors">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
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
                                    <input type="email" placeholder="Email Anda" className="w-full bg-wmu-dark border border-gray-600 rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#DFA639] transition-colors placeholder:text-gray-500" />
                                    <button type="submit" className="w-full bg-wmu-accent hover:bg-yellow-500 text-white rounded-lg px-4 py-3.5 font-bold text-sm transition-colors flex justify-center items-center gap-2">
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
                                    {popularArticles.map((article) => (
                                        <div key={article.id} className="flex gap-4 group cursor-pointer items-center">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                                <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <div className="flex flex-col justify-center flex-grow">
                                                <span className="text-[10px] font-bold text-gray-400 mb-1">0{article.id}</span>
                                                <h5 className="font-bold text-sm text-gray-800 group-hover:text-wmu-dark transition-colors leading-snug line-clamp-2 mb-1.5">
                                                    {article.title}
                                                </h5>
                                                <span className="text-[10px] font-medium text-gray-500">{article.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Kategori */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                                <h4 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Kategori</h4>
                                <div className="flex flex-col gap-4">
                                    {categories.map((cat, idx) => (
                                        <div key={idx} className="flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <cat.icon size={16} className="text-[#DFA639]" />
                                                <span className="text-sm font-medium text-gray-600 group-hover:text-wmu-dark transition-colors">{cat.name}</span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-400 group-hover:text-wmu-dark transition-colors">({cat.count})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Block for Blog Page */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 mt-16 -mb-8">
                    <div className="bg-wmu-dark rounded-2xl shadow-xl p-8 md:p-12 border border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6 lg:w-2/3">
                            <div className="w-20 h-20 rounded-full border border-dashed border-wmu-accent/50 flex items-center justify-center shrink-0">
                                <div className="w-16 h-16 rounded-full border border-wmu-accent flex items-center justify-center text-wmu-accent">
                                    <Briefcase size={28} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Butuh Insight untuk Proyek Anda?</h3>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                    Konsultasikan kebutuhan proyek fasade Anda bersama tim ahli kami.<br className="hidden md:block" />
                                    Dapatkan solusi terbaik, tepat, dan efisien.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 shrink-0 lg:w-1/3 w-full sm:w-auto">
                            <a
                                href={`https://wa.me/${pengaturan?.no_telepon?.replace(/\D/g, '') || '6281234567890'}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-wmu-accent hover:bg-[#c9922b] text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-lg flex items-center justify-center text-center w-full"
                            >
                                Konsultasi Gratis <ArrowRight size={18} className="ml-2" />
                            </a>
                            <a
                                href={`tel:${pengaturan?.no_telepon || '02112345678'}`}
                                className="text-gray-300 hover:text-white font-bold text-sm transition-colors flex items-center justify-center w-full"
                            >
                                <Phone size={16} className="mr-2 text-wmu-accent" /> {pengaturan?.no_telepon || '(021) 1234 5678'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
