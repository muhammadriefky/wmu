<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Keunggulan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KeunggulanController extends Controller
{
    public function index()
    {
        $keunggulan = Keunggulan::orderBy('urutan', 'asc')->orderBy('id_keunggulan', 'desc')->get();
        return Inertia::render('Admin/Keunggulan/Index', [
            'keunggulan' => $keunggulan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|nullable',
            'ikon' => 'nullable|string|max:255|nullable',
            'urutan' => 'required|integer'
        ]);

        $data = $request;
        

        Keunggulan::create($data);

        return redirect()->back()->with('success', 'Keunggulan berhasil ditambahkan!');
    }

    public function update(Request $request, Keunggulan $keunggulan)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|nullable',
            'ikon' => 'nullable|string|max:255|nullable',
            'urutan' => 'required|integer'
        ]);

        $data = $request;
        

        $keunggulan->update($data);

        return redirect()->back()->with('success', 'Keunggulan berhasil diperbarui!');
    }

    public function destroy(Keunggulan $keunggulan)
    {
        
        $keunggulan->delete();

        return redirect()->back()->with('success', 'Keunggulan berhasil dihapus!');
    }
}
