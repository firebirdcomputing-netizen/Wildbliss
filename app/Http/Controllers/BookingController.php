<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('admin/pages/bookings', [
            'bookings' => $bookings
        ]);
    }

    public function customers()
    {
        $customers = Booking::selectRaw('name, email, phone, country, COUNT(*) as bookings_count, MIN(created_at) as first_booking')
            ->groupBy('name', 'email', 'phone', 'country')
            ->orderBy('bookings_count', 'desc')
            ->get();
        
        return Inertia::render('admin/pages/customers', [
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'destination_id' => 'required|string',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'country' => 'required|string|max:100',
            'travel_date' => 'required|date|after:today',
            'group_size' => 'required|integer|min:1|max:20',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Booking::create($validator->validated());
        
        return back()->with('success', 'Booking request submitted successfully! We will contact you soon.');
    }
}