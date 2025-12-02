<?php

use Illuminate\Support\Facades\Route;

// One-time setup route for shared hosting
Route::get('/setup-storage', function () {
    $destinationsPath = public_path('destinations');
    
    if (!file_exists($destinationsPath)) {
        mkdir($destinationsPath, 0755, true);
        return 'Destinations directory created successfully!';
    }
    
    return 'Destinations directory already exists.';
})->name('setup.storage');