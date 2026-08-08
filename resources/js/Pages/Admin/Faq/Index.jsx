import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { HelpCircle, CheckCircle, Eye, FileText, Search, Filter, Plus, Edit, MoreVertical, X } from 'lucide-react';

export default function Index({ faq, stats }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        pertanyaan: '',
        jawaban: '',
        urutan: '',
        status_aktif: true,
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_faq);
            setData({
                pertanyaan: item.pertanyaan || '',
                jawaban: item.jawaban || '',
                urutan: item.urutan || '',
                status_aktif: item.status_aktif ? true : false,
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
            router.put(route('admin.faq.update', editId), data, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.faq.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus FAQ ini?')) {
            router.delete(route('admin.faq.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const toggleStatus = (item) => {
        router.put(route('admin.faq.update', item.id_faq), {
            pertanyaan: item.pertanyaan || '',
            jawaban: item.jawaban || '',
            urutan: item.urutan || '',
            status_aktif: !item.status_aktif,
        }, { preserveScroll: true });
    };

    return (
        <AdminLayout header="Daftar Faq">
            <Head title="Manajemen FAQ" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Daftar Faq</h2>
                    <p className="text-sm text-gray-500 mt-1">Kelola pertanyaan yang paling sering diajukan oleh client Anda.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button 
                        onClick={() => openModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={16} /> Tambah Faq
                    </button>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg relative">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-full">
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Total FAQ</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.total || 0}</h3>
                        <p className="text-[10px] text-gray-400">Semua FAQ terdaftar</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-500 rounded-full">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Aktif</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">{stats?.aktif || 0}</h3>
                        <p className="text-[10px] text-gray-400">FAQ yang ditampilkan</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-full">
                        <Eye size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Dilihat</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">0</h3>
                        <p className="text-[10px] text-gray-400">Total dilihat</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-500 rounded-full">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500">Kategori</p>
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">0</h3>
                        <p className="text-[10px] text-gray-400">Topik berbeda</p>
                    </div>
                </div>
            </div>

            {/* Filter & Table Container */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                
                {/* Filter Bar */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center gap-4">
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                            placeholder="Cari pertanyaan..."
                        />
                    </div>
                    <div>
                        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50">
                            Semua Status <Filter size={14} />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-1/3">Pertanyaan</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-1/3">Jawaban</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Urutan</th>
                                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {faq && faq.length > 0 ? (
                                faq.map((item) => (
                                    <tr className="hover:bg-gray-50/50 transition-colors" key={item.id_faq}>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-gray-800 line-clamp-2">{item.pertanyaan}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <p className="line-clamp-2">{item.jawaban}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700 mx-auto">
                                                {item.urutan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                type="button"
                                                onClick={() => toggleStatus(item)}
                                                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${item.status_aktif ? 'bg-green-500' : 'bg-gray-200'}`}
                                            >
                                                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.status_aktif ? 'translate-x-4' : 'translate-x-0'}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openModal(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => deleteItem(item.id_faq)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-32 h-32 mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                                                <HelpCircle size={64} className="text-blue-300" />
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">Belum ada data faq.</h4>
                                            <p className="text-gray-500 text-sm max-w-sm mb-6">Mulai tambahkan FAQ untuk membantu client mendapatkan informasi dengan mudah.</p>
                                            <button 
                                                onClick={() => openModal()}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors"
                                            >
                                                <Plus size={16} /> Tambah FAQ Pertama
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit FAQ' : 'Tambah FAQ Baru'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
                        </div>
                        
                        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                            <form id="faqForm" onSubmit={submit}>
                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Pertanyaan</label>
                                    <input
                                        type="text"
                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all text-sm"
                                        value={data.pertanyaan}
                                        onChange={e => setData('pertanyaan', e.target.value)}
                                        placeholder="Contoh: Berapa lama estimasi pengerjaan?"
                                    />
                                    {errors.pertanyaan && <p className="text-red-500 text-xs mt-1">{errors.pertanyaan}</p>}
                                </div>
                                <div className="mb-5">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Jawaban</label>
                                    <textarea
                                        className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all text-sm min-h-[120px] resize-y"
                                        value={data.jawaban}
                                        onChange={e => setData('jawaban', e.target.value)}
                                        placeholder="Masukkan jawaban yang detail di sini..."
                                    ></textarea>
                                    {errors.jawaban && <p className="text-red-500 text-xs mt-1">{errors.jawaban}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Urutan Tampil</label>
                                        <input
                                            type="number"
                                            className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all text-sm"
                                            value={data.urutan}
                                            onChange={e => setData('urutan', e.target.value)}
                                        />
                                        {errors.urutan && <p className="text-red-500 text-xs mt-1">{errors.urutan}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Status Aktif</label>
                                        <div className="flex items-center h-10">
                                            <button 
                                                type="button"
                                                onClick={() => setData('status_aktif', !data.status_aktif)}
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${data.status_aktif ? 'bg-green-500' : 'bg-gray-200'}`}
                                            >
                                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.status_aktif ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                            <span className="ml-3 text-sm font-semibold text-gray-700">{data.status_aktif ? 'Aktif' : 'Tidak Aktif'}</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-xl">
                            <button type="button" onClick={closeModal} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Batal</button>
                            <button form="faqForm" type="submit" disabled={processing} className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50 transition-all">
                                {processing ? 'Menyimpan...' : 'Simpan FAQ'}
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