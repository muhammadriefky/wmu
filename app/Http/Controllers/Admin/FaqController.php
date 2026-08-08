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
        return Inertia::render('Admin/Faq/Index', [
            'faq' => $faq
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pertanyaan' => 'required|string|max:500',
            'jawaban' => 'nullable|string|nullable',
            'urutan' => 'required|integer'
        ]);

        $data = $request;
        

        Faq::create($data);

        return redirect()->back()->with('success', 'Faq berhasil ditambahkan!');
    }

    public function update(Request $request, Faq $faq)
    {
        $request->validate([
            'pertanyaan' => 'required|string|max:500',
            'jawaban' => 'nullable|string|nullable',
            'urutan' => 'required|integer'
        ]);

        $data = $request;
        

        $faq->update($data);

        return redirect()->back()->with('success', 'Faq berhasil diperbarui!');
    }

    public function destroy(Faq $faq)
    {
        
        $faq->delete();

        return redirect()->back()->with('success', 'Faq berhasil dihapus!');
    }
}
