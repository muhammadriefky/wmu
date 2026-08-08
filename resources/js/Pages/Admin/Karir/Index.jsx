import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';

export default function Index({ karir }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        posisi: '',
        slug: '',
        persyaratan: '',
        status_aktif: 0,
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_karir);
            setData({
                posisi: item.posisi || '',
                slug: item.slug || '',
                persyaratan: item.persyaratan || '',
                status_aktif: item.status_aktif || '',
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
            router.post(route('admin.karir.update', editId), {
                _method: 'put',
                posisi: data.posisi,
                slug: data.slug,
                persyaratan: data.persyaratan,
                status_aktif: data.status_aktif,
            }, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.karir.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('admin.karir.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout header="Manajemen Karir">
            <Head title="Manajemen Karir" />

            {flash?.success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-2xl">
                <div className="p-6 sm:p-8 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Daftar Karir</h3>
                        <button 
                            onClick={() => openModal()}
                            className="bg-wmu-dark text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
                        >
                            + Tambah Karir
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Posisi</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Slug</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Persyaratan</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status Aktif (1/0)</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-right text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {karir && karir.length > 0 ? (
                                    karir.map((item) => (
                                        <tr className="hover:bg-gray-50/80 transition-colors duration-150 group" key={item.id_karir}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.posisi}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.persyaratan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.status_aktif}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors mr-4">Edit</button>
                                                <button onClick={() => deleteItem(item.id_karir)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="100%" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data karir.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">{isEditing ? 'Edit Karir' : 'Tambah Karir'}</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                        </div>
                        
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Posisi</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.posisi}
                                    onChange={e => setData('posisi', e.target.value)}
                                />
                                {errors.posisi && <p className="text-red-500 text-xs mt-1">{errors.posisi}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                />
                                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Persyaratan</label>
                                <textarea
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.persyaratan}
                                    onChange={e => setData('persyaratan', e.target.value)}
                                    rows="3"
                                />
                                {errors.persyaratan && <p className="text-red-500 text-xs mt-1">{errors.persyaratan}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Status Aktif (1/0)</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.status_aktif}
                                    onChange={e => setData('status_aktif', e.target.value)}
                                />
                                {errors.status_aktif && <p className="text-red-500 text-xs mt-1">{errors.status_aktif}</p>}
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">Batal</button>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-wmu-accent text-white rounded hover:bg-green-500 disabled:opacity-50">
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}