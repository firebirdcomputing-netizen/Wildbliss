<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Booking extends Model
{
    use HasUuids;

    protected $fillable = [
        'destination_id',
        'name',
        'email',
        'phone',
        'country',
        'travel_date',
        'group_size',
        'special_requests',
        'status',
    ];

    protected $casts = [
        'travel_date' => 'date',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function destination()
    {
        return $this->belongsTo(Destination::class, 'destination_id', 'id');
    }
}
