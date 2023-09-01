<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $table='sub_category';
    protected $primaryKey='id';
    protected $fillable=['name', 'category_id'];

    public function categorydetails(){
        return $this->belongsTo(Category::class,'category_id');
    }

}
