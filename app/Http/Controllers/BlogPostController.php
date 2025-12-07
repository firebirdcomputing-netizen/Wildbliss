<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        $blogPosts = BlogPost::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('admin/pages/blog', [
            'blogPosts' => $blogPosts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'author' => 'required|string',
            'read_time' => 'required|string',
            'status' => 'required|in:draft,published',
            'tags' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if (isset($validated['tags'])) {
            $validated['tags'] = json_decode($validated['tags'], true) ?: [];
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('blog-images'), $filename);
            $validated['image_url'] = '/blog-images/' . $filename;
        }

        BlogPost::create($validated);

        return redirect()->back()->with('success', 'Blog post created successfully');
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|string',
            'author' => 'required|string',
            'read_time' => 'required|string',
            'status' => 'required|in:draft,published',
            'tags' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if (isset($validated['tags'])) {
            $validated['tags'] = json_decode($validated['tags'], true) ?: [];
        }

        if ($request->hasFile('image')) {
            // Delete old image
            if ($blogPost->image_url) {
                $oldImagePath = public_path(ltrim($blogPost->image_url, '/'));
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('blog-images'), $filename);
            $validated['image_url'] = '/blog-images/' . $filename;
        }

        $blogPost->update($validated);

        return redirect()->back()->with('success', 'Blog post updated successfully');
    }

    public function destroy(BlogPost $blogPost)
    {
        // Delete associated image
        if ($blogPost->image_url) {
            $imagePath = public_path(ltrim($blogPost->image_url, '/'));
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $blogPost->delete();

        return redirect()->back()->with('success', 'Blog post deleted successfully');
    }

    public function publicIndex()
    {
        $blogPosts = BlogPost::where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($blogPosts);
    }

    public function show(BlogPost $blogPost)
    {
        return response()->json($blogPost);
    }
}