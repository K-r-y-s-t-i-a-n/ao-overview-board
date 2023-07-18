<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'color_id'];

    public $timestamps = false;

    public function color()
    {
        return $this->belongsTo(Teambgcolor::class);
    }
}
