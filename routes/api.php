<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum', 'updateLastActivity'])->group(function () {

    Route::post('/auth/logout', 'App\Http\Controllers\Api\AuthController@logout');

    Route::post('/update-profile', 'App\Http\Controllers\Api\UserController@update_profile');

    Route::post('/update-password', 'App\Http\Controllers\Api\UserController@update_password');

    Route::post('/user/favorite', 'App\Http\Controllers\Api\UserController@favorite');
    
    Route::get('/user/get-user', 'App\Http\Controllers\Api\UserController@get_user');
    
    Route::get('/user/destroy-userimage', 'App\Http\Controllers\Api\UserController@destroy_user_image');
    
    Route::get('/user/get-favorite', 'App\Http\Controllers\Api\UserController@get_user_favorite_data');
    
    Route::get('/get-user-subscriptions', 'App\Http\Controllers\Api\UserSubscriptionController@get_usersubscriptions');

    Route::post('/store-user-subscription', 'App\Http\Controllers\Api\UserSubscriptionController@store_usersubscription');

    Route::post('/store-subscription-byuser', 'App\Http\Controllers\Api\UserSubscriptionController@store_subscription_byuser');

    Route::post('/update-user-subscription', 'App\Http\Controllers\Api\UserSubscriptionController@update_usersubscriptions');
 
    Route::get('/delete-user-subscription/{id}', 'App\Http\Controllers\Api\UserSubscriptionController@delete_usersubscriptions');

    Route::post('/items/bulk-delete', 'App\Http\Controllers\Api\UserSubscriptionController@bulkDelete')->name('items.bulk-delete');

});


Route::post('/auth/login', 'App\Http\Controllers\Api\AuthController@loginUser');

Route::post('/auth/register', 'App\Http\Controllers\Api\AuthController@createUser');
  
Route::post('/auth/sso', 'App\Http\Controllers\Api\AuthController@sso');

Route::post('/newsletter', 'App\Http\Controllers\Api\NewsletterController@newsletter');

Route::post('/auth/forgot-password', 'App\Http\Controllers\Api\NewPasswordController@forgotPassword');

Route::post('/auth/reset-password', 'App\Http\Controllers\Api\NewPasswordController@reset');


    Route::get('/get-pages', 'App\Http\Controllers\Api\PageController@get_pages');

    Route::get('/get-blogs', 'App\Http\Controllers\Api\BlogController@get_blogs');

    Route::get('/get-categories', 'App\Http\Controllers\Api\CategoryController@get_categories');
    
    Route::get('/get-blog', 'App\Http\Controllers\Api\BlogController@get_blog');
    
    Route::get('/get-subscriptions', 'App\Http\Controllers\Api\SubscriptionController@get_subscriptions');
    
    Route::get('/get-subscription-names', 'App\Http\Controllers\Api\SubscriptionController@get_subscription_names');
    
    Route::get('/get-subscription-details', 'App\Http\Controllers\Api\SubscriptionController@get_subscription_details');
