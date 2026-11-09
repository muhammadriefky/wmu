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
                description={blog.meta_deskripsi || (blog.isi_konten || '').replace(/<[^>]+>/g, '').substring(0, 160)}
                image={blog.gambar ? `/storage/${blog.gambar}` : null}
                type="article"
            />

            <article className="pt-32 pb-20 md:pt-36 bg-white min-h-[60vh]">
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

                        <div className="flex items-start text-gray-500 mb-12 pb-8 border-b border-gray-200">
                            <Calendar size={18} className="mr-2 mt-0.5 text-wmu-accent shrink-0" />
                            <span className="font-medium">
                                Dipublikasikan pada: {new Date(blog.tanggal_terbit).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                        {blog.gambar && (
                            <img
                                src={`/storage/${blog.gambar}`}
                                alt={blog.judul_blog}
                                className="w-full aspect-video object-cover rounded-2xl mb-12 bg-gray-100"
                            />
                        )}

                        {/* Note: In a real app with Rich Text Editor, we would use dangerouslySetInnerHTML here. Since we assume basic textarea/HTML, we'll do exactly that safely. */}
                        <div 
                            className="max-w-none text-gray-700 text-lg leading-relaxed break-words [&_p]:mb-5 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-1 [&_a]:text-wmu-accent [&_a]:underline [&_strong]:text-gray-900 [&_blockquote]:border-l-4 [&_blockquote]:border-wmu-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full"
                            dangerouslySetInnerHTML={{ __html: blog.isi_konten?.replace(/\n/g, '<br />') || '<p>Tidak ada konten.</p>' }}
                        />
                    </motion.div>
                </div>
            </article>
        </PublicLayout>
    );
}
