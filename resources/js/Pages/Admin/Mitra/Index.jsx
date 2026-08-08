import { useState, useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { 
    Plus, Search, Filter, Edit2, Trash2, 
    Building2, CheckCircle2, Users, Star 
} from 'lucide-react';

export default function Index({ mitra, stats }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    
    // Filters and pagination state (client-side for now since all data is passed)
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nama_mitra: '',
        kategori: '',
        logo: null,
        urutan: 0,
        status_aktif: true,
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_mitra);
            setData({
                nama_mitra: item.nama_mitra || '',
                kategori: item.kategori || '',
                logo: null,
                urutan: item.urutan || '',
                status_aktif: item.status_aktif == 1,
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            reset();
            // set default urutan
            setData('urutan', mitra && mitra.length > 0 ? Math.max(...mitra.map(m => m.urutan)) + 1 : 1);
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
            router.post(route('admin.mitra.update', editId), {
                _method: 'put',
                nama_mitra: data.nama_mitra,
                kategori: data.kategori,
                logo: data.logo,
                urutan: data.urutan,
                status_aktif: data.status_aktif ? 1 : 0,
            }, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.mitra.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus mitra ini?')) {
            router.delete(route('admin.mitra.destroy', id), {
                preserveScroll: true
            });
        }
    };

    // Filter logic
    const filteredMitra = useMemo(() => {
        if (!mitra) return [];
        return mitra.filter(item => {
            const matchSearch = item.nama_mitra.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                (item.kategori && item.kategori.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchStatus = statusFilter === 'all' 
                ? true 
                : statusFilter === 'aktif' ? item.status_aktif == 1 : item.status_aktif == 0;
            
            return matchSearch && matchStatus;
        });
    }, [mitra, searchTerm, statusFilter]);

    // Pagination logic
    const totalPages = Math.ceil(filteredMitra.length / itemsPerPage);
    const paginatedMitra = filteredMitra.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    return (
        <AdminLayout header="Daftar Mitra">
            <Head title="Daftar Mitra" />

            {flash?.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-green-500" />
                    <span className="font-medium">{flash.success}</span>
                </div>
            )}

            {/* Header Title */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Daftar Mitra</h2>
                    <p className="text-gray-500 text-sm">Kelola informasi mitra yang bekerja sama dengan perusahaan Anda.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                    <Plus size={18} />
                    <span>Tambah Mitra</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Mitra */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                        <Building2 size={24} className="text-purple-500" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Mitra</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stats?.total || 0}</div>
                        <div className="text-[11px] text-gray-400">Semua mitra terdaftar</div>
                    </div>
                </div>

                {/* Mitra Aktif */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={24} className="text-green-500" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Mitra Aktif</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stats?.aktif || 0}</div>
                        <div className="text-[11px] text-gray-400">Mitra yang aktif bekerja sama</div>
                    </div>
                </div>

                {/* Kategori Mitra */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <Users size={24} className="text-blue-500" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Kategori Mitra</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stats?.kategori || 0}</div>
                        <div className="text-[11px] text-gray-400">Kategori mitra tersedia</div>
                    </div>
                </div>

                {/* Kerja Sama Aktif */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <Star size={24} className="text-orange-500" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Kerja Sama Aktif</div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stats?.proyek || 0}</div>
                        <div className="text-[11px] text-gray-400">Proyek bersama mitra</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
                    <div className="relative w-full sm:max-w-xs">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari mitra..."
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
                            <Filter size={16} />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Nama Mitra</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider w-24">Urutan</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider w-32">Status</th>
                                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider w-32">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {paginatedMitra.length > 0 ? (
                                paginatedMitra.map((item) => (
                                    <tr className="hover:bg-gray-50/50 transition-colors" key={item.id_mitra}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                                    {item.logo ? (
                                                        <img src={`/storage/${item.logo}`} alt={item.nama_mitra} className="max-w-full max-h-full object-contain p-1" />
                                                    ) : (
                                                        <Building2 size={20} className="text-gray-300" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{item.nama_mitra}</div>
                                                    <div className="text-[11px] text-gray-500 mt-0.5">{item.kategori || '-'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-medium text-gray-600">{item.urutan}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.status_aktif == 1 ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-green-50 text-green-700 border border-green-100">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-orange-50 text-orange-700 border border-orange-100">
                                                    Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => openModal(item)} 
                                                    className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteItem(item.id_mitra)} 
                                                    className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Search size={32} className="mb-3 text-gray-300" />
                                            <p className="text-sm">Tidak ada data mitra ditemukan.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        Menampilkan <span className="font-medium text-gray-900">{filteredMitra.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> - <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, filteredMitra.length)}</span> dari <span className="font-medium text-gray-900">{filteredMitra.length}</span> mitra
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
                    
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">{isEditing ? 'Edit Mitra' : 'Tambah Mitra'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                                &times;
                            </button>
                        </div>
                        
                        <form onSubmit={submit} className="p-6 max-h-[80vh] overflow-y-auto">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Mitra <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: PT. Cipta Karya Indonesia"
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all"
                                        value={data.nama_mitra}
                                        onChange={e => setData('nama_mitra', e.target.value)}
                                        required
                                    />
                                    {errors.nama_mitra && <p className="text-red-500 text-xs mt-1.5">{errors.nama_mitra}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategori <span className="text-gray-400 font-normal">(Opsional)</span></label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Kontraktor & Konstruksi"
                                        className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all"
                                        value={data.kategori}
                                        onChange={e => setData('kategori', e.target.value)}
                                    />
                                    {errors.kategori && <p className="text-red-500 text-xs mt-1.5">{errors.kategori}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Logo <span className="text-gray-400 font-normal">(Opsional)</span></label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer relative">
                                        <div className="space-y-1 text-center">
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                    <span>Upload file</span>
                                                    <input 
                                                        type="file" 
                                                        className="sr-only" 
                                                        accept="image/*"
                                                        onChange={e => setData('logo', e.target.files[0])}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, SVG up to 2MB</p>
                                            {data.logo && (
                                                <p className="text-xs text-green-600 font-medium mt-2">{data.logo.name}</p>
                                            )}
                                        </div>
                                    </div>
                                    {errors.logo && <p className="text-red-500 text-xs mt-1.5">{errors.logo}</p>}
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
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
                                                    {data.status_aktif ? 'Aktif' : 'Nonaktif'}
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
                                    {processing ? 'Menyimpan...' : 'Simpan Mitra'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}