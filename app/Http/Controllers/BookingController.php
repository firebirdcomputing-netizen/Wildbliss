<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::query();
        
        // Apply search filter
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('country', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%{$search}%");
            });
        }
        
        // Apply status filter
        if ($request->filled('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }
        
        $bookings = $query->orderBy('created_at', 'desc')
                          ->paginate(20)
                          ->withQueryString();
        
        return Inertia::render('admin/pages/bookings', [
            'bookings' => $bookings,
            'filters' => $request->only(['search', 'status'])
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

    public function update(Request $request, Booking $booking)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $booking->update($validator->validated());
        
        return back()->with('success', 'Booking status updated successfully!');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        
        return back()->with('success', 'Booking deleted successfully!');
    }
}