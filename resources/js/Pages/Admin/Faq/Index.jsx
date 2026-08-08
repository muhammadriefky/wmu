import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';

export default function Index({ faq }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        pertanyaan: '',
        jawaban: '',
        urutan: 0,
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
            router.post(route('admin.faq.update', editId), {
                _method: 'put',
                pertanyaan: data.pertanyaan,
                jawaban: data.jawaban,
                urutan: data.urutan,
            }, {
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
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('admin.faq.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout header="Manajemen Faq">
            <Head title="Manajemen Faq" />

            {flash?.success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-2xl">
                <div className="p-6 sm:p-8 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Daftar Faq</h3>
                        <button 
                            onClick={() => openModal()}
                            className="bg-wmu-dark text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
                        >
                            + Tambah Faq
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Pertanyaan</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Jawaban</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Urutan</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-right text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {faq && faq.length > 0 ? (
                                    faq.map((item) => (
                                        <tr className="hover:bg-gray-50/80 transition-colors duration-150 group" key={item.id_faq}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.pertanyaan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.jawaban}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.urutan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors mr-4">Edit</button>
                                                <button onClick={() => deleteItem(item.id_faq)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="100%" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data faq.</td>
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
                            <h3 className="text-lg font-bold">{isEditing ? 'Edit Faq' : 'Tambah Faq'}</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                        </div>
                        
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Pertanyaan</label>
                                <textarea
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.pertanyaan}
                                    onChange={e => setData('pertanyaan', e.target.value)}
                                    rows="3"
                                />
                                {errors.pertanyaan && <p className="text-red-500 text-xs mt-1">{errors.pertanyaan}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Jawaban</label>
                                <textarea
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.jawaban}
                                    onChange={e => setData('jawaban', e.target.value)}
                                    rows="3"
                                />
                                {errors.jawaban && <p className="text-red-500 text-xs mt-1">{errors.jawaban}</p>}
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