<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table='blog';
    protected $primaryKey='id';
    protected $fillable=['blog_title', 'blog_category', 'blog_thumbnail', 'blog_short_desc', 'blog_long_description', 'status'];
 
    public function category_name(){
        return $this->belongsTo(Category::class,'blog_category');
    }
}
