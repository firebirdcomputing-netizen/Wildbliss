<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    // Admin routes
    Route::get('/admin/destinations', [App\Http\Controllers\DestinationController::class, 'index'])->name('admin.destinations');
    Route::post('/admin/destinations', [App\Http\Controllers\DestinationController::class, 'store']);
    Route::put('/admin/destinations/{destination}', [App\Http\Controllers\DestinationController::class, 'update']);
    Route::delete('/admin/destinations/{destination}', [App\Http\Controllers\DestinationController::class, 'destroy']);



    Route::get('/admin/bookings', [App\Http\Controllers\BookingController::class, 'index'])->name('admin.bookings');
    Route::put('/admin/bookings/{booking}', [App\Http\Controllers\BookingController::class, 'update']);
    Route::delete('/admin/bookings/{booking}', [App\Http\Controllers\BookingController::class, 'destroy']);

    Route::get('/admin/customers', [App\Http\Controllers\BookingController::class, 'customers'])->name('admin.customers');

    Route::get('/admin/messages', [App\Http\Controllers\MessageController::class, 'index'])->name('admin.messages');
    Route::put('/admin/messages/{message}', [App\Http\Controllers\MessageController::class, 'update']);

    Route::get('/admin/reviews', [App\Http\Controllers\ReviewController::class, 'index'])->name('admin.reviews');
    Route::put('/admin/reviews/{review}', [App\Http\Controllers\ReviewController::class, 'updateStatus']);

    Route::get('/admin/accommodations', [App\Http\Controllers\AccommodationController::class, 'index'])->name('admin.accommodations');
    Route::post('/admin/accommodations', [App\Http\Controllers\AccommodationController::class, 'store']);
    Route::put('/admin/accommodations/{accommodation}', [App\Http\Controllers\AccommodationController::class, 'update']);
    Route::delete('/admin/accommodations/{accommodation}', [App\Http\Controllers\AccommodationController::class, 'destroy']);

    Route::get('/admin/client-accommodations', [App\Http\Controllers\ClientAccommodationController::class, 'index'])->name('admin.client-accommodations');
    Route::put('/admin/accommodations/{accommodation}/visibility', [App\Http\Controllers\ClientAccommodationController::class, 'updateVisibility']);
});

// Public API routes
Route::get('/api/destinations', [App\Http\Controllers\DestinationController::class, 'publicIndex']);
Route::get('/api/accommodations', [App\Http\Controllers\AccommodationController::class, 'apiIndex']);
Route::get('/api/destinations/{id}/accommodations', [App\Http\Controllers\DestinationController::class, 'getAccommodations']);

// Contact routes
Route::get('/contact', [App\Http\Controllers\ContactController::class, 'index'])->name('contact');
Route::post('/contact', [App\Http\Controllers\ContactController::class, 'store']);

// Booking routes
Route::post('/bookings', [App\Http\Controllers\BookingController::class, 'store']);

// Review routes
Route::post('/reviews', [App\Http\Controllers\ReviewController::class, 'store']);
Route::get('/api/reviews/featured', [App\Http\Controllers\ReviewController::class, 'featuredReviews']);

// File serving route
Route::get('/storage/{filename}', function ($filename) {
    $path = public_path('destinations/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path);
})->where('filename', '.*');

// Tours and Places routes
Route::get('/tours', function () {
    return Inertia::render('tours');
})->name('tours');

// Specific tour category routes (must come before tours/{id})
Route::get('/tours/4x4-safaris', function () {
    return Inertia::render('tours', ['category' => '4x4-safaris']);
})->name('tours.4x4-safaris');

Route::get('/tours/day-tours', function () {
    return Inertia::render('tours', ['category' => 'day-tours']);
})->name('tours.day-tours');

Route::get('/tours/kenya-camping-safaris', function () {
    return Inertia::render('tours', ['category' => 'kenya-camping-safaris']);
})->name('tours.kenya-camping-safaris');

Route::get('/tours/kenya-tanzania-safaris', function () {
    return Inertia::render('tours', ['category' => 'kenya-tanzania-safaris']);
})->name('tours.kenya-tanzania-safaris');

Route::get('/tours/kenya-wildlife-safaris', function () {
    return Inertia::render('tours', ['category' => 'kenya-wildlife-safaris']);
})->name('tours.kenya-wildlife-safaris');

Route::get('/tours/mountain-climbing', function () {
    return Inertia::render('tours', ['category' => 'mountain-climbing']);
})->name('tours.mountain-climbing');

Route::get('/tours/tanzania-wildlife-safaris', function () {
    return Inertia::render('tours', ['category' => 'tanzania-wildlife-safaris']);
})->name('tours.tanzania-wildlife-safaris');

// Generic tour details route (must come after specific category routes)
Route::get('/tours/{id}', function ($id) {
    return Inertia::render('destination-details', [
        'tour' => [
            'id' => $id,
            // Add more tour data here when connected to database
        ]
    ]);
})->name('tour.details')->where('id', '[0-9]+');

Route::get('/places', function () {
    return Inertia::render('places');
})->name('places');

Route::get('/destination', function () {
    return Inertia::render('destination');
})->name('destination');

Route::get('/destination/{id}', function ($id) {
    return Inertia::render('destination-details', [
        'destination' => [
            'id' => $id,
            // Add more destination data here when connected to database
        ]
    ]);
})->name('destination.details');

// Blog routes
Route::get('/blog', function () {
    return Inertia::render('blog');
})->name('blog');

Route::get('/blog/{id}', function ($id) {
    return Inertia::render('blog-post', [
        'id' => $id
    ]);
})->name('blog.post')->where('id', '[0-9]+');

// Legal pages
Route::get('/privacy', function () {
    return Inertia::render('privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('terms');
})->name('terms');

require __DIR__.'/settings.php';
require __DIR__.'/setup.php';
