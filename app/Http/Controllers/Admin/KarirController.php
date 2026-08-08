<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Karir;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KarirController extends Controller
{
    public function index()
    {
        $karir = Karir::orderBy('id_karir', 'desc')->get();
        return Inertia::render('Admin/Karir/Index', [
            'karir' => $karir
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'posisi' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'persyaratan' => 'nullable|string|nullable',
            'status_aktif' => 'required|boolean'
        ]);

        $data = $request;
        

        Karir::create($data);

        return redirect()->back()->with('success', 'Karir berhasil ditambahkan!');
    }

    public function update(Request $request, Karir $karir)
    {
        $request->validate([
            'posisi' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'persyaratan' => 'nullable|string|nullable',
            'status_aktif' => 'required|boolean'
        ]);

        $data = $request;
        

        $karir->update($data);

        return redirect()->back()->with('success', 'Karir berhasil diperbarui!');
    }

    public function destroy(Karir $karir)
    {
        
        $karir->delete();

        return redirect()->back()->with('success', 'Karir berhasil dihapus!');
    }
}
