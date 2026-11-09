import { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Users, CheckCircle, FolderOpen, Star, Search, Filter, Plus, MoreVertical, X, Upload, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';

export default function Index({ klien, stats }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nama_klien: '',
        email: '',
        telepon: '',
        urutan: '',
        kategori: '',
        logo: null,
        status_aktif: true,
        _method: 'post', // Default method
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_klien);
            setData({
                nama_klien: item.nama_klien || '',
                email: item.email || '',
                telepon: item.telepon || '',
                urutan: item.urutan ?? 0,
                kategori: item.kategori || '',
                logo: null,
                status_aktif: item.status_aktif ? true : false,
                _method: 'put',
            });
            setImagePreview(item.logo ? (item.logo.startsWith('http') ? item.logo : `/storage/${item.logo}`) : null);
        } else {
            setIsEditing(false);
            setEditId(null);
            reset();
            setData('_method', 'post');
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            // Inertia doesn't support file uploads via PUT/PATCH out of the box unless spoofed
            post(route('admin.klien.update', editId), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.klien.store'), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus klien ini?')) {
            router.delete(route('admin.klien.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const toggleMenu = (id) => {
        if (activeMenu === id) {
            setActiveMenu(null);
        } else {
            setActiveMenu(id);
        }
    };

    return (
        <AdminLayout header="Daftar Klien">
            <Head title="Manajemen Klien" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Daftar Klien</h2>
                    <p className="text-sm text-gray-500 mt-1">Kelola informasi klien yang telah bekerja sama dengan Anda.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={16} /> Tambah Klien
                    </button>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg relative">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-500 rounded-full shrink-0">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Total Klien</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.total || 0}</h3>
                        <p className="text-[10px] text-gray-400">Semua klien terdaftar</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-500 rounded-full shrink-0">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Klien Aktif</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.aktif || 0}</h3>
                        <p className="text-[10px] text-gray-400">Klien yang ditampilkan</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-full shrink-0">
                        <FolderOpen size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Total Proyek</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.proyek || 0}</h3>
                        <p className="text-[10px] text-gray-400">Proyek dari semua klien</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-full shrink-0">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Testimoni</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.testimoni || 0}</h3>
                        <p className="text-[10px] text-gray-400">Testimoni klien</p>
                    </div>
                </div>
            </div>

            {/* Filter & Table Container */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                
                {/* Filter Bar */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Cari klien..."
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <select className="appearance-none bg-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                <option>Semua Status</option>
                                <option>Aktif</option>
                                <option>Nonaktif</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50">
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto min-h-[300px]">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Logo</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Nama Klien</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Telepon</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Proyek</th>
                                <th className="px-6 py-4 text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {klien && klien.length > 0 ? (
                                klien.map((item) => (
                                    <tr className="hover:bg-gray-50/50 transition-colors" key={item.id_klien}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="h-10 w-10 flex items-center justify-center bg-gray-50 border border-gray-100 rounded overflow-hidden p-1">
                                                {item.logo ? (
                                                    <img src={item.logo.startsWith('http') ? item.logo : `/storage/${item.logo}`} alt={item.nama_klien} className="max-h-full max-w-full object-contain" />
                                                ) : (
                                                    <Users size={16} className="text-gray-300" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-gray-900">{item.nama_klien}</div>
                                            <div className="text-xs text-gray-400">Urutan: {item.urutan}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                {item.kategori || 'Tanpa Kategori'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {item.email || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {item.telepon || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            {item.status_aktif ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-100 text-green-800">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-orange-100 text-orange-800">
                                                    Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-500 whitespace-nowrap">
                                            {item.proyek_count} Proyek
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium relative">
                                            <button 
                                                onClick={() => toggleMenu(item.id_klien)}
                                                className="text-gray-400 hover:text-gray-600 p-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50"
                                            >
                                                <MoreVertical size={16} />
                                            </button>
                                            
                                            {/* Dropdown Menu */}
                                            {activeMenu === item.id_klien && (
                                                <div className="absolute right-16 top-1/2 -translate-y-1/2 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-10 py-1">
                                                    <button 
                                                        onClick={() => { openModal(item); setActiveMenu(null); }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2"
                                                    >
                                                        <Edit size={14} /> Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => { deleteItem(item.id_klien); setActiveMenu(null); }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-2"
                                                    >
                                                        <Trash2 size={14} /> Hapus
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                                                <Users size={32} className="text-gray-300" />
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">Belum ada data klien.</h4>
                                            <p className="text-gray-500 text-sm mb-4">Tambahkan informasi klien pertama Anda.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination Placeholder */}
                {klien && klien.length > 0 && (
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Menampilkan <span className="font-medium">1</span> - <span className="font-medium">{klien.length}</span> dari <span className="font-medium">{klien.length}</span> klien
                        </p>
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 border border-gray-200 rounded text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
                                <ChevronLeft size={16} />
                            </button>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">1</button>
                            <button className="p-1.5 border border-gray-200 rounded text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                            <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit Klien' : 'Tambah Klien Baru'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
                        </div>
                        
                        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar min-h-0">
                            <form id="klienForm" onSubmit={submit}>
                                <div className="mb-5 flex flex-col items-center">
                                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden bg-gray-50 mb-3 group hover:border-blue-400 transition-colors">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <Upload size={24} className="mx-auto text-gray-400 mb-2 group-hover:text-blue-500" />
                                                <span className="text-[10px] text-gray-500">Upload Logo</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept="image/*"
                                        />
                                    </div>
                                    <p className="text-[11px] text-gray-500">Format: JPG, PNG. Maks 2MB.</p>
                                    {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Nama Klien *</label>
                                        <input
                                            type="text"
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all text-sm"
                                            value={data.nama_klien}
                                            onChange={e => setData('nama_klien', e.target.value)}
                                            required
                                        />
                                        {errors.nama_klien && <p className="text-red-500 text-xs mt-1">{errors.nama_klien}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Urutan Tampil *</label>
                                        <input
                                            type="number"
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all text-sm"
                                            value={data.urutan}
                                            onChange={e => setData('urutan', e.target.value)}
                                            required
                                        />
                                        {errors.urutan && <p className="text-red-500 text-xs mt-1">{errors.urutan}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Kategori</label>
                                        <input 
                                            type="text" 
                                            value={data.kategori} 
                                            onChange={e => setData('kategori', e.target.value)}
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all text-sm"
                                            placeholder="Contoh: Industrial, Hospitality"
                                        />
                                        {errors.kategori && <p className="text-red-500 text-xs mt-1">{errors.kategori}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email Kontak</label>
                                        <input
                                            type="email"
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all text-sm"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="contoh@klien.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Nomor Telepon</label>
                                        <input
                                            type="text"
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all text-sm"
                                            value={data.telepon}
                                            onChange={e => setData('telepon', e.target.value)}
                                            placeholder="+62 812-..."
                                        />
                                        {errors.telepon && <p className="text-red-500 text-xs mt-1">{errors.telepon}</p>}
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Status Aktif</label>
                                    <div className="flex items-center h-10">
                                        <button 
                                            type="button"
                                            onClick={() => setData('status_aktif', !data.status_aktif)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${data.status_aktif ? 'bg-green-500' : 'bg-gray-200'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.status_aktif ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                        <span className="ml-3 text-sm font-semibold text-gray-700">{data.status_aktif ? 'Aktif (Ditampilkan)' : 'Nonaktif (Disembunyikan)'}</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-xl shrink-0">
                            <button type="button" onClick={closeModal} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Batal</button>
                            <button form="klienForm" type="submit" disabled={processing} className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50 transition-all flex items-center justify-center">
                                {processing ? 'Menyimpan...' : 'Simpan Klien'}
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
