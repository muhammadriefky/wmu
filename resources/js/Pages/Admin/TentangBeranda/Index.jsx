import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

export default function Index({ tentang }) {
    const { data, setData, post, processing, errors } = useForm({
        judul: tentang?.judul || '',
        deskripsi: tentang?.deskripsi || '',
        angka_pengalaman: tentang?.angka_pengalaman || '',
        teks_pengalaman: tentang?.teks_pengalaman || '',
        teks_komitmen: tentang?.teks_komitmen || '',
        video_file: null,
        video_poster: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.tentang-beranda.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Tentang Kami (Beranda)" />
            
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manajemen Tentang Kami (Beranda)</h2>
                <p className="text-sm text-gray-500 mt-1">Kelola konten teks dan video pada bagian Tentang Kami di halaman Beranda</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Teks Konten Utama */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Konten Teks Utama</h3>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-wmu-accent focus:ring-wmu-accent/20"
                                value={data.judul}
                                onChange={e => setData('judul', e.target.value)}
                                placeholder="Contoh: Solusi Konstruksi Terpercaya..."
                                required
                            />
                            {errors.judul && <p className="text-red-500 text-xs mt-1.5">{errors.judul}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Singkat <span className="text-red-500">*</span></label>
                            <textarea
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-wmu-accent focus:ring-wmu-accent/20 h-32 resize-none"
                                value={data.deskripsi}
                                onChange={e => setData('deskripsi', e.target.value)}
                                placeholder="Tuliskan deskripsi singkat perusahaan..."
                                required
                            />
                            {errors.deskripsi && <p className="text-red-500 text-xs mt-1.5">{errors.deskripsi}</p>}
                        </div>
                    </div>

                    {/* Teks Badge Pengalaman */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Badge Pengalaman (Kotak Hitam)</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Angka Pengalaman <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-wmu-accent focus:ring-wmu-accent/20"
                                    value={data.angka_pengalaman}
                                    onChange={e => setData('angka_pengalaman', e.target.value)}
                                    placeholder="Contoh: 10+"
                                    required
                                />
                                {errors.angka_pengalaman && <p className="text-red-500 text-xs mt-1.5">{errors.angka_pengalaman}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Teks Pengalaman <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="w-full border-gray-300 rounded-xl shadow-sm focus:border-wmu-accent focus:ring-wmu-accent/20"
                                    value={data.teks_pengalaman}
                                    onChange={e => setData('teks_pengalaman', e.target.value)}
                                    placeholder="Contoh: Tahun Pengalaman"
                                    required
                                />
                                {errors.teks_pengalaman && <p className="text-red-500 text-xs mt-1.5">{errors.teks_pengalaman}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Teks Komitmen <span className="text-red-500">*</span></label>
                            <textarea
                                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-wmu-accent focus:ring-wmu-accent/20 h-24 resize-none"
                                value={data.teks_komitmen}
                                onChange={e => setData('teks_komitmen', e.target.value)}
                                placeholder="Contoh: Kami berkomitmen memberikan hasil terbaik..."
                                required
                            />
                            {errors.teks_komitmen && <p className="text-red-500 text-xs mt-1.5">{errors.teks_komitmen}</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-10 mb-8 border-t pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Poster */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6">Poster Video (Thumbnail)</h3>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Ganti Gambar Poster</label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                                {tentang?.video_poster ? (
                                    <img src={`/storage/${tentang.video_poster}`} className="w-full h-full object-cover" alt="Poster" />
                                ) : (
                                    <ImageIcon className="text-gray-400" size={24} />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                                onChange={e => setData('video_poster', e.target.files[0])}
                            />
                        </div>
                        {errors.video_poster && <p className="text-red-500 text-xs mt-1.5">{errors.video_poster}</p>}
                        <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG, WEBP. Ukuran maks: 5MB.</p>
                    </div>

                    {/* Upload Video */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6">File Video Utama</h3>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Ganti File Video</label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                                <VideoIcon className={tentang?.video_file ? "text-wmu-accent" : "text-gray-400"} size={24} />
                            </div>
                            <input
                                type="file"
                                accept="video/mp4,video/avi,video/quicktime,video/webm"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                                onChange={e => setData('video_file', e.target.files[0])}
                            />
                        </div>
                        {errors.video_file && <p className="text-red-500 text-xs mt-1.5">{errors.video_file}</p>}
                        <p className="text-xs text-gray-500 mt-2">Format: MP4, AVI, WEBM. Ukuran maks: 50MB.</p>
                        {tentang?.video_file && (
                            <p className="text-xs text-green-600 mt-1 font-medium">Video saat ini sudah terisi.</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end border-t pt-6">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="bg-wmu-dark text-white px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                        <Save size={18} strokeWidth={2.5} />
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
