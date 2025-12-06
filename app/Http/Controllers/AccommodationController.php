<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccommodationController extends Controller
{
    public function index()
    {
        $accommodations = Accommodation::orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/pages/accommodations', [
            'accommodations' => $accommodations
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'rating' => 'required|numeric|min:0|max:5',
            'description' => 'required|string',
            'website' => 'required|url',
            'image_url' => 'nullable|url',
        ]);

        Accommodation::create($validated);

        return redirect()->back()->with('success', 'Accommodation added successfully');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'rating' => 'required|numeric|min:0|max:5',
            'description' => 'required|string',
            'website' => 'required|url',
            'image_url' => 'nullable|url',
        ]);

        Accommodation::findOrFail($id)->update($validated);

        return redirect()->back()->with('success', 'Accommodation updated successfully');
    }

    public function destroy($id)
    {
        Accommodation::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Accommodation deleted successfully');
    }

    public function apiIndex()
    {
        $accommodations = Accommodation::orderBy('name')->get();
        return response()->json($accommodations);
    }
}