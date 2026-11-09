import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { 
    Plus, Trash2, X, Filter, LayoutGrid, List, MoreVertical, 
    Edit, Calendar, Search, ChevronDown, Lightbulb, FileText, Image as ImageIcon
} from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function Index({ blog, stats, filters }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    
    // Filtering states
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [sortFilter, setSortFilter] = useState(filters?.sort || 'Terbaru');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        judul_blog: '',
        slug: '',
        meta_deskripsi: '',
        isi_konten: '',
        tanggal_terbit: '',
        gambar: null,
        kategori: '',
        status: 'Published',
    });

    const kategoriOptions = ['Berita', 'Edukasi', 'Pengumuman', 'Inspirasi', 'Tips'];

    const getKategoriColor = (kategori) => {
        switch(kategori) {
            case 'Berita': return 'text-purple-700 bg-purple-50 border-purple-200';
            case 'Edukasi': return 'text-blue-700 bg-blue-50 border-blue-200';
            case 'Pengumuman': return 'text-orange-700 bg-orange-50 border-orange-200';
            case 'Inspirasi': return 'text-teal-700 bg-teal-50 border-teal-200';
            case 'Tips': return 'text-green-700 bg-green-50 border-green-200';
            default: return 'text-gray-700 bg-gray-50 border-gray-200';
        }
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters?.search || '') || sortFilter !== (filters?.sort || 'Terbaru')) {
                router.get(route('admin.blog.index'), {
                    search: searchTerm,
                    sort: sortFilter
                }, { preserveState: true, preserveScroll: true, replace: true });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, sortFilter]);

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_blog);
            
            // Format datetime-local requires YYYY-MM-DDThh:mm format
            let formattedDate = item.tanggal_terbit || '';
            if (formattedDate && !formattedDate.includes('T')) {
                // If it's just a date or space-separated datetime
                formattedDate = formattedDate.replace(' ', 'T').substring(0, 16);
            }

            setData({
                judul_blog: item.judul_blog || '',
                slug: item.slug || '',
                meta_deskripsi: item.meta_deskripsi || '',
                isi_konten: item.isi_konten || '',
                tanggal_terbit: formattedDate,
                gambar: null,
                kategori: item.kategori || '',
                status: item.status || 'Published',
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            reset();
            setData('status', 'Published');
            setData('kategori', '');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            let updateData = { ...data, _method: 'put' };
            if (typeof updateData.gambar === 'string' || !updateData.gambar) {
                delete updateData.gambar;
            }
            router.post(route('admin.blog.update', editId), updateData, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.blog.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('admin.blog.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout header="Manajemen Blog">
            <Head title="Manajemen Blog" />

            {flash?.success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl relative shadow-sm">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            {/* Header Area */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manajemen Blog</h2>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <span>Dashboard</span>
                        <span className="text-gray-300">&gt;</span>
                        <span className="text-gray-700 font-medium">Blog</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-wmu-dark text-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-800 transition-colors font-bold text-sm"
                    >
                        <Plus size={16} />
                        Tambah Blog
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-gray-200 transition-colors">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <FileText size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Blog</p>
                        <h4 className="text-2xl font-bold text-gray-800">{stats?.total || 0}</h4>
                        <p className="text-xs text-gray-400 mt-1">Semua artikel blog</p>
                    </div>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-gray-200 transition-colors">
                    <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                        <Calendar size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Terbaru Dibuat</p>
                        <h4 className="text-2xl font-bold text-gray-800">{stats?.baru || 0}</h4>
                        <p className="text-xs text-gray-400 mt-1">Dalam 30 hari terakhir</p>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-6">
                
                {/* Toolbar */}
                <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
                    <div className="flex w-full md:w-auto gap-3">
                        <div className="relative w-full md:w-80">
                            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Cari blog berdasarkan judul atau slug..."
                                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl text-sm focus:ring-wmu-accent focus:border-wmu-accent transition-colors"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                        <div className="relative">
                            <select 
                                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:ring-wmu-accent focus:border-wmu-accent transition-colors"
                                value={sortFilter}
                                onChange={e => setSortFilter(e.target.value)}
                            >
                                <option value="Terbaru">Terbaru</option>
                                <option value="Terlama">Terlama</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">JUDUL BLOG</th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">KATEGORI</th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">META DESKRIPSI</th>
                                <th className="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {blog.data && blog.data.length > 0 ? (
                                blog.data.map((item) => (
                                    <tr className="hover:bg-gray-50/80 transition-colors group" key={item.id_blog}>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-20 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                                                    {item.gambar ? (
                                                        <img src={`/storage/${item.gambar}`} alt={item.judul_blog} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="text-gray-300" size={24} />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-bold text-gray-900 truncate mb-1">
                                                        {item.judul_blog}
                                                    </div>
                                                    <div className="text-[13px] text-gray-500 truncate">{item.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {item.kategori ? (
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getKategoriColor(item.kategori)}`}>
                                                    {item.kategori}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 hidden lg:table-cell w-[350px]">
                                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed pr-4">
                                                {item.meta_deskripsi || <span className="text-gray-400 italic">Tidak ada meta deskripsi</span>}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                                                item.status === 'Published' ? 'text-green-700 bg-green-50 border-green-200' : 'text-orange-700 bg-orange-50 border-orange-200'
                                            }`}>
                                                {item.status || 'Draft'}
                                            </span>
                                            <div className="text-[11px] text-gray-500 mt-2 font-medium">
                                                {item.tanggal_terbit ? new Date(item.tanggal_terbit).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center gap-2">
                                                <button type="button" aria-label="Edit" title="Edit" onClick={() => openModal(item)} className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <div className="relative group/menu">
                                                    <button className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-32 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible group-focus-within/menu:opacity-100 group-focus-within/menu:visible transition-all z-10 py-1">
                                                        <button onClick={() => deleteItem(item.id_blog)} className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                            <Trash2 size={14} /> Hapus
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="100%" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                <FileText size={28} className="text-gray-400" />
                                            </div>
                                            <h3 className="text-sm font-bold text-gray-700 mb-1">Belum ada blog</h3>
                                            <p className="text-xs text-gray-500 mb-4">Tambahkan blog pertama Anda untuk ditampilkan di website.</p>
                                            <button onClick={() => openModal()} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-colors font-bold text-sm">
                                                <Plus size={16} /> Tambah Blog
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
                    <p className="text-xs font-medium text-gray-500">
                        Menampilkan <span className="font-bold text-gray-700">{blog.from || 0} - {blog.to || 0}</span> dari <span className="font-bold text-gray-700">{blog.total || 0}</span> blog
                    </p>
                    {blog.links && <Pagination links={blog.links} />}
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 shrink-0">
                            <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit Blog' : 'Tambah Blog'}</h3>
                            <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} /></button>
                        </div>
                        
                        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar min-h-0">
                            <form id="blogForm" onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Blog <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                            value={data.judul_blog}
                                            onChange={e => setData('judul_blog', e.target.value)}
                                            required
                                        />
                                        {errors.judul_blog && <p className="text-red-500 text-xs mt-1.5">{errors.judul_blog}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                            value={data.slug}
                                            onChange={e => setData('slug', e.target.value)}
                                            required
                                        />
                                        {errors.slug && <p className="text-red-500 text-xs mt-1.5">{errors.slug}</p>}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori</label>
                                        <input
                                            type="text"
                                            list="blog-kategori-list"
                                            placeholder="Pilih atau ketik kategori..."
                                            className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                            value={data.kategori}
                                            onChange={e => setData('kategori', e.target.value)}
                                        />
                                        <datalist id="blog-kategori-list">
                                            {kategoriOptions.map(kat => <option key={kat} value={kat}>{kat}</option>)}
                                        </datalist>
                                        {errors.kategori && <p className="text-red-500 text-xs mt-1.5">{errors.kategori}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Status</label>
                                        <select
                                            className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                        >
                                            <option value="Published">Published</option>
                                            <option value="Draft">Draft</option>
                                        </select>
                                        {errors.status && <p className="text-red-500 text-xs mt-1.5">{errors.status}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Tanggal Terbit <span className="text-red-500">*</span></label>
                                        <input
                                            type="datetime-local"
                                            className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                            value={data.tanggal_terbit}
                                            onChange={e => setData('tanggal_terbit', e.target.value)}
                                            required
                                        />
                                        {errors.tanggal_terbit && <p className="text-red-500 text-xs mt-1.5">{errors.tanggal_terbit}</p>}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Gambar / Thumbnail</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-wmu-dark hover:file:bg-gray-200 transition-colors cursor-pointer"
                                        onChange={e => setData('gambar', e.target.files[0])}
                                    />
                                    {errors.gambar && <p className="text-red-500 text-xs mt-1.5">{errors.gambar}</p>}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Meta Deskripsi</label>
                                    <textarea
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                        value={data.meta_deskripsi}
                                        onChange={e => setData('meta_deskripsi', e.target.value)}
                                        rows="2"
                                        placeholder="Deskripsi singkat untuk SEO..."
                                    />
                                    {errors.meta_deskripsi && <p className="text-red-500 text-xs mt-1.5">{errors.meta_deskripsi}</p>}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Isi Konten</label>
                                    <textarea
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                        value={data.isi_konten}
                                        onChange={e => setData('isi_konten', e.target.value)}
                                        rows="8"
                                        placeholder="Tuliskan isi blog Anda di sini..."
                                    />
                                    {errors.isi_konten && <p className="text-red-500 text-xs mt-1.5">{errors.isi_konten}</p>}
                                </div>
                            </form>
                        </div>
                        
                        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] shrink-0">
                            <button type="button" onClick={closeModal} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">Batal</button>
                            <button form="blogForm" type="submit" disabled={processing} className="px-5 py-2.5 bg-wmu-dark text-white font-bold rounded-xl hover:bg-gray-800 shadow-sm disabled:opacity-50 transition-all flex items-center gap-2">
                                {processing ? 'Menyimpan...' : 'Simpan Blog'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #E2E8F0;
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #CBD5E1;
                }
            `}</style>
        </AdminLayout>
    );
}