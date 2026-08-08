import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';

export default function Index({ mitra }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nama_mitra: '',
        logo: null,
        urutan: 0,
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_mitra);
            setData({
                nama_mitra: item.nama_mitra || '',
                logo: null,
                urutan: item.urutan || '',
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
            router.post(route('admin.mitra.update', editId), {
                _method: 'put',
                nama_mitra: data.nama_mitra,
                logo: data.logo,
                urutan: data.urutan,
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
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('admin.mitra.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout header="Manajemen Mitra">
            <Head title="Manajemen Mitra" />

            {flash?.success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-2xl">
                <div className="p-6 sm:p-8 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Daftar Mitra</h3>
                        <button 
                            onClick={() => openModal()}
                            className="bg-wmu-dark text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
                        >
                            + Tambah Mitra
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Nama Mitra</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Logo</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Urutan</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-right text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {mitra && mitra.length > 0 ? (
                                    mitra.map((item) => (
                                        <tr className="hover:bg-gray-50/80 transition-colors duration-150 group" key={item.id_mitra}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.nama_mitra}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.logo ? (
                                                    <img src={`/storage/${item.logo}`} alt={item.id_mitra} className="h-10 w-auto object-contain" />
                                                ) : (
                                                    <span className="text-gray-400 text-sm italic">Tanpa Gambar</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.urutan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors mr-4">Edit</button>
                                                <button onClick={() => deleteItem(item.id_mitra)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="100%" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data mitra.</td>
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
                            <h3 className="text-lg font-bold">{isEditing ? 'Edit Mitra' : 'Tambah Mitra'}</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                        </div>
                        
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Mitra</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.nama_mitra}
                                    onChange={e => setData('nama_mitra', e.target.value)}
                                />
                                {errors.nama_mitra && <p className="text-red-500 text-xs mt-1">{errors.nama_mitra}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-wmu-dark hover:file:bg-gray-100"
                                    onChange={e => setData('logo', e.target.files[0])}
                                />
                                {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Urutan</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.urutan}
                                    onChange={e => setData('urutan', e.target.value)}
                                />
                                {errors.urutan && <p className="text-red-500 text-xs mt-1">{errors.urutan}</p>}
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