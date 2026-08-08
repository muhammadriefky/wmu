import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import { 
    Plus, Trash2, X, Filter, LayoutGrid, List, MoreVertical, 
    Edit, Image as ImageIcon, Eye, Calendar, ShieldCheck, 
    CheckCircle2, Bookmark, CheckCircle, Search, ChevronDown, 
    Lightbulb, User
} from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function Index({ layanan, proyek, stats, filters }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    
    // Filtering states
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [kategoriFilter, setKategoriFilter] = useState(filters?.kategori || 'Semua Kategori');
    const [sortFilter, setSortFilter] = useState(filters?.sort || 'Terbaru');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        judul_layanan: '',
        slug: '',
        deskripsi: '',
        gambar: null,
        keunggulan_layanan: [],
        proyek_terkait: [],
        cta_text: '',
        cta_link: '',
        kategori: '',
        status: 'Published',
        is_unggulan: false,
    });

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== filters?.search || kategoriFilter !== filters?.kategori || sortFilter !== filters?.sort) {
                router.get(route('admin.layanan.index'), {
                    search: searchTerm,
                    kategori: kategoriFilter,
                    sort: sortFilter
                }, { preserveState: true, preserveScroll: true, replace: true });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, kategoriFilter, sortFilter]);

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_layanan);
            setData({
                judul_layanan: item.judul_layanan || '',
                slug: item.slug || '',
                deskripsi: item.deskripsi || '',
                gambar: null,
                keunggulan_layanan: item.keunggulan_layanan || [],
                proyek_terkait: item.proyek_terkait || [],
                cta_text: item.cta_text || '',
                cta_link: item.cta_link || '',
                kategori: item.kategori || '',
                status: item.status || 'Published',
                is_unggulan: item.is_unggulan ? true : false,
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            reset();
            setData('keunggulan_layanan', []);
            setData('proyek_terkait', []);
            setData('status', 'Published');
            setData('is_unggulan', false);
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
            if (typeof updateData.gambar === 'string') {
                delete updateData.gambar;
            }
            router.post(route('admin.layanan.update', editId), updateData, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.layanan.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('admin.layanan.destroy', id), {
                preserveScroll: true
            });
        }
    };

    // Keunggulan logic
    const addKeunggulan = () => setData('keunggulan_layanan', [...(data.keunggulan_layanan || []), '']);
    const updateKeunggulan = (index, value) => {
        const newKeunggulan = [...(data.keunggulan_layanan || [])];
        newKeunggulan[index] = value;
        setData('keunggulan_layanan', newKeunggulan);
    };
    const removeKeunggulan = (index) => {
        const newKeunggulan = [...(data.keunggulan_layanan || [])];
        newKeunggulan.splice(index, 1);
        setData('keunggulan_layanan', newKeunggulan);
    };

    const toggleProyek = (id) => {
        const currentProyek = [...(data.proyek_terkait || [])];
        if (currentProyek.includes(id)) {
            setData('proyek_terkait', currentProyek.filter(pid => pid !== id));
        } else {
            setData('proyek_terkait', [...currentProyek, id]);
        }
    };

    const kategoriOptions = ['Interior', 'Renovasi', 'Desain', 'Konstruksi', 'Manajemen'];

    const getKategoriColor = (kategori) => {
        switch(kategori) {
            case 'Interior': return 'text-purple-700 bg-purple-50 border-purple-200';
            case 'Renovasi': return 'text-blue-700 bg-blue-50 border-blue-200';
            case 'Desain': return 'text-orange-700 bg-orange-50 border-orange-200';
            case 'Konstruksi': return 'text-teal-700 bg-teal-50 border-teal-200';
            case 'Manajemen': return 'text-indigo-700 bg-indigo-50 border-indigo-200';
            default: return 'text-gray-700 bg-gray-50 border-gray-200';
        }
    };

    return (
        <AdminLayout header="Manajemen Layanan">
            <Head title="Manajemen Layanan" />

            {flash?.success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl relative shadow-sm">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            {/* Header Area */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manajemen Layanan</h2>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <span>Dashboard</span>
                        <span className="text-gray-300">&gt;</span>
                        <span className="text-gray-700 font-medium">Layanan Kami</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 font-bold transition-colors shadow-sm text-sm">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-wmu-dark text-white px-4 py-2 rounded-xl shadow-sm hover:bg-gray-800 transition-colors font-bold text-sm"
                    >
                        <Plus size={16} />
                        Tambah Layanan
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-gray-200 transition-colors">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <List size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Layanan</p>
                        <h4 className="text-2xl font-bold text-gray-800">{stats?.total || 0}</h4>
                        <p className="text-xs text-gray-400 mt-1">Semua layanan</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-gray-200 transition-colors">
                    <div className="p-3 bg-green-50 text-green-500 rounded-xl">
                        <CheckCircle size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Layanan Aktif</p>
                        <h4 className="text-2xl font-bold text-gray-800">{stats?.aktif || 0}</h4>
                        <p className="text-xs text-gray-400 mt-1">{(stats?.total > 0 ? Math.round((stats.aktif / stats.total) * 100) : 0)}% dari total</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-gray-200 transition-colors">
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-xl">
                        <Bookmark size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Layanan Unggulan</p>
                        <h4 className="text-2xl font-bold text-gray-800">{stats?.unggulan || 0}</h4>
                        <p className="text-xs text-gray-400 mt-1">Ditampilkan di homepage</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-gray-200 transition-colors">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                        <Eye size={22} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Dilihat</p>
                        <h4 className="text-2xl font-bold text-gray-800">{(stats?.views || 0).toLocaleString('id-ID')}</h4>
                        <p className="text-xs text-gray-400 mt-1">Semua layanan</p>
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
                        <div className="relative">
                            <select 
                                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:ring-wmu-accent focus:border-wmu-accent transition-colors"
                                value={kategoriFilter}
                                onChange={e => setKategoriFilter(e.target.value)}
                            >
                                <option value="Semua Kategori">Semua Kategori</option>
                                {kategoriOptions.map(kat => <option key={kat} value={kat}>{kat}</option>)}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Cari layanan berdasarkan judul atau slug..."
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
                        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                            <button className="p-2 bg-wmu-dark text-white rounded-lg shadow-sm">
                                <List size={16} />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                                <LayoutGrid size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-5 text-left w-10">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-wmu-dark focus:ring-wmu-dark" />
                                </th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">LAYANAN</th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">KATEGORI</th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">DESKRIPSI SINGKAT</th>
                                <th className="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">GAMBAR</th>
                                <th className="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">DIBUAT</th>
                                <th className="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {layanan.data && layanan.data.length > 0 ? (
                                layanan.data.map((item) => (
                                    <tr className="hover:bg-gray-50/80 transition-colors group" key={item.id_layanan}>
                                        <td className="px-6 py-5">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-wmu-dark focus:ring-wmu-dark" />
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-20 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                                                    {item.gambar ? (
                                                        <img src={`/storage/${item.gambar}`} alt={item.judul_layanan} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="text-gray-300" size={24} />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-bold text-gray-900 truncate mb-1">
                                                        {item.judul_layanan} {item.is_unggulan && <span className="text-orange-400 ml-1" title="Unggulan">★</span>}
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
                                                {item.deskripsi || <span className="text-gray-400 italic">Tidak ada deskripsi</span>}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 mx-auto w-max">
                                                <ImageIcon size={14} />
                                                <span className="text-xs font-bold">{item.gambar ? '1' : '0'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                                                item.status === 'Published' ? 'text-green-700 bg-green-50 border-green-200' : 'text-orange-700 bg-orange-50 border-orange-200'
                                            }`}>
                                                {item.status || 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-xs font-bold text-gray-800 mb-1">
                                                {new Date(item.rec_datecreated).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>
                                            <div className="text-[11px] text-gray-500 flex items-center gap-1">
                                                Admin
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => openModal(item)} className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <div className="relative group/menu">
                                                    <button className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                    <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 py-1">
                                                        <button onClick={() => deleteItem(item.id_layanan)} className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
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
                                                <List size={28} className="text-gray-400" />
                                            </div>
                                            <h3 className="text-sm font-bold text-gray-700 mb-1">Belum ada layanan</h3>
                                            <p className="text-xs text-gray-500 mb-4">Tambahkan layanan pertama Anda untuk ditampilkan di website.</p>
                                            <button onClick={() => openModal()} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-colors font-bold text-sm">
                                                <Plus size={16} /> Tambah Layanan
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
                        Menampilkan <span className="font-bold text-gray-700">{layanan.from || 0} - {layanan.to || 0}</span> dari <span className="font-bold text-gray-700">{layanan.total || 0}</span> layanan
                    </p>
                    <Pagination links={layanan.links} />
                </div>
            </div>

            {/* Tips Card */}
            <div className="bg-[#FFFBF2] border border-[#FDEBCA] rounded-2xl p-6 flex items-start sm:items-center gap-5 shadow-sm">
                <div className="p-3 bg-[#FDF2DF] text-orange-500 rounded-xl shrink-0">
                    <Lightbulb size={24} />
                </div>
                <div className="flex-1">
                    <h5 className="font-bold text-gray-800 text-sm mb-1">Tips</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Layanan yang diaktifkan akan ditampilkan di halaman layanan website. <br className="hidden sm:block"/>
                        Pastikan deskripsi singkat menarik dan gambar berkualitas tinggi.
                    </p>
                </div>
                <div className="shrink-0 mt-3 sm:mt-0">
                    <button className="px-5 py-2.5 border border-[#FDEBCA] bg-white rounded-xl text-xs font-bold text-orange-600 shadow-sm hover:bg-orange-50 transition-colors">
                        Kelola Halaman Layanan
                    </button>
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
                        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit Layanan' : 'Tambah Layanan'}</h3>
                            <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} /></button>
                        </div>
                        
                        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                            <form id="layananForm" onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Layanan <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                            value={data.judul_layanan}
                                            onChange={e => setData('judul_layanan', e.target.value)}
                                            required
                                        />
                                        {errors.judul_layanan && <p className="text-red-500 text-xs mt-1.5">{errors.judul_layanan}</p>}
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
                                        <select
                                            className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                            value={data.kategori}
                                            onChange={e => setData('kategori', e.target.value)}
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {kategoriOptions.map(kat => <option key={kat} value={kat}>{kat}</option>)}
                                        </select>
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
                                    <div className="flex items-center pt-7">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input 
                                                    type="checkbox"
                                                    className="peer appearance-none w-6 h-6 border-2 border-gray-200 rounded-lg checked:bg-wmu-dark checked:border-wmu-dark transition-all cursor-pointer"
                                                    checked={data.is_unggulan}
                                                    onChange={e => setData('is_unggulan', e.target.checked)}
                                                />
                                                <CheckCircle2 size={16} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Jadikan Unggulan</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Gambar Utama</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-wmu-dark hover:file:bg-gray-200 transition-colors cursor-pointer"
                                        onChange={e => setData('gambar', e.target.files[0])}
                                    />
                                    {errors.gambar && <p className="text-red-500 text-xs mt-1.5">{errors.gambar}</p>}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Singkat</label>
                                    <textarea
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-dark focus:ring-wmu-dark transition-all duration-200 sm:text-sm font-medium text-gray-700"
                                        value={data.deskripsi}
                                        onChange={e => setData('deskripsi', e.target.value)}
                                        rows="3"
                                        placeholder="Tuliskan deskripsi umum tentang layanan ini..."
                                    />
                                    {errors.deskripsi && <p className="text-red-500 text-xs mt-1.5">{errors.deskripsi}</p>}
                                </div>

                                {/* Keunggulan Layanan Section */}
                                <div className="mb-6 p-5 border border-gray-200 rounded-2xl bg-gray-50/50">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="block text-sm font-bold text-gray-700">Keunggulan Kami</label>
                                        <button 
                                            type="button" 
                                            onClick={addKeunggulan}
                                            className="flex items-center text-xs font-bold px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:text-wmu-dark hover:border-gray-300 shadow-sm transition-all"
                                        >
                                            <Plus size={14} className="mr-1" /> Tambah
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {data.keunggulan_layanan && data.keunggulan_layanan.map((keunggulan, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                                    <ShieldCheck size={16} />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="block w-full rounded-xl border-gray-200 bg-white focus:border-wmu-dark focus:ring-wmu-dark sm:text-sm font-medium text-gray-700 shadow-sm"
                                                    value={keunggulan}
                                                    onChange={e => updateKeunggulan(index, e.target.value)}
                                                    placeholder="Contoh: Tenaga Ahli Bersertifikat"
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => removeKeunggulan(index)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                        {(!data.keunggulan_layanan || data.keunggulan_layanan.length === 0) && (
                                            <p className="text-sm text-gray-400 italic text-center py-5 bg-white rounded-xl border border-dashed border-gray-200">Belum ada daftar keunggulan.</p>
                                        )}
                                    </div>
                                    {errors.keunggulan_layanan && <p className="text-red-500 text-xs mt-1.5">{errors.keunggulan_layanan}</p>}
                                </div>

                                {/* Proyek Terkait Section */}
                                <div className="mb-2 p-5 border border-gray-200 rounded-2xl bg-gray-50/50">
                                    <label className="block text-sm font-bold text-gray-700 mb-4">Tautkan Proyek</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto custom-scrollbar p-1">
                                        {proyek && proyek.length > 0 ? (
                                            proyek.map((p) => {
                                                const isSelected = (data.proyek_terkait || []).includes(p.prk_id);
                                                return (
                                                    <label 
                                                        key={p.prk_id} 
                                                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-wmu-dark bg-gray-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                                    >
                                                        <div className="flex items-center h-5 mt-0.5">
                                                            <div className="relative flex items-center justify-center">
                                                                <input 
                                                                    type="checkbox"
                                                                    className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded checked:bg-wmu-dark checked:border-wmu-dark transition-all cursor-pointer"
                                                                    checked={isSelected}
                                                                    onChange={() => toggleProyek(p.prk_id)}
                                                                />
                                                                <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className={`text-sm font-bold truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{p.prk_judul}</p>
                                                            <p className="text-[11px] text-gray-500 truncate mt-0.5"><span className="font-medium">Klien:</span> {p.prk_klien || '-'}</p>
                                                        </div>
                                                    </label>
                                                );
                                            })
                                        ) : (
                                            <p className="text-sm text-gray-400 italic text-center py-5 col-span-full">Belum ada data proyek.</p>
                                        )}
                                    </div>
                                    {errors.proyek_terkait && <p className="text-red-500 text-xs mt-1.5">{errors.proyek_terkait}</p>}
                                </div>
                            </form>
                        </div>
                        
                        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
                            <button type="button" onClick={closeModal} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm">Batal</button>
                            <button form="layananForm" type="submit" disabled={processing} className="px-5 py-2.5 bg-wmu-dark text-white font-bold rounded-xl hover:bg-gray-800 shadow-sm disabled:opacity-50 transition-all flex items-center gap-2">
                                {processing ? 'Menyimpan...' : 'Simpan Layanan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx global>{`
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