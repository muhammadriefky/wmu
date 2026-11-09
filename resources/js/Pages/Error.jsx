import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Home, Phone } from 'lucide-react';

const MESSAGES = {
    403: {
        title: 'Akses Ditolak',
        description: 'Anda tidak memiliki izin untuk membuka halaman ini.',
    },
    404: {
        title: 'Halaman Tidak Ditemukan',
        description: 'Halaman yang Anda cari mungkin sudah dipindahkan, dihapus, atau alamatnya salah ketik.',
    },
    419: {
        title: 'Sesi Berakhir',
        description: 'Sesi Anda telah kedaluwarsa. Silakan muat ulang halaman dan coba lagi.',
    },
    429: {
        title: 'Terlalu Banyak Permintaan',
        description: 'Anda mengirim terlalu banyak permintaan dalam waktu singkat. Mohon tunggu sebentar lalu coba lagi.',
    },
    500: {
        title: 'Terjadi Kesalahan',
        description: 'Maaf, terjadi kesalahan pada server kami. Tim kami akan segera memperbaikinya.',
    },
    503: {
        title: 'Sedang Dalam Perawatan',
        description: 'Website sedang dalam perawatan rutin. Silakan kembali beberapa saat lagi.',
    },
};

/**
 * Halaman error mandiri (tanpa PublicLayout) karena untuk URL yang tidak
 * cocok dengan route manapun, shared props (pengaturan, auth) tidak tersedia.
 */
export default function Error({ status = 500 }) {
    const { title, description } = MESSAGES[status] ?? MESSAGES[500];

    return (
        <div className="min-h-screen bg-wmu-dark text-white flex items-center justify-center px-4 py-16 relative overflow-hidden">
            <Head title={title} />

            <div className="absolute -top-32 -right-32 w-96 h-96 bg-wmu-accent/10 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-wmu-accent/10 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative max-w-xl w-full text-center">
                <Link href="/" className="inline-block mb-10" aria-label="Kembali ke beranda">
                    <img src="/images/logonobg.png" alt="WMU" className="h-16 mx-auto" />
                </Link>

                <p className="text-wmu-accent font-extrabold tracking-[0.3em] text-sm mb-4">ERROR {status}</p>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">{title}</h1>
                <p className="text-gray-300 text-base md:text-lg mb-10 leading-relaxed">{description}</p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-wmu-accent hover:bg-green-600 text-white px-7 py-3.5 rounded-lg font-bold transition-colors"
                    >
                        <Home size={18} /> Kembali ke Beranda
                    </Link>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white px-7 py-3.5 rounded-lg font-bold transition-colors"
                    >
                        <ArrowLeft size={18} /> Halaman Sebelumnya
                    </button>
                </div>

                {status === 404 && (
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-sm text-gray-400 mb-4">Mungkin Anda mencari:</p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
                            <Link href="/layanan" className="hover:text-wmu-accent transition-colors">Layanan</Link>
                            <Link href="/proyek" className="hover:text-wmu-accent transition-colors">Proyek</Link>
                            <Link href="/blog" className="hover:text-wmu-accent transition-colors">Blog</Link>
                            <Link href="/tentang-kami" className="hover:text-wmu-accent transition-colors">Tentang Kami</Link>
                        </div>
                    </div>
                )}

                {status >= 500 && (
                    <p className="mt-10 text-sm text-gray-400 inline-flex items-center gap-2">
                        <Phone size={14} /> Butuh bantuan segera? Hubungi kami melalui WhatsApp.
                    </p>
                )}
            </div>
        </div>
    );
}
