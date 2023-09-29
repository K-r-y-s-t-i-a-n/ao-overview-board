<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'created_by', 'edited_by', 'category_id'];

    protected $hidden = ['pivot'];

    public function notes()
    {
        $this->belongsToMany(Note::class, 'note_tag');
    }

    public function category()
    {
        $this->belongsTo(Category::class);
    }
}
