import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Building2, PhoneCall, Target, Save, CheckCircle2, Share2, ShieldCheck, Download, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ pengaturan }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        nama_pt: pengaturan.nama_pt || '',
        alamat: pengaturan.alamat || '',
        telepon: pengaturan.telepon || '',
        email: pengaturan.email || '',
        wa_number: pengaturan.wa_number || '',
        wa_message: pengaturan.wa_message || '',
        visi: pengaturan.visi || '',
        misi: pengaturan.misi || '',
        instagram: pengaturan.instagram || '',
        facebook: pengaturan.facebook || '',
        linkedin: pengaturan.linkedin || '',
        youtube: pengaturan.youtube || '',
        twitter: pengaturan.twitter || '',
        nib: pengaturan.nib || '',
        npwp: pengaturan.npwp || '',
        akta: pengaturan.akta || '',
        nib_file: null,
        npwp_file: null,
        akta_file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.pengaturan.update'), {
            forceFormData: true,
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <AdminLayout header="Pengaturan Global">
            <Head title="Pengaturan Global" />

            {flash?.success && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 bg-green-50/80 backdrop-blur-md border border-green-200 text-green-700 px-5 py-4 rounded-2xl shadow-sm"
                >
                    <CheckCircle2 className="text-green-500" size={20} />
                    <span className="font-semibold">{flash.success}</span>
                </motion.div>
            )}

            <form onSubmit={submit} className="relative pb-24">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Section 1: Profil Perusahaan */}
                    <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                                <Building2 size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Profil Utama</h3>
                                <p className="text-sm text-gray-500 font-medium">Informasi dasar tentang perusahaan Anda</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Perusahaan (PT)</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.nama_pt}
                                        onChange={e => setData('nama_pt', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Lengkap</label>
                                    <textarea
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        rows="3"
                                        value={data.alamat}
                                        onChange={e => setData('alamat', e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 2: Kontak & Media */}
                    <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
                            <div className="p-2.5 bg-wmu-accent/10 text-wmu-accent rounded-xl group-hover:scale-110 group-hover:bg-wmu-accent/20 transition-all duration-300">
                                <PhoneCall size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Kontak & Komunikasi</h3>
                                <p className="text-sm text-gray-500 font-medium">Saluran bagi klien untuk menghubungi Anda</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Utama</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Telepon Kantor</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.telepon}
                                        onChange={e => setData('telepon', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp (628...)</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-green-500 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.wa_number}
                                        onChange={e => setData('wa_number', e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Pesan Template WhatsApp</label>
                                    <p className="text-xs text-gray-500 mb-3 font-medium">Pesan awal otomatis saat kustomer mengklik tombol WA di website.</p>
                                    <textarea
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-green-500 focus:ring-green-500 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        rows="2"
                                        value={data.wa_message}
                                        onChange={e => setData('wa_message', e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 3: Visi Misi */}
                    <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
                            <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                                <Target size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Visi & Misi</h3>
                                <p className="text-sm text-gray-500 font-medium">Tujuan dan komitmen jangka panjang perusahaan</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Visi Perusahaan</label>
                                <textarea
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                    rows="3"
                                    value={data.visi}
                                    onChange={e => setData('visi', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Misi Perusahaan</label>
                                <p className="text-xs text-gray-500 mb-3 font-medium">Pisahkan setiap poin misi dengan baris baru (Enter).</p>
                                <textarea
                                    className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                    rows="5"
                                    value={data.misi}
                                    onChange={e => setData('misi', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 4: Social Media */}
                    <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
                            <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
                                <Share2 size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Media Sosial</h3>
                                <p className="text-sm text-gray-500 font-medium">Tautan profil media sosial perusahaan</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Instagram URL</label>
                                    <input
                                        type="url"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.instagram}
                                        onChange={e => setData('instagram', e.target.value)}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Facebook URL</label>
                                    <input
                                        type="url"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-blue-600 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.facebook}
                                        onChange={e => setData('facebook', e.target.value)}
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn URL</label>
                                    <input
                                        type="url"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-700 focus:ring-blue-700 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.linkedin}
                                        onChange={e => setData('linkedin', e.target.value)}
                                        placeholder="https://linkedin.com/company/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">YouTube URL</label>
                                    <input
                                        type="url"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-red-600 focus:ring-red-600 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.youtube}
                                        onChange={e => setData('youtube', e.target.value)}
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Twitter / X URL</label>
                                    <input
                                        type="url"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-800 focus:ring-gray-800 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                        value={data.twitter}
                                        onChange={e => setData('twitter', e.target.value)}
                                        placeholder="https://twitter.com/..."
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 5: Legalitas Perusahaan */}
                    <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-5 border-b border-gray-100 flex items-center gap-4">
                            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                                <ShieldCheck size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Legalitas & Dokumen</h3>
                                <p className="text-sm text-gray-500 font-medium">Nomor izin dan dokumen legal perusahaan</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* NIB */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor NIB</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                            value={data.nib}
                                            onChange={e => setData('nib', e.target.value)}
                                            placeholder="Masukkan nomor NIB..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">File Dokumen NIB (PDF/Image)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                            onChange={e => setData('nib_file', e.target.files[0])}
                                        />
                                        {pengaturan.nib_file && (
                                            <a href={`/storage/${pengaturan.nib_file}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                                                <LinkIcon size={14} /> Lihat File Tersimpan
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* NPWP */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor NPWP</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                            value={data.npwp}
                                            onChange={e => setData('npwp', e.target.value)}
                                            placeholder="Masukkan nomor NPWP..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">File Dokumen NPWP (PDF/Image)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                            onChange={e => setData('npwp_file', e.target.files[0])}
                                        />
                                        {pengaturan.npwp_file && (
                                            <a href={`/storage/${pengaturan.npwp_file}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                                                <LinkIcon size={14} /> Lihat File Tersimpan
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* AKTA */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nomor/Info AKTA</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-300 sm:text-sm px-4 py-3 shadow-sm hover:border-gray-300"
                                            value={data.akta}
                                            onChange={e => setData('akta', e.target.value)}
                                            placeholder="Masukkan info AKTA..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">File Dokumen AKTA (PDF/Image)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                            onChange={e => setData('akta_file', e.target.files[0])}
                                        />
                                        {pengaturan.akta_file && (
                                            <a href={`/storage/${pengaturan.akta_file}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                                                <LinkIcon size={14} /> Lihat File Tersimpan
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Sticky Footer Action Bar */}
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    className="fixed bottom-0 left-0 md:left-[280px] right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-gray-200/60 p-4 sm:px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex justify-end"
                >
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-wmu-dark py-3 px-8 text-sm font-bold text-white shadow-lg hover:bg-gray-800 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-75 disabled:hover:translate-y-0"
                    >
                        <Save size={18} className={processing ? 'animate-pulse' : ''} />
                        {processing ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
                    </button>
                </motion.div>
            </form>
        </AdminLayout>
    );
}
