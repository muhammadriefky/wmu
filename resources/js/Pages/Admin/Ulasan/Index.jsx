import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { 
    Plus, Trash2, Edit, Search, ChevronDown, 
    Star, Eye, EyeOff, MessageSquare, CheckCircle2, TrendingUp,
    X, Check
} from 'lucide-react';
import Pagination from '@/Components/Pagination';

function StarRating({ rating, max = 5 }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <Star key={i} size={14}
                    className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                />
            ))}
        </div>
    );
}

export default function Index({ ulasan, stats, filters }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [sortFilter, setSortFilter] = useState(filters?.sort || 'Terbaru');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nama_pemberi: '',
        isi_ulasan: '',
        rating_bintang: 5,
        status_disetujui: 1,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters?.search || '') || sortFilter !== (filters?.sort || 'Terbaru')) {
                router.get(route('admin.ulasan.index'), {
                    search: searchTerm,
                    sort: sortFilter
                }, { preserveState: true, preserveScroll: true, replace: true });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, sortFilter]);

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_ulasan);
            setData({
                nama_pemberi: item.nama_pemberi || '',
                isi_ulasan: item.isi_ulasan || '',
                rating_bintang: item.rating_bintang || 5,
                status_disetujui: item.status_disetujui !== undefined ? item.status_disetujui : 1,
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(reset, 200);
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            router.post(route('admin.ulasan.update', editId), {
                _method: 'put',
                ...data
            }, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.ulasan.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus data ulasan ini?')) {
            router.delete(route('admin.ulasan.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Testimoni" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manajemen Testimoni</h2>
                    <p className="text-sm text-gray-500 mt-1">Kelola data ulasan dan testimoni dari klien Anda</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="bg-wmu-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-800 transition-all flex items-center gap-2"
                >
                    <Plus size={18} strokeWidth={2.5} /> Tambah Testimoni
                </button>
            </div>

            {flash?.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                    {flash.error}
                </div>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <div className="text-3xl font-extrabold text-gray-900">{stats?.total || 0}</div>
                        <div className="text-sm font-medium text-gray-500 mt-0.5">Total Ulasan</div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                        <Eye size={24} />
                    </div>
                    <div>
                        <div className="text-3xl font-extrabold text-gray-900">{stats?.tampil || 0}</div>
                        <div className="text-sm font-medium text-gray-500 mt-0.5">Ditampilkan</div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                        <EyeOff size={24} />
                    </div>
                    <div>
                        <div className="text-3xl font-extrabold text-gray-900">{stats?.disembunyikan || 0}</div>
                        <div className="text-sm font-medium text-gray-500 mt-0.5">Disembunyikan</div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center shrink-0">
                        <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                        <div className="text-3xl font-extrabold text-gray-900">{stats?.avg_rating || '0.0'}</div>
                        <div className="text-sm font-medium text-gray-500 mt-0.5">Rata-rata Rating</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters & Search */}
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari nama atau isi ulasan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-wmu-accent/20 focus:border-wmu-accent transition-all"
                        />
                    </div>
                    <div className="w-full sm:w-auto">
                        <div className="relative">
                            <select
                                value={sortFilter}
                                onChange={(e) => setSortFilter(e.target.value)}
                                className="w-full sm:w-48 appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-wmu-accent/20 focus:border-wmu-accent transition-all cursor-pointer"
                            >
                                <option value="Terbaru">Terbaru</option>
                                <option value="Terlama">Terlama</option>
                                <option value="Rating Tertinggi">Rating Tertinggi</option>
                                <option value="Rating Terendah">Rating Terendah</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Nama Pemberi</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider w-2/5">Isi Ulasan</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Rating</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {ulasan.data && ulasan.data.length > 0 ? (
                                ulasan.data.map((item) => (
                                    <tr key={item.id_ulasan} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold shadow-sm shrink-0">
                                                    {item.nama_pemberi.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="font-semibold text-gray-900 text-sm">{item.nama_pemberi}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed" title={item.isi_ulasan}>
                                                {item.isi_ulasan || '-'}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <StarRating rating={item.rating_bintang} />
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            {item.status_disetujui == 1 ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold border border-green-100">
                                                    <CheckCircle2 size={12} /> Tampil
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200">
                                                    <EyeOff size={12} /> Sembunyi
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 transition-opacity">
                                                <button type="button" aria-label="Edit" title="Edit" 
                                                    onClick={() => openModal(item)}
                                                    className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors tooltip-trigger"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button type="button" aria-label="Hapus" title="Hapus" 
                                                    onClick={() => deleteItem(item.id_ulasan)}
                                                    className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors tooltip-trigger"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-gray-500">
                                        <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                                        <p className="text-base font-medium text-gray-900 mb-1">Belum ada ulasan</p>
                                        <p className="text-sm">Ulasan dan testimoni dari klien akan muncul di sini.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {ulasan.data && ulasan.data.length > 0 && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                        <Pagination links={ulasan.links} />
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">
                                {isEditing ? 'Edit Testimoni' : 'Tambah Testimoni'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={submit} className="p-6 max-h-[calc(90vh-4rem)] overflow-y-auto">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Pemberi</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 text-sm px-4 py-2.5"
                                        value={data.nama_pemberi}
                                        onChange={e => setData('nama_pemberi', e.target.value)}
                                        placeholder="Nama klien atau instansi..."
                                        required
                                    />
                                    {errors.nama_pemberi && <p className="text-red-500 text-xs mt-1.5">{errors.nama_pemberi}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Isi Ulasan</label>
                                    <textarea
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 text-sm px-4 py-3 min-h-[100px]"
                                        value={data.isi_ulasan}
                                        onChange={e => setData('isi_ulasan', e.target.value)}
                                        placeholder="Tuliskan pengalaman atau testimoni klien..."
                                        rows="4"
                                    ></textarea>
                                    {errors.isi_ulasan && <p className="text-red-500 text-xs mt-1.5">{errors.isi_ulasan}</p>}
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Rating (1-5)</label>
                                        <div className="relative">
                                            <select
                                                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-wmu-accent/20 focus:border-wmu-accent transition-all"
                                                value={data.rating_bintang}
                                                onChange={e => setData('rating_bintang', parseInt(e.target.value))}
                                            >
                                                {[5, 4, 3, 2, 1].map(num => (
                                                    <option key={num} value={num}>{num} Bintang</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                                <ChevronDown size={16} />
                                            </div>
                                        </div>
                                        {errors.rating_bintang && <p className="text-red-500 text-xs mt-1.5">{errors.rating_bintang}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Status Tampil</label>
                                        <div className="relative">
                                            <select
                                                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-wmu-accent/20 focus:border-wmu-accent transition-all"
                                                value={data.status_disetujui}
                                                onChange={e => setData('status_disetujui', parseInt(e.target.value))}
                                            >
                                                <option value={1}>Tampilkan di Web</option>
                                                <option value={0}>Sembunyikan</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                                <ChevronDown size={16} />
                                            </div>
                                        </div>
                                        {errors.status_disetujui && <p className="text-red-500 text-xs mt-1.5">{errors.status_disetujui}</p>}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                                <button 
                                    type="button" 
                                    onClick={closeModal} 
                                    className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="px-5 py-2.5 text-sm font-bold text-white bg-wmu-dark rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70"
                                >
                                    {processing ? 'Menyimpan...' : (
                                        <>
                                            <Check size={18} /> Simpan
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
