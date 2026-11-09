<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Blog::query();

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('judul_blog', 'like', '%' . $request->search . '%')
                  ->orWhere('slug', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('sort')) {
            if ($request->sort === 'Terbaru') {
                $query->orderBy('id_blog', 'desc');
            } elseif ($request->sort === 'Terlama') {
                $query->orderBy('id_blog', 'asc');
            }
        } else {
            $query->orderBy('id_blog', 'desc');
        }

        $blog = $query->paginate(10)->withQueryString();

        $stats = [
            'total' => Blog::count(),
            'baru' => Blog::where('rec_datecreated', '>=', now()->subDays(30))->count(),
        ];

        return Inertia::render('Admin/Blog/Index', [
            'blog' => $blog,
            'stats' => $stats,
            'filters' => (object) $request->only(['search', 'sort'])
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul_blog' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tr_blog,slug',
            'meta_deskripsi' => 'nullable|string|max:160',
            'isi_konten' => 'nullable|string',
            'tanggal_terbit' => 'required|date',
            'gambar' => 'nullable|image|max:2048',
            'kategori' => 'nullable|string|max:100',
            'status' => 'required|in:Published,Draft',
        ]);

        unset($data['gambar']);
        
        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('blog', 'public');
        }

        Blog::create($data);

        return redirect()->back()->with('success', 'Blog berhasil ditambahkan!');
    }

    public function update(Request $request, Blog $blog)
    {
        $data = $request->validate([
            'judul_blog' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tr_blog,slug,' . $blog->id_blog . ',id_blog',
            'meta_deskripsi' => 'nullable|string|max:160',
            'isi_konten' => 'nullable|string',
            'tanggal_terbit' => 'required|date',
            'gambar' => 'nullable|image|max:2048',
            'kategori' => 'nullable|string|max:100',
            'status' => 'required|in:Published,Draft',
        ]);

        unset($data['gambar']);
        
        if ($request->hasFile('gambar')) {
            if ($blog->gambar) {
                Storage::disk('public')->delete($blog->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('blog', 'public');
        }

        $blog->update($data);

        return redirect()->back()->with('success', 'Blog berhasil diperbarui!');
    }

    public function destroy(Blog $blog)
    {
        if ($blog->gambar) {
            Storage::disk('public')->delete($blog->gambar);
        }
        $blog->delete();

        return redirect()->back()->with('success', 'Blog berhasil dihapus!');
    }
}
