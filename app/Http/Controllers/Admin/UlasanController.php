<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ulasan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UlasanController extends Controller
{
    public function index()
    {
        $ulasan = Ulasan::orderBy('id_ulasan', 'desc')->get();
        return Inertia::render('Admin/Ulasan/Index', [
            'ulasan' => $ulasan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_pemberi' => 'required|string|max:255',
            'isi_ulasan' => 'nullable|string|nullable',
            'rating_bintang' => 'required|integer',
            'status_disetujui' => 'required|boolean'
        ]);

        $data = $request;
        

        Ulasan::create($data);

        return redirect()->back()->with('success', 'Ulasan berhasil ditambahkan!');
    }

    public function update(Request $request, Ulasan $ulasan)
    {
        $request->validate([
            'nama_pemberi' => 'required|string|max:255',
            'isi_ulasan' => 'nullable|string|nullable',
            'rating_bintang' => 'required|integer',
            'status_disetujui' => 'required|boolean'
        ]);

        $data = $request;
        

        $ulasan->update($data);

        return redirect()->back()->with('success', 'Ulasan berhasil diperbarui!');
    }

    public function destroy(Ulasan $ulasan)
    {
        
        $ulasan->delete();

        return redirect()->back()->with('success', 'Ulasan berhasil dihapus!');
    }
}
