<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBookings = Booking::count();
        $totalDestinations = Destination::count();
        $totalCustomers = Booking::distinct('email')->count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        
        $recentBookings = Booking::with('destination')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
            
        $popularDestinations = Destination::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalBookings' => $totalBookings,
                'totalDestinations' => $totalDestinations,
                'totalCustomers' => $totalCustomers,
                'pendingBookings' => $pendingBookings,
            ],
            'recentBookings' => $recentBookings,
            'popularDestinations' => $popularDestinations,
        ]);
    }
}