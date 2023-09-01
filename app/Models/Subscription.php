<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table='subscription';
    protected $primaryKey='id';
    protected $fillable=['subscriptionName', 'logoURL', 'subscriptionDescriptionShort', 'subscriptionDescriptionLong', 'premiumSubscriptionsFrom', 'cancelUrl', 'cancelEmail', 'cancelPhone', 'manageUrl', 'freeTrial', 'category', 'subCategory', 'relatedTerms', 'companyName', 'subscriptionId', 'affiliateProgram', 'signUpUrl', 'banner_image', 'gallery_image', 'desktop', 'mobile_app', 'email', 'phone_call', 'type', 'rating'];
 

    public function favorites()
    {
         return $this->hasMany(Favorite::class, 'subscription_name', 'subscriptionName');
    }
    
    public function plans() {
        return $this->hasMany(Plan::class, 'subscriptionName', 'subscriptionName');
    }
}
