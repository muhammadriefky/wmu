import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';

export default function Index({ klien }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        nama_klien: '',
        urutan: 0,
        logo: null
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_klien);
            setData({
                nama_klien: item.nama_klien,
                urutan: item.urutan,
                logo: null
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
            router.post(route('admin.klien.update', editId), {
                _method: 'put',
                nama_klien: data.nama_klien,
                urutan: data.urutan,
                logo: data.logo,
            }, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.klien.store'), {
                preserveScroll: true,
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

    return (
        <AdminLayout header="Manajemen Klien">
            <Head title="Manajemen Klien" />

            {flash?.success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-2xl">
                <div className="p-6 sm:p-8 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Daftar Klien</h3>
                        <button 
                            onClick={() => openModal()}
                            className="bg-wmu-dark text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
                        >
                            + Tambah Klien
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Logo</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Nama Klien</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Urutan</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-right text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {klien.length > 0 ? (
                                    klien.map((item) => (
                                        <tr className="hover:bg-gray-50/80 transition-colors duration-150 group" key={item.id_klien}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.logo ? (
                                                    <img src={`/storage/${item.logo}`} alt={item.nama_klien} className="h-10 w-auto object-contain" />
                                                ) : (
                                                    <span className="text-gray-400 text-sm italic">Tanpa Logo</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.nama_klien}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {item.urutan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors mr-4">Edit</button>
                                                <button onClick={() => deleteItem(item.id_klien)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data klien.</td>
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
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">{isEditing ? 'Edit Klien' : 'Tambah Klien'}</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                        </div>
                        
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Klien</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.nama_klien}
                                    onChange={e => setData('nama_klien', e.target.value)}
                                    required
                                />
                                {errors.nama_klien && <p className="text-red-500 text-xs mt-1">{errors.nama_klien}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Logo (Opsional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-wmu-dark hover:file:bg-gray-100"
                                    onChange={e => setData('logo', e.target.files[0])}
                                />
                                {isEditing && <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah logo.</p>}
                                {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Urutan (Untuk Sorting)</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.urutan}
                                    onChange={e => setData('urutan', e.target.value)}
                                    required
                                />
                                {errors.urutan && <p className="text-red-500 text-xs mt-1">{errors.urutan}</p>}
                            </div>

                            <div className="flex justify-end space-x-2">
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
