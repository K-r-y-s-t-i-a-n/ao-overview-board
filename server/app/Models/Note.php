<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $casts = [
        'is_edited' => 'boolean',
    ];

    protected $fillable = [
        'text', 'added_by', 'team_id', 'is_edited'
    ];

    protected $hidden = [
        'team_id'
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'notes_tags');
    }
}
