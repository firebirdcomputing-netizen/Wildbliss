<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contactNumber' => 'nullable|string|max:20',
            'adults' => 'required|integer|min:1',
            'children' => 'nullable|integer|min:0',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        Message::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'contact_number' => $validated['contactNumber'],
            'adults' => $validated['adults'],
            'children' => $validated['children'] ?? 0,
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ]);
        
        return back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }
}