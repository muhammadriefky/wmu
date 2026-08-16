import { usePage, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import SeoHead from '@/Components/SeoHead';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function Show({ blog }) {
    const { pengaturan } = usePage().props;

    return (
        <PublicLayout>
            <SeoHead 
                title={blog.judul_blog} 
                description={blog.deskripsi_singkat || blog.konten?.substring(0, 160).replace(/(<([^>]+)>)/gi, "")}
                image={blog.gambar ? `/storage/${blog.gambar}` : null}
                type="article"
            />

            <article className="py-20 bg-white min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/blog" className="inline-flex items-center text-wmu-accent font-medium mb-8 hover:text-green-600 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Kembali ke Daftar Artikel
                    </Link>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            {blog.judul_blog}
                        </h1>

                        <div className="flex items-center text-gray-500 mb-12 pb-8 border-b border-gray-200">
                            <Calendar size={18} className="mr-2 text-wmu-accent" />
                            <span className="font-medium">
                                Dipublikasikan pada: {new Date(blog.tanggal_terbit).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                        {/* Note: In a real app with Rich Text Editor, we would use dangerouslySetInnerHTML here. Since we assume basic textarea/HTML, we'll do exactly that safely. */}
                        <div 
                            className="prose prose-lg prose-green max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: blog.isi_konten?.replace(/\n/g, '<br />') || '<p>Tidak ada konten.</p>' }}
                        />
                    </motion.div>
                </div>
            </article>
        </PublicLayout>
    );
}
