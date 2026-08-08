import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';

export default function Index({ blog }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        judul_blog: '',
        slug: '',
        meta_deskripsi: '',
        isi_konten: '',
        tanggal_terbit: '',
    });

    const openModal = (item = null) => {
        clearErrors();
        if (item) {
            setIsEditing(true);
            setEditId(item.id_blog);
            setData({
                judul_blog: item.judul_blog || '',
                slug: item.slug || '',
                meta_deskripsi: item.meta_deskripsi || '',
                isi_konten: item.isi_konten || '',
                tanggal_terbit: item.tanggal_terbit || '',
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
            router.post(route('admin.blog.update', editId), {
                _method: 'put',
                judul_blog: data.judul_blog,
                slug: data.slug,
                meta_deskripsi: data.meta_deskripsi,
                isi_konten: data.isi_konten,
                tanggal_terbit: data.tanggal_terbit,
            }, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.blog.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteItem = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('admin.blog.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout header="Manajemen Blog">
            <Head title="Manajemen Blog" />

            {flash?.success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}

            <div className="bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-2xl">
                <div className="p-6 sm:p-8 bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Daftar Blog</h3>
                        <button 
                            onClick={() => openModal()}
                            className="bg-wmu-dark text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
                        >
                            + Tambah Blog
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 border">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Judul Blog</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Slug</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Meta Deskripsi</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Isi Konten</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Tanggal Terbit (YYYY-MM-DD)</th>
                                    <th className="px-6 py-4 bg-gray-50/50 text-right text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {blog && blog.length > 0 ? (
                                    blog.map((item) => (
                                        <tr className="hover:bg-gray-50/80 transition-colors duration-150 group" key={item.id_blog}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.judul_blog}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.meta_deskripsi}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.isi_konten}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">
                                                {item.tanggal_terbit}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors mr-4">Edit</button>
                                                <button onClick={() => deleteItem(item.id_blog)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="100%" className="px-6 py-4 text-center text-sm text-gray-500">Belum ada data blog.</td>
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
                            <h3 className="text-lg font-bold">{isEditing ? 'Edit Blog' : 'Tambah Blog'}</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
                        </div>
                        
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Blog</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.judul_blog}
                                    onChange={e => setData('judul_blog', e.target.value)}
                                />
                                {errors.judul_blog && <p className="text-red-500 text-xs mt-1">{errors.judul_blog}</p>}
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
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Deskripsi</label>
                                <textarea
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.meta_deskripsi}
                                    onChange={e => setData('meta_deskripsi', e.target.value)}
                                    rows="3"
                                />
                                {errors.meta_deskripsi && <p className="text-red-500 text-xs mt-1">{errors.meta_deskripsi}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Konten</label>
                                <textarea
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.isi_konten}
                                    onChange={e => setData('isi_konten', e.target.value)}
                                    rows="3"
                                />
                                {errors.isi_konten && <p className="text-red-500 text-xs mt-1">{errors.isi_konten}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Terbit (YYYY-MM-DD)</label>
                                <input
                                    type="datetime-local"
                                    className="mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm"
                                    value={data.tanggal_terbit}
                                    onChange={e => setData('tanggal_terbit', e.target.value)}
                                />
                                {errors.tanggal_terbit && <p className="text-red-500 text-xs mt-1">{errors.tanggal_terbit}</p>}
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