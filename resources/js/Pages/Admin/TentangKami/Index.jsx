import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Plus, Trash2, Image as ImageIcon, Building2, ChevronUp, ChevronDown } from 'lucide-react';

export default function TentangKami({ tentang }) {
    const { flash } = usePage().props;
    // Parse JSON arrays safely
    const parseArray = (data) => {
        if (!data) return [];
        if (typeof data === 'string') {
            try { return JSON.parse(data); } catch (e) { return []; }
        }
        return Array.isArray(data) ? data : [];
    };

    const initialSejarah = parseArray(tentang?.sejarah_perusahaan);
    const initialNilai = parseArray(tentang?.nilai_perusahaan);

    const { data, setData, post, processing, errors } = useForm({
        judul_hero: tentang?.judul_hero || '',
        deskripsi_hero: tentang?.deskripsi_hero || '',
        sejarah_perusahaan: initialSejarah.length > 0 ? initialSejarah : [{ year: '', title: '', desc: '' }],
        nilai_perusahaan: initialNilai.length > 0 ? initialNilai : [{ title: '', desc: '' }],
        struktur_organisasi_image: null,
    });

    const [previewImg, setPreviewImg] = useState(
        tentang?.struktur_organisasi_image ? `/storage/${tentang.struktur_organisasi_image}` : null
    );

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.tentang-kami.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('struktur_organisasi_image', file);
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
        }
    };

    // Helper functions for dynamic arrays
    const addSejarah = () => {
        setData('sejarah_perusahaan', [...data.sejarah_perusahaan, { year: '', title: '', desc: '' }]);
    };
    const removeSejarah = (index) => {
        setData('sejarah_perusahaan', data.sejarah_perusahaan.filter((_, i) => i !== index));
    };
    const updateSejarah = (index, field, value) => {
        const newData = [...data.sejarah_perusahaan];
        newData[index][field] = value;
        setData('sejarah_perusahaan', newData);
    };

    const addNilai = () => {
        setData('nilai_perusahaan', [...data.nilai_perusahaan, { title: '', desc: '' }]);
    };
    const removeNilai = (index) => {
        setData('nilai_perusahaan', data.nilai_perusahaan.filter((_, i) => i !== index));
    };
    const updateNilai = (index, field, value) => {
        const newData = [...data.nilai_perusahaan];
        newData[index][field] = value;
        setData('nilai_perusahaan', newData);
    };

    const moveSejarah = (index, direction) => {
        if (direction === 'up' && index > 0) {
            const newData = [...data.sejarah_perusahaan];
            [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
            setData('sejarah_perusahaan', newData);
        }
        if (direction === 'down' && index < data.sejarah_perusahaan.length - 1) {
            const newData = [...data.sejarah_perusahaan];
            [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
            setData('sejarah_perusahaan', newData);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Tentang Kami" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manajemen Tentang Kami</h2>
                    <p className="text-sm text-gray-500 mt-1">Kelola sejarah, nilai perusahaan, dan struktur organisasi.</p>
                </div>
                <button
                    type="submit"
                    form="tentangkami-form"
                    disabled={processing}
                    className="bg-wmu-dark text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={18} /> Simpan Perubahan
                </button>
            </div>

            {flash?.success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                    {flash.error}
                </div>
            )}

            <form id="tentangkami-form" onSubmit={submit} className="space-y-8 pb-12">
                
                {/* Hero / Intro Section */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                        <Building2 size={20} className="text-wmu-accent" /> Teks Utama (Hero)
                    </h3>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Utama</label>
                            <input
                                type="text"
                                className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 text-sm px-4 py-2.5"
                                value={data.judul_hero}
                                onChange={e => setData('judul_hero', e.target.value)}
                                placeholder="Contoh: Tentang Kami"
                            />
                            {errors.judul_hero && <p className="text-red-500 text-xs mt-1">{errors.judul_hero}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Utama</label>
                            <textarea
                                rows="3"
                                className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-300 text-sm px-4 py-2.5"
                                value={data.deskripsi_hero}
                                onChange={e => setData('deskripsi_hero', e.target.value)}
                                placeholder="Mengenal lebih dekat dedikasi dan perjalanan kami..."
                            ></textarea>
                            {errors.deskripsi_hero && <p className="text-red-500 text-xs mt-1">{errors.deskripsi_hero}</p>}
                        </div>
                    </div>
                </div>

                {/* Struktur Organisasi Image */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                        <ImageIcon size={20} className="text-wmu-accent" /> Gambar Struktur Organisasi
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                        {previewImg && (
                            <div className="bg-gray-100 rounded-xl overflow-hidden mb-2 max-w-2xl border border-gray-200">
                                <img src={previewImg} alt="Struktur Organisasi" className="w-full h-auto max-h-[400px] object-contain" />
                            </div>
                        )}
                        <div>
                            <input
                                type="file"
                                id="struktur_img"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <label 
                                htmlFor="struktur_img"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer transition-colors text-sm font-semibold border border-gray-200"
                            >
                                <ImageIcon size={18} /> {previewImg ? 'Ganti Gambar' : 'Pilih Gambar'}
                            </label>
                            <p className="text-xs text-gray-500 mt-2">Maksimal 5MB. Format: JPG, PNG, WEBP.</p>
                            {errors.struktur_organisasi_image && <p className="text-red-500 text-xs mt-1">{errors.struktur_organisasi_image}</p>}
                        </div>
                    </div>
                </div>

                {/* Timeline Sejarah */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                        <h3 className="text-lg font-bold text-gray-900">Perjalanan & Sejarah Perusahaan</h3>
                        <button 
                            type="button" 
                            onClick={addSejarah}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                        >
                            <Plus size={14} /> Tambah Item
                        </button>
                    </div>

                    <div className="space-y-4">
                        {data.sejarah_perusahaan.map((item, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 bg-gray-50/50 rounded-xl relative group">
                                <div className="flex flex-col gap-1 w-8 shrink-0 justify-center text-gray-400">
                                    <button type="button" onClick={() => moveSejarah(index, 'up')} disabled={index === 0} className="hover:text-blue-500 disabled:opacity-30"><ChevronUp size={18} /></button>
                                    <button type="button" onClick={() => moveSejarah(index, 'down')} disabled={index === data.sejarah_perusahaan.length - 1} className="hover:text-blue-500 disabled:opacity-30"><ChevronDown size={18} /></button>
                                </div>
                                <div className="md:w-32 shrink-0">
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Tahun</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-gray-300 text-sm focus:ring-wmu-accent focus:border-wmu-accent"
                                        value={item.year}
                                        onChange={e => updateSejarah(index, 'year', e.target.value)}
                                        placeholder="2014"
                                        required
                                    />
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Judul Momen</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border-gray-300 text-sm focus:ring-wmu-accent focus:border-wmu-accent"
                                            value={item.title}
                                            onChange={e => updateSejarah(index, 'title', e.target.value)}
                                            placeholder="Awal Berdiri"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi Singkat</label>
                                        <textarea
                                            rows="2"
                                            className="w-full rounded-lg border-gray-300 text-sm focus:ring-wmu-accent focus:border-wmu-accent"
                                            value={item.desc}
                                            onChange={e => updateSejarah(index, 'desc', e.target.value)}
                                            placeholder="Perusahaan didirikan dengan visi..."
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex items-start md:items-center justify-end">
                                    <button 
                                        type="button" 
                                        onClick={() => removeSejarah(index)}
                                        className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nilai-Nilai Perusahaan */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                        <h3 className="text-lg font-bold text-gray-900">Nilai-Nilai Perusahaan</h3>
                        <button 
                            type="button" 
                            onClick={addNilai}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                        >
                            <Plus size={14} /> Tambah Item
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.nilai_perusahaan.map((item, index) => (
                            <div key={index} className="p-4 border border-gray-200 bg-gray-50/50 rounded-xl relative">
                                <div className="absolute top-4 right-4">
                                    <button 
                                        type="button" 
                                        onClick={() => removeNilai(index)}
                                        className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="space-y-3 pr-10">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Nama Nilai</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border-gray-300 text-sm focus:ring-wmu-accent focus:border-wmu-accent"
                                            value={item.title}
                                            onChange={e => updateNilai(index, 'title', e.target.value)}
                                            placeholder="Contoh: Integritas"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Penjelasan Singkat</label>
                                        <textarea
                                            rows="2"
                                            className="w-full rounded-lg border-gray-300 text-sm focus:ring-wmu-accent focus:border-wmu-accent"
                                            value={item.desc}
                                            onChange={e => updateNilai(index, 'desc', e.target.value)}
                                            placeholder="Menjunjung tinggi kejujuran..."
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </form>
        </AdminLayout>
    );
}
