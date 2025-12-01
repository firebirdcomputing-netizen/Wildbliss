<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::select(['id', 'name', 'email', 'rating', 'review', 'is_featured', 'created_at'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'name' => $review->name,
                    'email' => $review->email,
                    'rating' => (int) $review->rating,
                    'review' => $review->review,
                    'is_featured' => (bool) $review->is_featured,
                    'created_at' => $review->created_at->toISOString(),
                ];
            });
        
        return Inertia::render('admin/pages/reviews', [
            'reviews' => $reviews
        ]);
    }

    public function featuredReviews()
    {
        $reviews = Review::where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Review::create($validator->validated());
        
        return back()->with('success', 'Thank you for your review! It will be published after approval.');
    }

    public function updateStatus(Request $request, Review $review)
    {
        $validated = $request->validate([
            'is_featured' => 'required|boolean',
        ]);

        $review->update($validated);

        $message = $validated['is_featured'] 
            ? 'Review approved and featured successfully.' 
            : 'Review removed from featured list.';

        return back()->with('success', $message);
    }
}