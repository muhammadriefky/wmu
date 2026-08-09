import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Folder, CheckCircle, Star, Eye, Calendar, Filter, Search, ChevronDown, List, Grid, Edit, MoreVertical, Plus, Image as ImageIcon, X } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function Index({ proyek, stats }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        prk_judul: '',
        prk_slug: '',
        prk_klien: '',
        prk_tahun: '',
        prk_gambar: null,
        prk_kategori: '',
        prk_status: 'Draft',
        prk_is_unggulan: false,
        prk_deskripsi: '',
        prk_tantangan: '',
        prk_solusi: '',
        prk_hasil: '',
        prk_luas: '',
        prk_galeri: [], // new files to upload
        existing_galeri: [], // existing uploaded files
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.prk_id);
            setData({
                prk_judul: item.prk_judul || '',
                prk_slug: item.prk_slug || '',
                prk_klien: item.prk_klien || '',
                prk_tahun: item.prk_tahun || '',
                prk_gambar: item.prk_gambar || null,
                prk_kategori: item.prk_kategori || '',
                prk_status: item.prk_status || 'Draft',
                prk_is_tampil: item.prk_is_tampil ? true : false,
                prk_is_unggulan: item.prk_is_unggulan ? true : false,
                prk_deskripsi: item.prk_deskripsi || '',
                prk_tantangan: item.prk_tantangan || '',
                prk_solusi: item.prk_solusi || '',
                prk_hasil: item.prk_hasil || '',
                prk_luas: item.prk_luas || '',
                prk_galeri: [],
                existing_galeri: item.prk_galeri ? (typeof item.prk_galeri === 'string' ? JSON.parse(item.prk_galeri) : item.prk_galeri) : [],
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
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            let updateData = { ...data, _method: 'put' };
            if (typeof updateData.prk_gambar === 'string') {
                delete updateData.prk_gambar;
            }
            
            // To handle multiple files properly with Inertia _method: 'put', we must force FormData
            router.post(route('admin.proyek.update', editId), updateData, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.proyek.store'), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus proyek ini?')) {
            router.delete(route('admin.proyek.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const toggleDisplay = (item) => {
        router.post(route('admin.proyek.update', item.prk_id), {
            _method: 'put',
            prk_judul: item.prk_judul || '',
            prk_slug: item.prk_slug || '',
            prk_klien: item.prk_klien || '',
            prk_tahun: item.prk_tahun || '',
            prk_kategori: item.prk_kategori || '',
            prk_status: item.prk_status || '',
            prk_is_tampil: !item.prk_is_tampil,
            prk_is_unggulan: item.prk_is_unggulan ? true : false,
            prk_deskripsi: item.prk_deskripsi || '',
            prk_tantangan: item.prk_tantangan || '',
            prk_solusi: item.prk_solusi || '',
            prk_hasil: item.prk_hasil || '',
            prk_luas: item.prk_luas || '',
        }, { preserveScroll: true });
    };

    const categoryColors = {
        'Infrastruktur': 'bg-purple-100 text-purple-600',
        'Industrial': 'bg-blue-100 text-blue-600',
        'Residential': 'bg-orange-100 text-orange-600',
        'Hospitality': 'bg-teal-100 text-teal-600',
        'Commercial': 'bg-pink-100 text-pink-600',
        'default': 'bg-gray-100 text-gray-600'
    };

    return (
        <AdminLayout header="Manajemen Proyek">
            <Head title="Manajemen Proyek" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manajemen Proyek</h2>
                    <p className="text-sm text-gray-500 mt-1">Dashboard <span className="mx-1">&gt;</span> Proyek</p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-wmu-dark text-white rounded-lg text-sm font-medium shadow-sm hover:bg-gray-800 transition-colors"
                    >
                        <Plus size={16} /> Tambah Proyek
                    </button>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg relative">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-500 rounded-xl">
                        <Folder size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Total Proyek</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.total_proyek || 0}</h3>
                        <p className="text-[10px] text-gray-400">Semua proyek</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-500 rounded-xl">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Proyek Aktif</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.proyek_aktif || 0}</h3>
                        <p className="text-[10px] text-gray-400">Status published</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-xl">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Proyek Unggulan</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.proyek_unggulan || 0}</h3>
                        <p className="text-[10px] text-gray-400">Tampil di homepage</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                        <Eye size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Total Dilihat</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.total_dilihat?.toLocaleString('id-ID') || 0}</h3>
                        <p className="text-[10px] text-gray-400">Semua proyek</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Proyek Terbaru</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.proyek_terbaru || 0}</h3>
                        <p className="text-[10px] text-gray-400">Dalam 30 hari</p>
                    </div>
                </div>
            </div>

            {/* Filter & Table Container */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                
                {/* Filter Bar */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex w-full md:w-auto gap-2">
                        <button className="flex items-center justify-between w-40 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-gray-50 hover:bg-white transition-colors">
                            Semua Kategori <ChevronDown size={14} />
                        </button>
                        <div className="relative flex-1 md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={14} className="text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-wmu-accent focus:border-wmu-accent" 
                                placeholder="Cari proyek berdasarkan judul..."
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50">
                            Terbaru <ChevronDown size={14} />
                        </button>
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                            <button className="p-2 bg-wmu-dark text-white"><List size={16} /></button>
                            <button className="p-2 text-gray-400 hover:text-gray-600"><Grid size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider w-10">
                                    <input type="checkbox" className="rounded border-gray-300 text-wmu-accent focus:ring-wmu-accent" />
                                </th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Proyek</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Klien</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tahun</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ditampilkan</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Dibuat</th>
                                <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {proyek && proyek.length > 0 ? (
                                proyek.map((item) => {
                                    const catClass = categoryColors[item.prk_kategori] || categoryColors['default'];
                                    return (
                                        <tr className="hover:bg-gray-50/50 transition-colors" key={item.prk_id}>
                                            <td className="px-6 py-4">
                                                <input type="checkbox" className="rounded border-gray-300 text-wmu-accent focus:ring-wmu-accent" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    {item.prk_gambar ? (
                                                        <img src={`/storage/${item.prk_gambar}`} alt={item.prk_judul} className="h-12 w-16 rounded-md object-cover border border-gray-100" />
                                                    ) : (
                                                        <div className="h-12 w-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border border-gray-200">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">{item.prk_judul}</p>
                                                        <p className="text-xs text-gray-400">{item.prk_slug}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${catClass}`}>
                                                    {item.prk_kategori || 'Tanpa Kategori'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.prk_klien}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.prk_tahun}</td>
                                            <td className="px-6 py-4">
                                                {item.prk_status === 'Published' ? (
                                                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Published</span>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">Draft</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button 
                                                    type="button"
                                                    onClick={() => toggleDisplay(item)}
                                                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-wmu-accent focus:ring-offset-2 ${item.prk_is_tampil ? 'bg-wmu-dark' : 'bg-gray-200'}`}
                                                >
                                                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.prk_is_tampil ? 'translate-x-4' : 'translate-x-0'}`} />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-semibold text-gray-700">{dayjs(item.rec_datecreated).format('D MMM YYYY')}</p>
                                                <p className="text-[10px] text-gray-400">{item.rec_usercreated || 'Admin'}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => openModal(item)} className="p-1.5 text-gray-400 hover:text-wmu-accent hover:bg-green-50 rounded-md border border-transparent hover:border-green-100 transition-colors">
                                                        <Edit size={16} />
                                                    </button>
                                                    <div className="relative group">
                                                        <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                        <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                                            <button 
                                                                onClick={() => deleteItem(item.prk_id)}
                                                                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md"
                                                            >
                                                                Hapus Proyek
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="100%" className="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada data proyek.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <p>Menampilkan {proyek?.length > 0 ? 1 : 0} - {proyek?.length || 0} dari {stats?.total_proyek || 0} proyek</p>
                    <div className="flex gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">&lt;</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-wmu-dark text-white font-bold">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">&gt;</button>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-yellow-50/50 border border-yellow-100 rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                        <Star size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-800">Tips</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Atur proyek unggulan agar prk_is_tampil di halaman utama website untuk menarik perhatian pengunjung.</p>
                    </div>
                </div>
                <button className="px-4 py-2 border border-yellow-300 text-yellow-700 bg-white rounded-lg text-xs font-bold hover:bg-yellow-50 transition-colors whitespace-nowrap">
                    Kelola Proyek Unggulan
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4 py-10">
                        <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl">
                            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit Proyek' : 'Tambah Proyek Baru'}</h3>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
                            </div>
                            
                            <div className="p-6">
                            <form id="proyekForm" onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Judul Proyek</label>
                                        <input
                                            type="text"
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                            value={data.prk_judul}
                                            onChange={e => setData('prk_judul', e.target.value)}
                                        />
                                        {errors.prk_judul && <p className="text-red-500 text-xs mt-1">{errors.prk_judul}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Slug (URL)</label>
                                        <input
                                            type="text"
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                            value={data.prk_slug}
                                            onChange={e => setData('prk_slug', e.target.value)}
                                        />
                                        {errors.prk_slug && <p className="text-red-500 text-xs mt-1">{errors.prk_slug}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Nama Klien</label>
                                        <input
                                            type="text"
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                            value={data.prk_klien}
                                            onChange={e => setData('prk_klien', e.target.value)}
                                        />
                                        {errors.prk_klien && <p className="text-red-500 text-xs mt-1">{errors.prk_klien}</p>}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Tahun</label>
                                            <input
                                                type="text"
                                                className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                                value={data.prk_tahun}
                                                onChange={e => setData('prk_tahun', e.target.value)}
                                            />
                                            {errors.prk_tahun && <p className="text-red-500 text-xs mt-1">{errors.prk_tahun}</p>}
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Kategori</label>
                                            <input 
                                                type="text"
                                                list="proyek-kategori-list"
                                                placeholder="Pilih atau ketik kategori..."
                                                className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                                value={data.prk_kategori}
                                                onChange={e => setData('prk_kategori', e.target.value)}
                                            />
                                            <datalist id="proyek-kategori-list">
                                                <option value="Infrastruktur" />
                                                <option value="Industrial" />
                                                <option value="Residential" />
                                                <option value="Hospitality" />
                                                <option value="Commercial" />
                                            </datalist>
                                            {errors.prk_kategori && <p className="text-red-500 text-xs mt-1">{errors.prk_kategori}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Gambar Proyek</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden relative group">
                                        {data.prk_gambar ? (
                                            <div className="relative w-full flex justify-center">
                                                <img 
                                                    src={typeof data.prk_gambar === 'string' ? `/storage/${data.prk_gambar}` : URL.createObjectURL(data.prk_gambar)} 
                                                    alt="Preview" 
                                                    className="h-32 object-contain rounded-md"
                                                />
                                                <label htmlFor="file-upload" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md cursor-pointer">
                                                    <span className="px-3 py-1 bg-white text-gray-800 text-xs font-bold rounded-md shadow-sm">
                                                        Ganti Gambar
                                                    </span>
                                                    <input id="file-upload" type="file" className="sr-only" accept="image/*" onChange={e => setData('prk_gambar', e.target.files[0])} />
                                                </label>
                                            </div>
                                        ) : (
                                            <label htmlFor="file-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer space-y-1 text-center">
                                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <span className="relative rounded-md font-medium text-wmu-accent hover:text-green-500 focus-within:outline-none">
                                                        Upload a file
                                                    </span>
                                                    <p className="pl-1">or click here</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                                                <input id="file-upload" type="file" className="sr-only" accept="image/*" onChange={e => setData('prk_gambar', e.target.files[0])} />
                                            </label>
                                        )}
                                    </div>
                                    {errors.prk_gambar && <p className="text-red-500 text-xs mt-1">{errors.prk_gambar}</p>}
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Luas Area / Fasade</label>
                                    <input
                                        type="text"
                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                        value={data.prk_luas}
                                        onChange={e => setData('prk_luas', e.target.value)}
                                        placeholder="Contoh: 1.500 m²"
                                    />
                                    {errors.prk_luas && <p className="text-red-500 text-xs mt-1">{errors.prk_luas}</p>}
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Deskripsi Proyek</label>
                                    <textarea
                                        rows="3"
                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                        value={data.prk_deskripsi}
                                        onChange={e => setData('prk_deskripsi', e.target.value)}
                                    ></textarea>
                                    {errors.prk_deskripsi && <p className="text-red-500 text-xs mt-1">{errors.prk_deskripsi}</p>}
                                </div>
                                
                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Tantangan</label>
                                    <textarea
                                        rows="2"
                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                        value={data.prk_tantangan}
                                        onChange={e => setData('prk_tantangan', e.target.value)}
                                    ></textarea>
                                    {errors.prk_tantangan && <p className="text-red-500 text-xs mt-1">{errors.prk_tantangan}</p>}
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Solusi</label>
                                    <textarea
                                        rows="2"
                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                        value={data.prk_solusi}
                                        onChange={e => setData('prk_solusi', e.target.value)}
                                    ></textarea>
                                    {errors.prk_solusi && <p className="text-red-500 text-xs mt-1">{errors.prk_solusi}</p>}
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Hasil</label>
                                    <textarea
                                        rows="2"
                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                        value={data.prk_hasil}
                                        onChange={e => setData('prk_hasil', e.target.value)}
                                    ></textarea>
                                    {errors.prk_hasil && <p className="text-red-500 text-xs mt-1">{errors.prk_hasil}</p>}
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Galeri Proyek (Pilih beberapa)</label>
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*" 
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-wmu-accent hover:file:bg-blue-100"
                                        onChange={e => setData('prk_galeri', Array.from(e.target.files))}
                                    />
                                    {errors.prk_galeri && <p className="text-red-500 text-xs mt-1">{errors.prk_galeri}</p>}
                                    {data.existing_galeri && data.existing_galeri.length > 0 && (
                                        <div className="mt-3 flex gap-2 flex-wrap">
                                            {data.existing_galeri.map((img, i) => (
                                                <div key={i} className="relative w-16 h-16 group">
                                                    <img src={`/storage/${img}`} className="w-full h-full object-cover rounded-md border" />
                                                    <button type="button" onClick={() => {
                                                        const newExisting = data.existing_galeri.filter((_, idx) => idx !== i);
                                                        setData('existing_galeri', newExisting);
                                                    }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Status</label>
                                        <select 
                                            className="block w-full rounded-lg border-gray-200 bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all text-sm"
                                            value={data.prk_status}
                                            onChange={e => setData('prk_status', e.target.value)}
                                        >
                                            <option value="Draft">Draft</option>
                                            <option value="Published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Ditampilkan</label>
                                        <div className="flex items-center h-10">
                                            <button 
                                                type="button"
                                                onClick={() => setData('prk_is_tampil', !data.prk_is_tampil)}
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-wmu-accent focus:ring-offset-2 ${data.prk_is_tampil ? 'bg-wmu-dark' : 'bg-gray-200'}`}
                                            >
                                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.prk_is_tampil ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                            <span className="ml-3 text-sm text-gray-600">{data.prk_is_tampil ? 'Ya' : 'Tidak'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Proyek Unggulan</label>
                                        <div className="flex items-center h-10">
                                            <button 
                                                type="button"
                                                onClick={() => setData('prk_is_unggulan', !data.prk_is_unggulan)}
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${data.prk_is_unggulan ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                            >
                                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.prk_is_unggulan ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                            <span className="ml-3 text-sm text-gray-600">{data.prk_is_unggulan ? 'Ya' : 'Tidak'}</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                            
                            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-lg">
                                <button type="button" onClick={closeModal} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Batal</button>
                                <button form="proyekForm" type="submit" disabled={processing} className="px-5 py-2 bg-wmu-accent text-white font-medium rounded-lg hover:bg-green-600 shadow-sm disabled:opacity-50 transition-all">
                                    {processing ? 'Menyimpan...' : 'Simpan Proyek'}
                                </button>
                            </div>
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