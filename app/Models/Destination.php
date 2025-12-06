<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class Destination extends Model
{
    use HasUuids;

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($destination) {
            if ($destination->image) {
                $imagePath = public_path('destinations/' . $destination->image);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
        });
    }

    protected $fillable = [
        'name',
        'location',
        'type',
        'description',
        'info',
        'image',
        'rating',
        'duration',
        'group_size',
        'category',
        'tour',
        'status',
        'accommodation_ids'
    ];

    protected $casts = [
        'rating' => 'decimal:1',
        'accommodation_ids' => 'array'
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    // public function tours()
    // {
    //     return $this->hasMany(Tour::class);
    // }

    public function getToursCountAttribute()
    {
        return 0; // Placeholder until Tour model is created
    }
}
