import { useState, useMemo, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, Edit2, Filter, ListOrdered, PenTool, Plus, Search, Star, Trash2 } from 'lucide-react';
import DynamicLucideIcon, { SUPPORTED_ICONS, SUPPORTED_ICON_NAMES } from '@/Components/DynamicLucideIcon';

// Alias agar pemakaian <LucideIcons.X /> yang sudah ada tetap berjalan
const LucideIcons = { AlertCircle, CheckCircle2, Edit2, Filter, ListOrdered, PenTool, Plus, Search, Star, Trash2 };

export default function Index({ keunggulan, stats }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    
    // Filters and pagination state (client-side for now since all data is passed)
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Based on mockup

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        judul: '',
        deskripsi: '',
        ikon: '',
        urutan: 0,
        status_aktif: true,
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_keunggulan);
            setData({
                judul: item.judul || '',
                deskripsi: item.deskripsi || '',
                ikon: item.ikon || '',
                urutan: item.urutan ?? 0,
                status_aktif: item.status_aktif == 1,
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            reset();
            // set default urutan
            setData('urutan', keunggulan && keunggulan.length > 0 ? Math.max(...keunggulan.map(k => k.urutan)) + 1 : 1);
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
            router.post(route('admin.keunggulan.update', editId), {
                _method: 'put',
                judul: data.judul,
                deskripsi: data.deskripsi,
                ikon: data.ikon,
                urutan: data.urutan,
                status_aktif: data.status_aktif ? 1 : 0,
            }, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.keunggulan.store'), {
                preserveScroll: true,
                onSuccess: (page) => {
                    closeModal();
                    // Item baru memiliki urutan terbesar -> tampil di halaman terakhir.
                    // Pindah ke sana agar admin langsung melihat hasil simpannya.
                    const total = page.props.keunggulan?.length ?? 0;
                    setCurrentPage(Math.max(1, Math.ceil(total / itemsPerPage)));
                },
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus keunggulan ini?')) {
            router.delete(route('admin.keunggulan.destroy', id), {
                preserveScroll: true
            });
        }
    };

    // Filter logic
    const filteredKeunggulan = useMemo(() => {
        if (!keunggulan) return [];
        return keunggulan.filter(item => {
            const matchSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                (item.deskripsi && item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchStatus = statusFilter === 'all' 
                ? true 
                : statusFilter === 'aktif' ? item.status_aktif == 1 : item.status_aktif == 0;
            
            return matchSearch && matchStatus;
        });
    }, [keunggulan, searchTerm, statusFilter]);

    // Pagination logic
    const totalPages = Math.ceil(filteredKeunggulan.length / itemsPerPage);

    // Setelah hapus item terakhir di halaman terakhir, jangan tinggal di halaman kosong
    useEffect(() => {
        if (currentPage > 1 && currentPage > totalPages) {
            setCurrentPage(Math.max(1, totalPages));
        }
    }, [currentPage, totalPages]);
    const paginatedKeunggulan = filteredKeunggulan.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    // Render ikon dengan set yang sama seperti website publik,
    // sehingga preview admin = tampilan di website.
    const renderIcon = (iconName, className = "w-6 h-6") => (
        <DynamicLucideIcon name={iconName} className={className} fallback={<Star className={className} />} />
    );

    const colors = [
        'text-purple-500 bg-purple-50 border-purple-100',
        'text-green-500 bg-green-50 border-green-100',
        'text-orange-500 bg-orange-50 border-orange-100',
        'text-blue-500 bg-blue-50 border-blue-100',
        'text-indigo-500 bg-indigo-50 border-indigo-100'
    ];

    return (
        <AdminLayout header="Daftar Keunggulan">
            <Head title="Daftar Keunggulan" />

            {flash?.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
                    <LucideIcons.CheckCircle2 size={20} className="text-green-500" />
                    <span className="font-medium">{flash.success}</span>
                </div>
            )}

            {/* Header Title */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Daftar Keunggulan</h2>
                    <p className="text-gray-500 text-sm">Kelola keunggulan perusahaan yang ditampilkan kepada client.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                    <LucideIcons.Plus size={18} />
                    <span>Tambah Keunggulan</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Keunggulan */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                        <LucideIcons.Star size={24} className="text-purple-500" />
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Keunggulan</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stats?.total || 0}</div>
                        <div className="text-[11px] text-gray-400">Semua keunggulan</div>
                    </div>
                </div>

                {/* Aktif */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <LucideIcons.CheckCircle2 size={24} className="text-green-500" />
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Aktif</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stats?.aktif || 0}</div>
                        <div className="text-[11px] text-gray-400">Sedang ditampilkan</div>
                    </div>
                </div>

                {/* Terakhir Diperbarui */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <LucideIcons.PenTool size={20} className="text-orange-500" />
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Terakhir Diperbarui</div>
                        <div className="text-lg font-bold text-gray-900 mb-1">{stats?.terakhir_diperbarui || '-'}</div>
                        <div className="text-[11px] text-gray-400">Pembaruan terkini</div>
                    </div>
                </div>

                {/* Urutan Tertinggi */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <LucideIcons.ListOrdered size={24} className="text-blue-500" />
                    </div>
                    <div>
                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Urutan Tertinggi</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stats?.urutan_tertinggi || '-'}</div>
                        <div className="text-[11px] text-gray-400">Prioritas pertama</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
                    <div className="relative w-full sm:max-w-xs">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LucideIcons.Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari keunggulan..."
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div className="flex w-full sm:w-auto gap-3">
                        <select 
                            className="block w-full sm:w-40 py-2.5 px-3 border border-gray-200 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="all">Semua Status</option>
                            <option value="aktif">Aktif</option>
                            <option value="nonaktif">Nonaktif</option>
                        </select>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors">
                            <LucideIcons.Filter size={16} />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/30">
                            <tr>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider w-32">Ikon (Opsional)</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider w-24">Urutan</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider w-32">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {paginatedKeunggulan.length > 0 ? (
                                paginatedKeunggulan.map((item, index) => {
                                    const colorClass = colors[index % colors.length];
                                    return (
                                        <tr className={`hover:bg-gray-50/50 transition-colors ${item.status_aktif == 0 ? 'opacity-50' : ''}`} key={item.id_keunggulan}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${colorClass}`}>
                                                        {renderIcon(item.ikon, "w-5 h-5")}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-800">{item.judul}</div>
                                                        {item.status_aktif == 0 && (
                                                            <div className="text-[10px] text-orange-500 font-medium mt-0.5 flex items-center gap-1">
                                                                <LucideIcons.AlertCircle size={10} /> Nonaktif
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                                <p className="truncate">{item.deskripsi || '-'}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.ikon ? (
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-100`}>
                                                        {item.ikon}
                                                    </span>
                                                ) : (
                                                    <span className="text-[11px] text-gray-300 italic">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-medium text-gray-600">{item.urutan}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button type="button" aria-label="Edit" title="Edit" 
                                                        onClick={() => openModal(item)} 
                                                        className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <LucideIcons.Edit2 size={14} />
                                                    </button>
                                                    <button type="button" aria-label="Hapus" title="Hapus" 
                                                        onClick={() => deleteItem(item.id_keunggulan)} 
                                                        className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <LucideIcons.Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <LucideIcons.Search size={32} className="mb-3 text-gray-300" />
                                            <p className="text-sm">Tidak ada data keunggulan ditemukan.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
                    <div className="text-sm text-gray-500">
                        Menampilkan <span className="font-medium text-gray-900">{filteredKeunggulan.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> - <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, filteredKeunggulan.length)}</span> dari <span className="font-medium text-gray-900">{filteredKeunggulan.length}</span> keunggulan
                    </div>
                    
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                &lt;
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium ${
                                        currentPage === i + 1 
                                            ? 'bg-blue-600 text-white border border-blue-600' 
                                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                &gt;
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
                    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                    
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">{isEditing ? 'Edit Keunggulan' : 'Tambah Keunggulan'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                                &times;
                            </button>
                        </div>
                        
                        <form onSubmit={submit} className="p-6 max-h-[80vh] overflow-y-auto">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Pengalaman Belasan Tahun"
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all"
                                        value={data.judul}
                                        onChange={e => setData('judul', e.target.value)}
                                        required
                                    />
                                    {errors.judul && <p className="text-red-500 text-xs mt-1.5">{errors.judul}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Jelaskan secara singkat mengenai keunggulan ini..."
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all resize-none"
                                        value={data.deskripsi}
                                        onChange={e => setData('deskripsi', e.target.value)}
                                    />
                                    {errors.deskripsi && <p className="text-red-500 text-xs mt-1.5">{errors.deskripsi}</p>}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-sm font-semibold text-gray-700">Ikon <span className="text-gray-400 font-normal">(Opsional)</span></label>
                                        {data.ikon && (
                                            <button type="button" onClick={() => setData('ikon', '')} className="text-xs font-semibold text-gray-500 hover:text-red-600">
                                                Hapus pilihan
                                            </button>
                                        )}
                                    </div>
                                    <div
                                        role="radiogroup"
                                        aria-label="Pilih ikon"
                                        className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-2 rounded-xl border border-gray-200 bg-gray-50"
                                        data-lenis-prevent
                                    >
                                        {SUPPORTED_ICON_NAMES.map((name) => {
                                            const Icon = SUPPORTED_ICONS[name];
                                            const active = data.ikon === name;
                                            return (
                                                <button
                                                    key={name}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={active}
                                                    aria-label={name}
                                                    title={name}
                                                    onClick={() => setData('ikon', name)}
                                                    className={`aspect-square flex items-center justify-center rounded-lg border transition-colors ${active ? 'bg-wmu-dark text-white border-wmu-dark' : 'bg-white text-gray-600 border-gray-200 hover:border-wmu-accent hover:text-wmu-accent'}`}
                                                >
                                                    <Icon size={18} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1.5">
                                        {data.ikon
                                            ? <>Terpilih: <span className="font-semibold text-gray-700">{data.ikon}</span>{!SUPPORTED_ICONS[data.ikon] && ' (tidak didukung, website akan memakai ikon default)'}</>
                                            : 'Tanpa pilihan, website memilih ikon otomatis berdasarkan judul.'}
                                    </p>
                                    {errors.ikon && <p className="text-red-500 text-xs mt-1.5">{errors.ikon}</p>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Urutan <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all"
                                            value={data.urutan}
                                            onChange={e => setData('urutan', e.target.value)}
                                            required
                                        />
                                        {errors.urutan && <p className="text-red-500 text-xs mt-1.5">{errors.urutan}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status Aktif</label>
                                        <div className="flex items-center h-10">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only peer" 
                                                    checked={data.status_aktif}
                                                    onChange={(e) => setData('status_aktif', e.target.checked)}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    {data.status_aktif ? 'Ditampilkan' : 'Disembunyikan'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={closeModal} 
                                    className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Keunggulan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}