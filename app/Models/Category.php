<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table='category';
    protected $primaryKey='id';
    protected $fillable=['name', 'status'];

    public function subcategories() {
        return $this->hasMany(SubCategory::class);
    }
    
    public function usersubscriptions()
    {
        return $this->hasMany(UserSubscription::class, 'name', 'category');
    }
    
    

}
