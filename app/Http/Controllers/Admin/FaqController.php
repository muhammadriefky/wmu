<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FaqController extends Controller
{
    public function index()
    {
        $faq = Faq::orderBy('urutan', 'asc')->orderBy('id_faq', 'desc')->get();
        
        $stats = [
            'total' => $faq->count(),
            'aktif' => $faq->where('status_aktif', 1)->count(),
        ];
        
        return Inertia::render('Admin/Faq/Index', [
            'faq' => $faq,
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'status_aktif' => filter_var($request->status_aktif, FILTER_VALIDATE_BOOLEAN),
        ]);

        $data = $request->validate([
            'pertanyaan' => 'required|string|max:500',
            'jawaban' => 'nullable|string',
            'urutan' => 'required|integer',
            'status_aktif' => 'nullable|boolean'
        ]);

        
        Faq::create($data);

        return redirect()->back()->with('success', 'Faq berhasil ditambahkan!');
    }

    public function update(Request $request, Faq $faq)
    {
        $request->merge([
            'status_aktif' => filter_var($request->status_aktif, FILTER_VALIDATE_BOOLEAN),
        ]);

        $data = $request->validate([
            'pertanyaan' => 'required|string|max:500',
            'jawaban' => 'nullable|string',
            'urutan' => 'required|integer',
            'status_aktif' => 'nullable|boolean'
        ]);

        
        $faq->update($data);

        return redirect()->back()->with('success', 'Faq berhasil diperbarui!');
    }

    public function destroy(Faq $faq)
    {
        
        $faq->delete();

        return redirect()->back()->with('success', 'Faq berhasil dihapus!');
    }
}
