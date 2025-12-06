<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientAccommodationController extends Controller
{
    public function index()
    {
        $accommodations = Accommodation::orderBy('name')->get();

        return Inertia::render('admin/pages/client-accommodations', [
            'accommodations' => $accommodations
        ]);
    }

    public function updateVisibility(Request $request, $id)
    {
        $validated = $request->validate([
            'is_client_visible' => 'required|boolean',
        ]);

        Accommodation::findOrFail($id)->update($validated);

        return redirect()->back()->with('success', 'Accommodation visibility updated successfully');
    }
}