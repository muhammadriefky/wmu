<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        $blog = Blog::orderBy('id_blog', 'desc')->get();
        return Inertia::render('Admin/Blog/Index', [
            'blog' => $blog
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul_blog' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'meta_deskripsi' => 'nullable|string|max:160|nullable',
            'isi_konten' => 'nullable|string|nullable',
            'tanggal_terbit' => 'required|date'
        ]);

        $data = $request;
        

        Blog::create($data);

        return redirect()->back()->with('success', 'Blog berhasil ditambahkan!');
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'judul_blog' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'meta_deskripsi' => 'nullable|string|max:160|nullable',
            'isi_konten' => 'nullable|string|nullable',
            'tanggal_terbit' => 'required|date'
        ]);

        $data = $request;
        

        $blog->update($data);

        return redirect()->back()->with('success', 'Blog berhasil diperbarui!');
    }

    public function destroy(Blog $blog)
    {
        
        $blog->delete();

        return redirect()->back()->with('success', 'Blog berhasil dihapus!');
    }
}
