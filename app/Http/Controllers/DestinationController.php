<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

use Inertia\Inertia;

class DestinationController extends Controller
{
    public function index()
    {
        $destinations = Destination::all()->map(function ($destination) {
            $destination->tours_count = 0; // Placeholder until Tour model is created
            return $destination;
        });

        return Inertia::render('admin/pages/destinations', [
            'destinations' => $destinations
        ]);
    }

    public function publicIndex()
    {
        $destinations = Destination::where('status', 'active')
            ->get()
            ->map(function ($destination) {
                $destination->tours_count = 0; // Placeholder until Tour model is created
                return $destination;
            });

        return response()->json($destinations);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'info' => 'nullable|string',
            'image' => 'nullable|file|image|max:2048',
            'rating' => 'required|numeric|min:0|max:5',
            'duration' => 'required|string|max:255',
            'group_size' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'tour' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('destinations');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $validated['image'] = $filename;
        }

        Destination::create($validated);

        return redirect()->route('admin.destinations')
            ->with('success', 'Destination created successfully.');
    }

    public function update(Request $request, Destination $destination)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'info' => 'nullable|string',
            'image' => 'nullable|file|image|max:2048',
            'rating' => 'required|numeric|min:0|max:5',
            'duration' => 'required|string|max:255',
            'group_size' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'tour' => 'nullable|string|max:255',
            'status' => 'required|in:active,inactive'
        ]);

        if ($request->hasFile('image')) {
            if ($destination->image) {
                $oldImagePath = public_path('destinations/' . $destination->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('destinations');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $validated['image'] = $filename;
        } else {
            unset($validated['image']); // Don't update image if no new file uploaded
        }

        $destination->update($validated);

        return redirect()->route('admin.destinations')
            ->with('success', 'Destination updated successfully.');
    }

    public function destroy(Destination $destination)
    {
        if ($destination->image) {
            $imagePath = public_path('destinations/' . $destination->image);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $destination->delete();

        return redirect()->route('admin.destinations')
            ->with('success', 'Destination deleted successfully.');
    }


}
