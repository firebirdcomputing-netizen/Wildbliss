<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('admin/pages/messages', [
            'messages' => $messages
        ]);
    }

    public function update(Request $request, Message $message)
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,read,replied'
        ]);

        $message->update($validated);

        return back();
    }
}